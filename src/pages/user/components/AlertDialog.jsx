import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { cn } from "../../../lib/utils"

/*
Usage:

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogDescription
} from "./AlertDialog";

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

export function AlertDialog({ children, className }) {
  const [open, setOpen] = useState(false);
  const lastFocused = useRef(null);
  const contentRef = useRef(null);

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

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <DialogContext.Provider value={{ open, setOpen, contentRef }}>
      <div className={cn(className)}>{children}</div>
    </DialogContext.Provider>
  );
}

export function AlertDialogTrigger({ asChild = false, children, className }) {
  const { setOpen } = useDialog();
  const element = asChild ? children : <button>{children}</button>;

  return React.cloneElement(element, {
    onClick: (e) => {
      element.props?.onClick?.(e);
      setOpen(true);
    },
    className: cn(element.props.className, className),
  });
}

export function AlertDialogPortal({ children, className }) {
  const { open } = useDialog();
  if (!open) return null;
  return <div className={cn(className)}>{children}</div>;
}

export function AlertDialogOverlay({ className }) {
  const { setOpen } = useDialog();

  return (
    <div
      className={cn(
        "fixed inset-0 z-80 bg-black/50 backdrop-blur-sm",
        className
      )}
      onClick={() => setOpen(false)}
    />
  );
}

export function AlertDialogContent({ children, className }) {
  const { contentRef } = useDialog();

  return (
    <div className="fixed inset-0 z-99 flex items-center justify-center px-4 py-6">
      <div
        ref={contentRef}
        tabIndex={-1}
        role="alertdialog"
        className={cn(
          "relative w-full max-w-lg rounded-xl bg-white p-6 shadow-xl ring-1 ring-black/5",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export function AlertDialogTitle({ children, className }) {
  return (
    <h2 className={cn("text-lg font-semibold text-slate-900", className)}>
      {children}
    </h2>
  );
}

export function AlertDialogDescription({ children, className }) {
  return (
    <p className={cn("mt-2 text-sm text-slate-600", className)}>
      {children}
    </p>
  );
}

export function AlertDialogFooter({ children, className }) {
  return (
    <div className={cn("mt-6 flex justify-end gap-3", className)}>
      {children}
    </div>
  );
}

export function AlertDialogCancel({ asChild = false, children, className }) {
  const { setOpen } = useDialog();

  // Always wrap in a real button unless explicitly using asChild
  const element = asChild ? children : <button type="button">{children}</button>;

  return React.cloneElement(element, {
    onClick: (e) => {
      element.props?.onClick?.(e);
      setOpen(false);
    },
    className: cn(
      "inline-flex items-center rounded-md border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50",
      element.props.className,
      className
    ),
  });
}

export function AlertDialogAction({
  asChild = false,
  children,
  destructive = false,
  onClick,
  className,
}) {
  const { setOpen } = useDialog();

  const element = asChild ? children : <button type="button">{children}</button>;

  return React.cloneElement(element, {
    onClick: (e) => {
      onClick?.(e);
      element.props?.onClick?.(e);
      setOpen(false);
    },
    className: cn(
      "inline-flex items-center rounded-md px-4 py-2 text-sm font-medium shadow-sm text-white",
      destructive
        ? "bg-red-600 hover:bg-red-700 border border-red-600"
        : "bg-sky-600 hover:bg-sky-700 border border-sky-600",
      element.props.className,
      className
    ),
  });
}

