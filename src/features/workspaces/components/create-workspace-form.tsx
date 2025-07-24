"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createWorkSpaceSchema } from "../schemas";
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DottedSeprator } from "@/components/dotted-seprator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "../api/use-create-workspace";
import { Loader } from "lucide-react";


interface CreateWorkspaceFormProp {
    onCancel?: () => void;
};

const CreateWorkspaceForm = ({ onCancel }: CreateWorkspaceFormProp) => {

    const { mutate, isPending } = useCreateWorkspace();

    const form = useForm<z.infer<typeof createWorkSpaceSchema>>({
        resolver: zodResolver(createWorkSpaceSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = (values: z.infer<typeof createWorkSpaceSchema>) => {
        mutate({ json: values });
    };

    return (
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="flex p-7">
                <CardTitle className="text-xl font-bold">
                    Create a new workspace
                </CardTitle>
            </CardHeader>
            <div className="px-7">
                <DottedSeprator />
            </div>
            <CardContent className="p-7">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex felx-col gap-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Workspaces Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                placeholder="Enter workspace name"
                                                disabled={isPending}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DottedSeprator className="py-7" />
                        <div className="flex items-center justify-between">
                            <Button type="button" size="lg" variant='secondary' onClick={onCancel} disabled={isPending}>
                                {isPending ? <Loader className='animate-spin size-4 text-black' /> : 'Cancel'}
                            </Button>
                            <Button type="submit" size="lg" variant='primary' disabled={isPending} >
                                {isPending ? <Loader className='animate-spin size-4 text-black' /> : 'Create Workspace'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
};

export default CreateWorkspaceForm;
