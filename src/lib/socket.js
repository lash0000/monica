// src/lib/socket.js
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

// Create the socket instance (only once)
const socket = io(SOCKET_URL, {
  transports: ["polling", "websocket"],
  withCredentials: true,
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000
});

// ------------------------------
// ROOM HELPERS
// ------------------------------
export function joinTicketRoom(ticketId) {
  if (!ticketId) return;
  socket.emit("ticket:join", ticketId);
}

export function leaveTicketRoom(ticketId) {
  if (!ticketId) return;
  socket.emit("ticket:leave", ticketId);
}

// ------------------------------
// COMMENT (we POST via REST, socket only receives broadcast)
// ------------------------------
// We keep a helper that emits a client-side event only when needed.
// In Option B we use REST for posting comments, so no socket emit here.

// ------------------------------
// SOCKET CONNECTION LOGS (optional)
// ------------------------------
socket.on("connect", () => {
  console.log("[SOCKET] Connected:", socket.id);
});

socket.on("disconnect", (reason) => {
  console.log("[SOCKET] Disconnected:", reason);
});

socket.on("connect_error", (err) => {
  console.error("[SOCKET] Connection error:", err.message);
});

export default socket;
