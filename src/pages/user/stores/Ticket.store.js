import { create } from "zustand";
import socket, { joinTicketRoom, leaveTicketRoom } from "../../../lib/socket";

const API = import.meta.env.VITE_SOCKET_URL || "";

// Shared default fetch options (JSON only)
const defaultFetchOptions = (method = "GET", body = null) => {
  const token = localStorage.getItem("access_token");

  const opts = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  };

  if (body) opts.body = JSON.stringify(body);

  return opts;
};

const useTicketStore = create((set, get) => ({
  loading: false,
  error: null,
  success: false,
  tickets: [],
  singleTicket: null,
  comments: [],

  fetchAllTickets: async (filters = {}) => {
    set({ loading: true, error: null });
    try {
      const qs = new URLSearchParams(filters).toString();
      const url = `${API}/api/v1/data/tickets${qs ? `?${qs}` : ""}`;
      const res = await fetch(url, defaultFetchOptions("GET"));

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();

      set({ tickets: Array.isArray(data) ? data : [], loading: false });
    } catch (err) {
      set({ error: err.message || String(err), loading: false });
    }
  },

  fetchTicket: async (ticketId) => {
    if (!ticketId) return;
    set({ loading: true, error: null });

    try {
      const res = await fetch(
        `${API}/api/v1/data/tickets/${ticketId}`,
        defaultFetchOptions("GET")
      );

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();

      const first = data?.UserCredential?.UserProfile?.name?.first || "";
      const last = data?.UserCredential?.UserProfile?.name?.last || "";
      const middle = data?.UserCredential?.UserProfile?.name?.middle?.[0] || "";

      set({
        singleTicket: {
          id: data.id,
          title: data.subject,
          body: data.concern_details,
          mappedTag: data.category,
          openedTime: data.createdAt,
          openedByName: `${last}, ${first} ${middle}.`,
          updates: data.Comments || []
        },
        loading: false
      });

    } catch (err) {
      set({ error: err.message || String(err), loading: false });
    }
  },

  addNewTicket: async (payload) => {
    set({ loading: true, error: null, success: false });

    try {
      const token = localStorage.getItem("access_token");
      if (!token) throw new Error("Missing access token");

      const fd = new FormData();
      fd.append("user_id", payload.user_id);
      fd.append("subject", payload.subject);
      fd.append("category", payload.category);
      fd.append("concern_details", payload.concern_details);

      if (payload.files && Array.isArray(payload.files)) {
        payload.files.forEach(file => {
          fd.append("files", file);
        });
      }

      const res = await fetch(`${API}/api/v1/data/tickets`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd
      });

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();

      set((state) => ({
        tickets: [data.ticket || data, ...(state.tickets || [])],
        loading: false,
        success: true
      }));

      return data;

    } catch (err) {
      set({ error: err.message || String(err), loading: false, success: false });
      throw err;
    }
  },

  // ------------------------------------------------------
  // GET MY TICKETS
  // ------------------------------------------------------
  myTickets: async () => {
    set({ loading: true, error: null });

    try {
      const token = localStorage.getItem("access_token");
      const user_id = localStorage.getItem("user_id");

      if (!token) throw new Error("No access token found");
      if (!user_id) throw new Error("No user_id found");

      const res = await fetch(
        `${API}/api/v1/data/tickets/user/${user_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();

      set({
        tickets: Array.isArray(data) ? data : [],
        loading: false
      });

    } catch (err) {
      set({ error: err.message || String(err), loading: false });
    }
  },

  // ------------------------------------------------------
  // PATCH TICKET
  // ------------------------------------------------------
  updateTicket: async (ticketId, patch) => {
    set({ loading: true, error: null, success: false });

    try {
      const res = await fetch(
        `${API}/api/v1/data/tickets/${ticketId}`,
        defaultFetchOptions("PATCH", patch)
      );

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();

      set((state) => ({
        tickets: state.tickets.map(t => (t.id === ticketId ? { ...t, ...patch } : t)),
        singleTicket:
          state.singleTicket?.id === ticketId
            ? { ...state.singleTicket, ...patch }
            : state.singleTicket,
        loading: false,
        success: true
      }));

      return data;

    } catch (err) {
      set({ error: err.message || String(err), loading: false, success: false });
      throw err;
    }
  },

  // ------------------------------------------------------
  // DELETE TICKET
  // ------------------------------------------------------
  deleteTicket: async (ticketId) => {
    set({ loading: true, error: null });

    try {
      const res = await fetch(
        `${API}/api/v1/data/tickets/${ticketId}`,
        defaultFetchOptions("DELETE")
      );

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();

      set((state) => ({
        tickets: state.tickets.filter(t => t.id !== ticketId),
        singleTicket: state.singleTicket?.id === ticketId ? null : state.singleTicket,
        loading: false
      }));

      return data;

    } catch (err) {
      set({ error: err.message || String(err), loading: false });
      throw err;
    }
  },

  // ------------------------------------------------------
  // GET COMMENTS
  // ------------------------------------------------------
  fetchComments: async (ticketId) => {
    if (!ticketId) return;
    set({ loading: true, error: null });

    try {
      const res = await fetch(
        `${API}/api/v1/data/tickets/${ticketId}/comments`,
        defaultFetchOptions("GET")
      );

      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();

      set({ comments: Array.isArray(data) ? data : [], loading: false });

    } catch (err) {
      set({ error: err.message || String(err), loading: false });
    }
  },

  postComment: async (ticketId, payload) => {
    set({ loading: true, error: null });

    try {
      const res = await fetch(
        `${API}/api/v1/data/tickets/${ticketId}/comments`,
        defaultFetchOptions("POST", payload)
      );

      if (!res.ok) throw new Error(await res.text());

      const data = await res.json();
      set({ loading: false });

      return data;

    } catch (err) {
      set({ error: err.message || String(err), loading: false });
      throw err;
    }
  },

  // ------------------------------------------------------
  // SOCKET HELPERS
  // ------------------------------------------------------
  joinRoom: (ticketId) => ticketId && joinTicketRoom(ticketId),
  leaveRoom: (ticketId) => ticketId && leaveTicketRoom(ticketId),


  initializeSocketListeners: () => {
    socket.off("tickets:new");
    socket.off("tickets:update");
    socket.off("tickets:delete");
    socket.off("ticket:comment:added");
    socket.on("tickets:new", (ticket) => {
      set((state) => {
        const exists = state.tickets.some((t) => t.id === ticket.id);
        return exists ? {} : { tickets: [ticket, ...state.tickets] };
      });
    });

    // Ticket updates
    socket.on("tickets:update", (payload) => {
      const ticketObj = payload?.ticket || payload;
      const ticketId = ticketObj?.id || payload?.ticket_id;
      const updates = payload?.updates || ticketObj;

      set((state) => ({
        tickets: state.tickets.map(t => (t.id === ticketId ? { ...t, ...updates } : t)),
        singleTicket:
          state.singleTicket?.id === ticketId
            ? { ...state.singleTicket, ...updates }
            : state.singleTicket
      }));
    });

    // Ticket deleted
    socket.on("tickets:delete", (payload) => {
      const ticketId = payload?.ticket_id || payload;

      set((state) => ({
        tickets: state.tickets.filter(t => t.id !== ticketId),
        singleTicket: state.singleTicket?.id === ticketId ? null : state.singleTicket
      }));
    });

    // NEW COMMENT — **NO DUPLICATES**
    socket.on("ticket:comment:added", (comment) => {
      set((state) => {
        const current = state.singleTicket?.id;
        if (!current) return {};
        if (String(comment.parent_id) !== String(current)) return {};

        const exists = state.comments.some(c => c.id === comment.id);
        if (exists) return {}; // prevents duplicates

        return { comments: [...state.comments, comment] };
      });
    });
  }

}));

export default useTicketStore;
