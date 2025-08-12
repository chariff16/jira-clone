import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

interface useGetTaskProp {
    taskId: string
}

export const useGetTask = ({
    taskId
}: useGetTaskProp) => {
    const query = useQuery({
        queryKey: [
            "task",
            taskId
        ],
        queryFn: async () => {
            const response = await client.api.tasks[':taskId'].$get({ param: { taskId } });

            if (!response.ok) {
                throw new Error("fail to fetch task");
            }

            const { data } = await response.json();

            return data
        }
    })

    return query
}