import { cn } from "../../../lib/utils";
import { ChevronRight } from "lucide-react";

export function Breadcrumb({ className, ...props }) {
  return (
    <nav
      aria-label="breadcrumb"
      className={cn("w-full", className)}
      {...props}
    />
  );
}

export function BreadcrumbList({ className, ...props }) {
  return (
    <ol
      className={cn(
        "flex items-center gap-1 text-sm text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

export function BreadcrumbItem({ className, ...props }) {
  return <li className={cn("flex items-center py-1.5 px-1", className)} {...props} />;
}

export function BreadcrumbLink({ className, href = "#", ...props }) {
  return (
    <a
      href={href}
      className={cn(
        "transition-colors hover:text-foreground text-foreground/70",
        className
      )}
      {...props}
    />
  );
}

export function BreadcrumbPage({ className, ...props }) {
  return (
    <span
      className={cn("font-semibold text-foreground", className)}
      {...props}
    />
  );
}

export function BreadcrumbSeparator({ className, ...props }) {
  return (
    <ChevronRight
      size={14}
      className={cn("text-muted-foreground/50 mx-1", className)}
      {...props}
    />
  );
}
