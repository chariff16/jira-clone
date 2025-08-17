import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";
import { InferResponseType } from "hono";

interface useGetProjectAnalyticsProp {
    projectId: string
};

export type ProjectAnalyticsResponseType = InferResponseType<
    (typeof client.api.projects)[":projectId"]["analytics"]["$get"],
    200
>;

export const useGetProjectAnalytics = ({ projectId }: useGetProjectAnalyticsProp) => {
    const query = useQuery({
        queryKey: ["project-analytics", projectId],
        queryFn: async () => {
            const response = await client.api.projects[":projectId"]['analytics'].$get({ param: { projectId } });

            if (!response.ok) {
                throw new Error("fail to fetch project analytics");
            }

            const { data } = await response.json();

            return data
        }
    })

    return query
}