
import ProjectView from "@/modules/projects/components/ProjectView"
import { PageProps } from "@/types/interface";
const Page = ({params}: PageProps) => {
    
    const {projectId} = params;
    return  (
        <ProjectView projectId = {projectId}/>
    )
  
}

export default Page