import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

interface useGetWorkspaceProp {
    workspaceId: string
}

export const useGetWorkspace = ({ workspaceId }: useGetWorkspaceProp) => {
    const query = useQuery({
        queryKey: ["workspace", workspaceId],
        queryFn: async () => {
            const response = await client.api.workspaces[":workspaceId"].$get({ param: { workspaceId } });

            if (!response.ok) {
                throw new Error("fail to fetch workspace");
            }

            const { data } = await response.json();

            return data
        }
    })

    return query
}