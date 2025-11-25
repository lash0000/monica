import React, { createContext, useContext, useState, useRef, useEffect } from "react";

/*
Usage:

<AlertDialog>
  <AlertDialogTrigger asChild>
    <button>Open</button>
  </AlertDialogTrigger>

  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogContent>
      <AlertDialogTitle>Title here</AlertDialogTitle>
      <AlertDialogDescription>Description here...</AlertDialogDescription>

      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction destructive>Delete</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialogPortal>
</AlertDialog>
*/

const DialogContext = createContext(null);
function useDialog() {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error("AlertDialog components must be used inside <AlertDialog>");
  return ctx;
}

export function AlertDialog({ children }) {
  const [open, setOpen] = useState(false);
  const lastFocused = useRef(null);
  const contentRef = useRef(null);

  // Lock scroll when open
  useEffect(() => {
    if (open) {
      lastFocused.current = document.activeElement;
      document.body.style.overflow = "hidden";
      setTimeout(() => contentRef.current?.focus(), 0);
    } else {
      document.body.style.overflow = "";
      lastFocused.current?.focus?.();
    }
    return () => (document.body.style.overflow = "");
  }, [open]);

  // ESC close
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <DialogContext.Provider value={{ open, setOpen, contentRef }}>
      {children}
    </DialogContext.Provider>
  );
}

export function AlertDialogTrigger({ asChild = false, children }) {
  const { setOpen } = useDialog();
  const element = asChild ? children : <button>{children}</button>;

  return React.cloneElement(element, {
    onClick: () => setOpen(true),
  });
}

export function AlertDialogPortal({ children }) {
  const { open } = useDialog();
  if (!open) return null;
  return <>{children}</>;
}

export function AlertDialogOverlay() {
  const { setOpen } = useDialog();
  return (
    <div
      className="fixed inset-0 z-80 bg-black/50 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    />
  );
}

export function AlertDialogContent({ children }) {
  const { contentRef } = useDialog();

  return (
    <div className="fixed inset-0 z-99 flex items-center justify-center px-4 py-6">
      <div
        ref={contentRef}
        tabIndex={-1}
        role="alertdialog"
        className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-xl ring-1 ring-black/5"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export function AlertDialogTitle({ children }) {
  return <h2 className="text-lg font-semibold text-slate-900">{children}</h2>;
}

export function AlertDialogDescription({ children }) {
  return <p className="mt-2 text-sm text-slate-600">{children}</p>;
}

export function AlertDialogFooter({ children }) {
  return <div className="mt-6 flex justify-end gap-3">{children}</div>;
}

export function AlertDialogCancel({ asChild = false, children }) {
  const { setOpen } = useDialog();
  const element = asChild ? children : <button>{children}</button>;

  return React.cloneElement(element, {
    onClick: () => setOpen(false),
    className:
      (element.props.className || "") +
      " inline-flex items-center rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50",
  });
}

export function AlertDialogAction({ asChild = false, children, destructive = false, onClick }) {
  const { setOpen } = useDialog();
  const element = asChild ? children : <button>{children}</button>;

  return React.cloneElement(element, {
    onClick: (e) => {
      onClick?.(e);
      setOpen(false);
    },
    className:
      (element.props.className || "") +
      ` inline-flex items-center rounded-md px-4 py-2 text-sm font-medium shadow-sm text-white ${destructive
        ? "bg-red-600 hover:bg-red-700 border border-red-600"
        : "bg-sky-600 hover:bg-sky-700 border border-sky-600"}`,
  });
}
