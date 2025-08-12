import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { TaskStatus } from "../types";

interface useGetTasksProp {
    workspaceId: string;
    projectId?: string | null;
    status?: TaskStatus | null;
    assigneeId?: string | null;
    dueDate?: string | null;
    search?: string | null;
}

export const useGetTasks = ({ workspaceId,
    assigneeId,
    dueDate,
    projectId,
    search,
    status
}: useGetTasksProp) => {
    const query = useQuery({
        queryKey: [
            "tasks",
            workspaceId,
            assigneeId,
            dueDate,
            projectId,
            search,
            status
        ],
        queryFn: async () => {
            const response = await client.api.tasks.$get({
                query: {
                    workspaceId,
                    projectId: projectId ?? undefined,
                    status: status ?? undefined,
                    assigneeId: assigneeId ?? undefined,
                    dueDate: dueDate ?? undefined,
                    search: search ?? undefined,
                },
            });

            if (!response.ok) {
                throw new Error("fail to fetch Tasks");
            }

            const { data } = await response.json();

            return data
        }
    })

    return query
}