import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

interface useGetTasksProp {
    workspaceId: string
}

export const useGetTasks = ({ workspaceId }: useGetTasksProp) => {
    const query = useQuery({
        queryKey: ["tasks", workspaceId],
        queryFn: async () => {
            const response = await client.api.tasks.$get({ query: { workspaceId } });

            if (!response.ok) {
                throw new Error("fail to fetch projects");
            }

            const { data } = await response.json();

            return data
        }
    })

    return query
}