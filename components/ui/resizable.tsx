"use client"

import { Allotment } from "allotment"
import { cn } from "@/lib/utils"

type ResizablePanelGroupProps = {
  direction?: "horizontal" | "vertical"
  className?: string
  children: React.ReactNode
  defaultSizes?: number[]  
}

export function ResizablePanelGroup({
  direction = "horizontal",
  className,
  children,
  defaultSizes,
}: ResizablePanelGroupProps) {
  return (
    <Allotment
      defaultSizes={defaultSizes} 
      className={cn("h-screen w-full", className)}
    >
      {children}
    </Allotment>
  )
}

type ResizablePanelProps = {
  minSize?: number
  className?: string
  children?: React.ReactNode
}

export function ResizablePanel({
  minSize,
  className,
  children,
}: ResizablePanelProps) {
  return (
    <Allotment.Pane
      minSize={minSize}
      className={cn("min-h-0 min-w-0", className)}
    >
      {children}
    </Allotment.Pane>
  )
}
