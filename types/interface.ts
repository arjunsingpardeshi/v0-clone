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
