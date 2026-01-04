import type { Prisma } from '@/lib/generated/prisma/client'
import { CopyCheckIcon, CopyIcon } from "lucide-react";
import { useState, useMemo, useCallback, Fragment, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from "@/components/ui/breadcrumb";
import { Hint } from '@/components/ui/hint';
import { convertFilesToTreeItems } from '@/lib/utils';
import { TreeView } from './TreeView';
import { CodeView } from './code-view';
import { FileMap } from '@/types/type';



const FileBreadcrumb = ({ filePath }: { filePath: string }) => {
  const pathSegments = filePath.split("/");
  const maxSegments = 4;

  const renderBreadCrumItems = () => {
    if (pathSegments.length <= maxSegments) {
      return pathSegments.map((segment, index) => {
        const isLast = index === pathSegments.length - 1;

        return (
          <Fragment key={index}>
            <BreadcrumbItem>
              {isLast ? (
                <BreadcrumbPage>{segment}</BreadcrumbPage>
              ) : (
                <span className="text-muted-foreground+">{segment}</span>
              )}
            </BreadcrumbItem>
            {!isLast && <BreadcrumbSeparator />}
          </Fragment>
        );
      });
    } else {
      const firstSegment = pathSegments[0];
      const lastSegment = pathSegments[pathSegments.length - 1];

      return (
        <>
          <BreadcrumbItem>
            <span className="text-muted-foreground">{firstSegment}</span>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="font-medium">
              {lastSegment}
            </BreadcrumbItem>
          </BreadcrumbItem>
        </>
      );
    }
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>{renderBreadCrumItems()}</BreadcrumbList>
    </Breadcrumb>
  );
};

function getLanguageFromExtension(filename: string): string {
  const extension = filename.split(".").pop()?.toLowerCase();
  if (!extension) return "text"

  const languageMap: Record<string, string> = {
    js: "javascript",
    jsx: "jsx",
    ts: "typescript",
    tsx: "tsx",
    py: "python",
    html: "html",
    css: "css",
    json: "json",
    md: "markdown",
  };


  return languageMap[extension] ?? "text";
}

const FileExplorer = ({ files }: { files: Prisma.JsonValue }) => {

  const [copied, setCopied] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);


  //Narrow Prisma.JsonValue ONCE
  const fileMap = useMemo<FileMap | null>(() => {
    if (files && typeof files === "object" && !Array.isArray(files)) {
      return files as FileMap;
    }
    return null;
  }, [files]);


  //Initialize selected file safely (moved from useState init)
  useEffect(() => {
    if (!selectedFile && fileMap) {
      const firstKey = Object.keys(fileMap)[0];
      if (firstKey) {
        setSelectedFile(firstKey);
      }
    }
  }, [fileMap, selectedFile]);


  const treeData = useMemo(() => {
    return convertFilesToTreeItems(files);
  }, [files]);


  // File select handler (uses fileMap)
  const handleFileSelect = useCallback(
    (filePath: string) => {
      if (fileMap?.[filePath]) {
        setSelectedFile(filePath);
      }
    },
    [fileMap]
  );

  const handleCopy = useCallback(() => {
    if (!selectedFile || !fileMap) return;

    const content = fileMap[selectedFile];
    if (!content) return;

    const text =
      typeof content === "string"
        ? content
        : JSON.stringify(content, null, 2);

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((error) => {
        console.error("Failed to copy:", error);
      });
  }, [selectedFile, fileMap]);

  return (
    <ResizablePanelGroup defaultSizes={[300, 800]} className="h-full">
      <ResizablePanel
        minSize={200}
        className="bg-sidebar flex flex-col min-h-0 h-full overflow-hidden"
      >
        <div className="h-full overflow-auto">
          <TreeView
            data={treeData}
            value={selectedFile}
            onSelect={handleFileSelect}
          />
        </div>
      </ResizablePanel>

      <ResizablePanel minSize={400} className="flex flex-col min-h-0 h-full overflow-hidden">
        {selectedFile && fileMap?.[selectedFile] ? (
          <div className="h-full w-full flex flex-col">
            <div className="border-b bg-sidebar/50 px-4 py-2 flex justify-between items-center gap-x-2">
              <FileBreadcrumb filePath={selectedFile} />
              <Hint text="Copy to clipboard" side="bottom" sideOffset={4}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-background/80"
                  onClick={handleCopy}
                >
                  {copied ? (
                    <CopyCheckIcon className="h-4 w-4 text-amber-500" />
                  ) : (
                    <CopyIcon className="h-4 w-4" />
                  )}
                </Button>
              </Hint>
            </div>

            <div className="flex-1 overflow-auto relative">
              <CodeView
                code={fileMap[selectedFile]}
                lang={getLanguageFromExtension(selectedFile)}
              />
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <p className="text-sm">Select a file to view its content</p>
          </div>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default FileExplorer;
