import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Prisma } from "./generated/prisma/client";
import { TreeItem, TreeNode } from "@/types/type";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}



/**
 * Convert a record of files to a tree structure.
 * @param files - Record of file paths to content
 * @returns Tree structure for TreeView component
 *
 * @example
 * Input: { "src/Button.tsx": "...", "README.md": "..." }
 * Output: [["src", "Button.tsx"], "README.md"]
 */
export function convertFilesToTreeItems(
  files: Prisma.JsonValue
): TreeItem[] {
  // ✅ typed tree
  const tree: TreeNode = {};

  const sortedPaths = (() => {
    if (files && typeof files === "object" && !Array.isArray(files)) {
      return Object.keys(files).sort();
    }
    return [];
  })();

  for (const filePath of sortedPaths) {
    const parts = filePath.split("/");
    let current: TreeNode = tree;

    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      if (!current[part]) {
        current[part] = {};
      }
      current = current[part] as TreeNode;
    }

    const fileName = parts[parts.length - 1];
    current[fileName] = null;
  }

  // ✅ typed recursive function
  function convertNode(node: TreeNode): TreeItem[] {
  const entries = Object.entries(node);
  const result: TreeItem[] = [];

  for (const [key, value] of entries) {
    if (value === null) {
      // file
      result.push(key);
    } else {
      // folder
      const children = convertNode(value);
      result.push([key, ...children]);
    }
  }

  return result;
}


  const result = convertNode(tree);
  return Array.isArray(result) ? result : [result];
}
