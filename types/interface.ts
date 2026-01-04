import type{ Fragment } from "@/lib/generated/prisma/client";
import type { Prisma } from '@/lib/generated/prisma/client'
import { TreeItem } from "./type";

export interface Props  {
  children: React.ReactNode;
};

export interface Project{
  id: string;
  name: string;
  userId: string;
  createdAt: string;
  updatedAt: string
}

export interface PageProps  {
  params: {
    projectId: string
  }
}

export interface MessageContainerProps {
  projectId: string;
  activeFragment: Fragment | null;
  setActiveFragment: (fragment: Fragment|null) => void
}


export interface MessageCardProps {
  content: string;
  role: string;
  fragment: Fragment | null;
  createdAt: Date | string;
  isActiveFragment: boolean;
  onFragmentClick:() => void;
  type: string;
}

export interface AssistantMessageProps {
  content: string;
  fragment: Fragment | null;
  createdAt: Date | string;
  isActiveFragment: boolean;
  onFragmentClick:() => void;
  type: string;
}

export interface FragmentCardProps
{
  fragment: Fragment;
  isActiveFragment: boolean;
  onFragmentClick:(fragment:Fragment) => void;
}


export interface HintProps  {
  children: React.ReactNode;
  text: string;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  sideOffset?: number;
};



export interface TreeViewProps {
  data: TreeItem[];
  value: string | null;
  onSelect: (filePath: string)=> void;
}


export interface TreeProps {
  item: TreeItem;
  selectedValue: string | null;
  onSelect: (filePath: string) => void;
  parentPath: string;
}