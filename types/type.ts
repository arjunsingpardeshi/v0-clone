import { Prisma } from "@/lib/generated/prisma/client"

export type DbMessage = {
  id: string
  content: string
  role: "USER" | "ASSISTANT"
  type: "RESULT" | "ERROR"
  createdAt: string
  updatedAt: string
  projectId: string
}

export type FileMap = Record<string, Prisma.JsonValue>;

export type TreeNode = {
  [key: string]: TreeNode | null;
};

export type UITreeNode = {
  name: string;
  path: string;
  children?: UITreeNode[];
}
export type TreeItem =
  | string
  | [string, ...TreeItem[]];
