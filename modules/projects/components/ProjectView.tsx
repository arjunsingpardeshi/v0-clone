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
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ProjectView = ({ projectId }: { projectId: string }) => {
  const [activeFragment, setActiveFragment] = useState<Fragment | null>(null)
  const [tabState, setTabState] = useState("preview")
  return (
    <div className="h-screen">
      <ResizablePanelGroup defaultSizes={[300, 800]}>
        <ResizablePanel
          minSize={200}
          className="flex flex-col min-h-0 h-full overflow-hidden"
        >
          <ProjectHeader projectId={projectId} />
          <MessageContainer
            projectId={projectId}
            activeFragment={activeFragment}
            setActiveFragment={setActiveFragment}
          />
        </ResizablePanel>
        <ResizablePanel minSize={400}>
          <Tabs
            className="h-full flex flex-col"
            defaultValue="preview"
            value={tabState}
            onValueChange={(value) => setTabState(value)}
          >
            <div className="w-full flex items-center p-2 border-b gap-x-2">
              <TabsList className="h-8 p-0 border rounded-md">
                <TabsTrigger
                  value="preview"
                  className="rounded-md px-3 flex items-center gap-x-2"
                >
                  <EyeIcon className="size-4" />
                  <span>Demo</span>
                </TabsTrigger>
                <TabsTrigger
                  value="code"
                  className="rounded-md px-3 flex items-center gap-x-2"
                >
                  <Code className="size-4" />
                  <span>Code</span>
                </TabsTrigger>
              </TabsList>
              <div className="ml-auto flex items-center gap-x-2">
                <Button asChild size={"sm"}>
                  <Link href={"/pricing"} className="flex items-center">
                    <CrownIcon className="size-4 mr-2" />
                    Upgrade
                  </Link>
                </Button>
              </div>
            </div>
            <TabsContent value="preview">

            </TabsContent>
            <TabsContent value="code">

            </TabsContent>
          </Tabs>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

export default ProjectView