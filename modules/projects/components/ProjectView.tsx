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
import MessageContainer from "./MessageContainer";
import { Fragment } from "@/lib/generated/prisma/client";

const ProjectView = ({projectId}: {projectId:string}) => {
  const [activeFragment, setActiveFragment] = useState<Fragment | null>(null)
  return (
    <div className="h-screen">
        <ResizablePanelGroup defaultSizes={[300, 800]}>
            <ResizablePanel 
                minSize={200}
                className="flex flex-col min-h-0"
            >
                <ProjectHeader projectId={projectId}/>
                <MessageContainer
                projectId = {projectId}
                activeFragment = {activeFragment}
                setActiveFragment = {setActiveFragment}
                />
            </ResizablePanel>
            <ResizablePanel  minSize={400}>

            </ResizablePanel>
        </ResizablePanelGroup>
    </div>
  )
}

export default ProjectView