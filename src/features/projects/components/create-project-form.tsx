"use client";
import { z } from 'zod';
import Image from "next/image";
import { ImageIcon, Loader } from "lucide-react";
import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
// import { useRouter } from "next/navigation";
import { useWorkspaceId } from "@/features/workspaces/hooks/workspace-id";
import { cn } from "@/lib/utils";
import { DottedSeprator } from "@/components/dotted-seprator";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createProjectSchema } from "../schemas";
import { useCreateProjects } from "../api/use-create-projects";


interface CreateProjectFormProp {
    onCancel?: () => void;
};

const CreateProjectForm = ({ onCancel }: CreateProjectFormProp) => {

    const workspaceId = useWorkspaceId();

    // const router = useRouter();
    const { mutate, isPending } = useCreateProjects();
    const inputRef = useRef<HTMLInputElement>(null);
    const formSchema = createProjectSchema.omit({ workspaceId: true });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const finalValues = {
            ...values,
            workspaceId,
            image: "",
        };

        mutate(
            { form: finalValues },
            {
                onSuccess: () => {
                    form.reset();
                    // router.push(`/workspaces/${workspaceId}/projects/${data.$id}`)
                },
            }
        );
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue("image", file);
        }
    }

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
                        <div className="flex flex-col gap-y-4">
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
                                                    Wrokspace Icon
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
                                {isPending ? <Loader className='animate-spin size-4 text-black' /> : 'Create Workspace'}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
};

export default CreateProjectForm;
