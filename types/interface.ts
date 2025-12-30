import type{ Fragment } from "@/lib/generated/prisma/client";
import type { Prisma } from '@/lib/generated/prisma/client'

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
  fragment: Fragment;
  createdAt: Date | string;
  isActiveFragment: boolean;
  onFragmentClick:() => void;
  type: string;
}

export interface AssistantMessageProps {
  content: string;
  fragment: Fragment;
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

