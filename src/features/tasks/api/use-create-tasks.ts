import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/rpc";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.tasks["$post"], 200>;
type RequestType = InferRequestType<typeof client.api.tasks["$post"]>;

export const useCreateTasks = () => {
    const queryClient = useQueryClient();
    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({ json }) => {
            // console.log('json', json);
            const response = await client.api.tasks["$post"]({ json });
            if (!response.ok) {
                throw new Error("fail to create tasks");
            }
            return await response.json();
        },
        onSuccess: () => {
            toast.success('Task Created');
            queryClient.invalidateQueries({ queryKey: ["projects"] });
        },
        onError: () => {
            toast.error('Faild To Create task');
        }
    });

    return mutation
}