"use client"

import { Props } from "@/types/interface"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { useState } from "react"
const QueryProvider = ({children}: Props) => {


     
    const [client] = useState(()=>new QueryClient())
  return (
    <QueryClientProvider client={client}>
        {children}
    </QueryClientProvider>
  )
}

export default QueryProvider