"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import { createWorkSpaceSchema } from "../schemas";
import { z } from 'zod';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { DottedSeprator } from "@/components/dotted-seprator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateWorkspace } from "../api/use-create-workspace";
import { ImageIcon, Loader } from "lucide-react";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import Image from "next/image";


interface CreateWorkspaceFormProp {
    onCancel?: () => void;
};

const CreateWorkspaceForm = ({ onCancel }: CreateWorkspaceFormProp) => {

    const { mutate, isPending } = useCreateWorkspace();
    const inputRef = useRef<HTMLInputElement>(null)

    const form = useForm<z.infer<typeof createWorkSpaceSchema>>({
        resolver: zodResolver(createWorkSpaceSchema),
        defaultValues: {
            name: "",
        },
    });

    const onSubmit = (values: z.infer<typeof createWorkSpaceSchema>) => {
        const finalValues = {
            ...values,
            image: "", // need to upgrade appwrite to pass wthe image url
            imageUrl: undefined // need to upgrade appwrite to pass wthe image url
        }
        mutate({ form: finalValues }, {
            onSuccess: () => {
                form.reset();
            }
        }
        );
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            form.setValue("imageUrl", file);
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
                                name='imageUrl'
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
                                        </div>
                                    </div>
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
