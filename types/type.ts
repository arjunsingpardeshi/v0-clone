export type Message = {
  id: string
  content: string
  role: "USER" | "ASSISTANT"
  type: "RESULT" | "ERROR"
  createdAt: string
  updatedAt: string
  projectId: string
}
