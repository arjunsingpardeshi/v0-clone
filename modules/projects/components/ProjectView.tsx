"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  ResizablePanelGroup,
  ResizablePanel,
} from "@/components/ui/resizable";
import { useState } from "react";
import { Code, CrownIcon, EyeIcon } from "lucide-react";
import { minSize } from "zod";
import ProjectHeader from "./ProjectHeader";

const ProjectView = ({projectId}: {projectId:string}) => {
  return (
    <div className="h-screen">
        <ResizablePanelGroup direction= "horizontal">
            <ResizablePanel 
                defaultSize={300}
                minSize={200}
                className="flex flex-col min-h-0"
            >
                <ProjectHeader projectId={projectId}/>
            </ResizablePanel>
            <ResizablePanel defaultSize={800} minSize={400}>

            </ResizablePanel>
        </ResizablePanelGroup>
    </div>
  )
}

export default ProjectView