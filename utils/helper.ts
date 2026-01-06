import { Prisma } from "@prisma/client";

export function normalizeCode(value: Prisma.JsonValue): string {
  if (typeof value === "string") return value;
  return JSON.stringify(value, null, 2);
}
