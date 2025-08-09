"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { updateProjectSchema } from "../schemas";
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DottedSeprator } from "@/components/dotted-seprator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon, ImageIcon, Loader } from "lucide-react";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Project } from "../types";
import { useUpdateProjects } from "../api/use-update-projects";
import { useConfirm } from "@/hooks/use-confirm";
import { useDeleteProjects } from "../api/use-delete-projects";
import { updateWorkSpaceSchema } from "@/features/workspaces/schemas";



interface EditeWorkspaceFormProp {
    onCancel?: () => void;
    initialValues: Project;
};

const EditeProjectForm = ({ onCancel, initialValues }: EditeWorkspaceFormProp) => {

    const router = useRouter();
    const { mutate, isPending } = useUpdateProjects();
    const {
        mutate: deletingProject,
        isPending: isDeletingProject
    } = useDeleteProjects();


    const [DeleteDailog, confirmDelete] = useConfirm(
        "Delete Workspace",
        "this action cannot be undone",
        "destructive"
    );

    const inputRef = useRef<HTMLInputElement>(null);

    const form = useForm<z.infer<typeof updateProjectSchema>>({
        resolver: zodResolver(updateProjectSchema),
        defaultValues: {
            ...initialValues,
            image: initialValues.imageUrl ?? ""
        },
    });

    const handleDelete = async () => {
        const ok = await confirmDelete();
        if (!ok) return;

        deletingProject({
            param: {
                projectId: initialValues.$id
            }
        }, {
            onSuccess: () => {
                window.location.href = `/workspaces/${initialValues.workspaceId}`;
            }
        })
    };



    const onSubmit = (values: z.infer<typeof updateWorkSpaceSchema>) => {
        const finalValues = {
            ...values,
            image: "", // need to upgrade appwrite to pass wthe image url
            imageUrl: "" // need to upgrade appwrite to pass wthe image url
        }
        mutate({
            form: finalValues,
            param: { projectId: initialValues.$id }
        }, {
            onSuccess: () => {
                form.reset();
            }
        }
        );
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue("image", file);
        }
    };





    return (
        <div className="flex flex-col gap-y-4">
            <DeleteDailog />
            <Card className="w-full h-full border-none shadow-none">
                <CardHeader className="flex flex-row items-center gap-x-4 space-y-0 p-7">
                    <Button size="sm" variant="secondary" onClick={onCancel ? onCancel : () => router.push(`/workspaces/${initialValues.workspaceId}/projects/${initialValues.$id}`)}>
                        <ArrowLeftIcon className="size-4 mr-2" />
                        Back
                    </Button>
                    <CardTitle className="text-xl font-bold">
                        {initialValues.name}
                    </CardTitle>
                </CardHeader>
                <div className="px-7">
                    <DottedSeprator />
                </div>
                <CardContent className="p-7">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex flex-col gap-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Project Name
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
                                <FormField
                                    control={form.control}
                                    name='image'
                                    render={({ field }) => (
                                        <div className="flex flex-col gap-y-2">
                                            <div className="flex items-center gap-x-5">
                                                {field.value ? (
                                                    <div className="size-[72px] relative rounded-md overflow-hidden">
                                                        <Image
                                                            src={
                                                                field.value instanceof File
                                                                    ? URL.createObjectURL(field.value)
                                                                    : field.value
                                                            }
                                                            alt="logo"
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>
                                                ) : (
                                                    <Avatar className="size-[72px] flex justify-center items-center">
                                                        <AvatarFallback>
                                                            <ImageIcon className="size-[36px] text-neutral-400" />
                                                        </AvatarFallback>
                                                    </Avatar>
                                                )}
                                                <div className="flex flex-col">
                                                    <p className="text-sm">
                                                        Project Icon
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">
                                                        JPG, PNG, SVG or JPEG, max 1MB
                                                    </p>
                                                    <input
                                                        className="hidden"
                                                        accept=".jpg, .png, .svg, .jpeg"
                                                        type="file"
                                                        ref={inputRef}
                                                        disabled={isPending}
                                                        onChange={handleImageChange}
                                                    />
                                                </div>
                                                {field.value ?
                                                    (
                                                        <Button
                                                            type="button"
                                                            disabled={isPending}
                                                            variant="destructive"
                                                            size="xm"
                                                            className="w-fit mt-2"
                                                            onClick={() => {
                                                                field.onChange(null)
                                                                if (inputRef.current) {
                                                                    inputRef.current.value = "";
                                                                }
                                                            }}
                                                        >
                                                            Remove Image
                                                        </Button>

                                                    ) :
                                                    (
                                                        <Button
                                                            type="button"
                                                            disabled={isPending}
                                                            variant="teritrary"
                                                            size="xm"
                                                            className="w-fit mt-2"
                                                            onClick={() => inputRef.current?.click()}
                                                        >
                                                            Upload Image
                                                        </Button>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    )}
                                />
                            </div>
                            <DottedSeprator className="py-7" />
                            <div className="flex items-center justify-between">
                                <Button type="button" size="lg" variant='secondary' onClick={onCancel} disabled={isPending} className={cn(!onCancel && 'invisible')}>
                                    {isPending ? <Loader className='animate-spin size-4 text-black' /> : 'Cancel'}
                                </Button>
                                <Button type="submit" size="lg" variant='primary' disabled={isPending} >
                                    {isPending ? <Loader className='animate-spin size-4 text-black' /> : 'Save Changes'}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <Card className="w-full h-full border-none shadow-none">
                <CardContent className="p-7">
                    <div className="flex flex-col">
                        <h3 className="font-bold">
                            Danger Zone
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Deleting a project is irreversible and will remove all associated Data
                        </p>
                        <DottedSeprator className="py-7" />
                        <Button className="mt-6  w-fit ml-auto" size="sm" variant="destructive" type="button" disabled={isPending || isDeletingProject} onClick={handleDelete} >
                            {isDeletingProject ? <Loader className='animate-spin size-4 text-black' /> : 'Delete Project'}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
};

export default EditeProjectForm;
