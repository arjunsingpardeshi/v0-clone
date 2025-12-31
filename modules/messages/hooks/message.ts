import { useQuery, useMutation, useQueryClient, QueryClient } from "@tanstack/react-query";
import { createMessage, getMessages } from "../action";


export const prefetchMessages = async(queryClient: QueryClient, projectId: string) => {
    await queryClient.prefetchQuery({
        queryKey: ["messages", projectId],
        queryFn: ()=> getMessages(projectId),
        staleTime: 10000
    })
}


export const useGetMessages = (projectId: string)=>{
    return useQuery({
        queryKey: ["messages", projectId],
        queryFn: ()=> getMessages(projectId),
        staleTime: 10000,
        refetchInterval: (data) => {
            return data?.length ? 5000 : false
        }
    })
}

export const useCreateMessages = (projecId: string)=>{

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (value: string) => createMessage(value, projecId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["messages", projecId]
            }),
            queryClient.invalidateQueries({
                queryKey: ["status"]
            })
        }

    })
}