"use client"

import { Allotment } from "allotment"
import { cn } from "@/lib/utils"

type ResizablePanelGroupProps = {
  direction?: "horizontal" | "vertical"
  className?: string
  children: React.ReactNode
}

export function ResizablePanelGroup({
  direction = "horizontal",
  className,
  children,
}: ResizablePanelGroupProps) {
  return (
    <Allotment
      direction={direction}
      className={cn("h-full w-full", className)}
    >
      {children}
    </Allotment>
  )
}

type ResizablePanelProps = {
  defaultSize?: number
  minSize?: number
  className?: string
  children?: React.ReactNode
}

export function ResizablePanel({
  defaultSize,
  minSize,
  className,
  children,
}: ResizablePanelProps) {
  return (
    <Allotment.Pane
      preferredSize={defaultSize}
      minSize={minSize}
      className={cn("min-h-0 min-w-0", className)}
    >
      {children}
    </Allotment.Pane>
  )
}
