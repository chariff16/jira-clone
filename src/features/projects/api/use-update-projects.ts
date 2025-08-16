import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.projects[':projectId']["$patch"], 200>;
type RequestType = InferRequestType<typeof client.api.projects[':projectId']["$patch"]>;

export const useUpdateProjects = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({ form, param }) => {
            const response = await client.api.projects[':projectId'].$patch({ form, param });
            if (!response.ok) {
                throw new Error("fail to update project");
            }
            return await response.json()
        },
        onSuccess: ({ data }) => {
            toast.success('Project update');
            queryClient.invalidateQueries({ queryKey: ["projects"] });
            queryClient.invalidateQueries({ queryKey: ["project", data.$id] });
        },
        onError: () => {
            toast.error('Faild To update Project');
        }
    });

    return mutation
}