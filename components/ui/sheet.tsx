"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "radix-ui"
import { XIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Sheet({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="sheet" {...props} />
}

function SheetTrigger({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}

function SheetPortal({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="sheet-portal" {...props} />
}

function SheetClose({
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="sheet-close" {...props} />
}

function SheetOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) {
  return (
    <DialogPrimitive.Overlay
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-60 bg-black/25",
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "duration-150",
        className
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  side?: "right" | "bottom"
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <DialogPrimitive.Content
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          "fixed z-70 bg-white",
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "duration-200 ease-in-out",
          side === "right" && [
            "right-0 top-0 h-full w-full max-w-[min(38rem,100vw)]",
            "border-l border-rurikon-border shadow-xl overflow-y-auto",
            "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
          ],
          side === "bottom" && [
            "inset-x-0 bottom-0 flex max-h-[90dvh] w-full flex-col",
            "rounded-t-lg border-t border-rurikon-border shadow-xl",
            "pb-[env(safe-area-inset-bottom)] overflow-y-auto overscroll-contain",
            "data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
          ],
          className
        )}
        {...props}
      >
        {side === "bottom" ? (
          <div className="flex justify-center pt-2" aria-hidden>
            <div className="h-1 w-10 rounded-full bg-rurikon-200" />
          </div>
        ) : null}
        {children}
        <DialogPrimitive.Close className="absolute right-3 top-3 rounded-sm p-0.5 opacity-50 transition-opacity hover:opacity-100 focus:outline-none focus:ring-1 focus:ring-rurikon-300">
          <XIcon className="h-4 w-4 text-rurikon-500" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </SheetPortal>
  )
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn(
        "flex flex-col gap-1 px-5 pt-5 pb-4 border-b border-rurikon-border/60",
        className
      )}
      {...props}
    />
  )
}

function SheetTitle({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-sm font-semibold text-rurikon-700", className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-xs text-rurikon-400", className)}
      {...props}
    />
  )
}

function SheetBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-body"
      className={cn("px-5 py-4 space-y-5", className)}
      {...props}
    />
  )
}

export {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetBody,
  SheetPortal,
  SheetTitle,
  SheetTrigger,
}
