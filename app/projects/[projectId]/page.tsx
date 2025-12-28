
import ProjectView from "@/modules/projects/components/ProjectView"
import { PageProps } from "@/types/interface";
const Page = async ({params}: PageProps) => {
    
    const {projectId} =  await params;
    return  (
        <ProjectView projectId = {projectId}/>
    )
  
}

export default Page