"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogBody,
} from "@/components/ui/dialog"

interface ConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  confirmLabel?: string
  onConfirm: () => void
  destructive?: boolean
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "confirm",
  onConfirm,
  destructive = false,
}: ConfirmDialogProps) {
  function handleConfirm() {
    onOpenChange(false)
    onConfirm()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <DialogBody className="flex items-center justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="px-3 py-1.5 text-xs font-mono text-rurikon-400 hover:text-rurikon-600 transition-colors rounded-sm border border-rurikon-border/60 hover:border-rurikon-border bg-transparent"
          >
            cancel
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className={
              destructive
                ? "px-3 py-1.5 text-xs font-mono text-white bg-red-500 hover:bg-red-600 transition-colors rounded-sm"
                : "px-3 py-1.5 text-xs font-mono text-white bg-rurikon-600 hover:bg-rurikon-700 transition-colors rounded-sm"
            }
          >
            {confirmLabel}
          </button>
        </DialogBody>
      </DialogContent>
    </Dialog>
  )
}
