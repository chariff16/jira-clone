import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

interface useGetProjectsProp {
    workspaceId: string
}

export const useGetProjects = ({ workspaceId }: useGetProjectsProp) => {
    const query = useQuery({
        queryKey: ["projects", workspaceId],
        queryFn: async () => {
            const response = await client.api.projects.$get({ query: { workspaceId } });

            if (!response.ok) {
                throw new Error("fail to fetch projects");
            }

            const { data } = await response.json();

            return data
        }
    })

    return query
}