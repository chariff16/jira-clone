'use client';
import { z } from 'zod';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { DottedSeprator } from '@/components/dotted-seprator';
import Link from 'next/link';
import { loginSchema } from '../schemas';
import { useLogin } from '../api/use-login';
import { Loader } from 'lucide-react';


const SignInCard = () => {
    const { mutate, isPending } = useLogin();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmite = (values: z.infer<typeof loginSchema>) => {
        // console.log(values);
        mutate({ json: values });
    }

    return (
        <Card className='w-full h-full md:w-[487px] border-none shadow-none '>
            <CardHeader className='flex items-center justify-center text-center p-7'>
                <CardTitle className='text-2xl'>
                    Welcome back!
                </CardTitle>
            </CardHeader>
            <div className='px-7'>
                <DottedSeprator />
            </div>
            <CardContent className='p-7'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmite)} className='space-y-4'>
                        <FormField
                            name='email'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            type='email'
                                            placeholder='Enter Email Address'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                            }
                        />
                        <FormField
                            name='password'
                            control={form.control}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            disabled={isPending}
                                            type='password'
                                            placeholder='Enter Password'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                            }
                        />
                        <Button disabled={isPending} size='lg' className='w-full'>
                            {isPending ? <Loader className='animate-spin size-4 text-black' /> : 'Login'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <div className='px-7'>
                <DottedSeprator />
            </div>
            <CardContent className='px-7 flex flex-col gap-y-4'>
                <Button disabled={isPending} variant='secondary' size='lg' className='w-full' >
                    <FcGoogle className='mr-2 size-5' />
                    Login with Google
                </Button>
                <Button disabled={isPending} variant='secondary' size='lg' className='w-full' >
                    <FaGithub className='mr-2 size-5' />
                    Login with GitHub
                </Button>
            </CardContent>
            <div className='px-7'>
                <DottedSeprator />
            </div>
            <CardContent className='p-7 flex justify-center items-center'>
                <p>
                    Don&apos;t have Account?&nbsp;
                    <Link href='/sign-up' >
                        <span className='text-blue-700'>
                            Create Account
                        </span>
                    </Link>
                </p>
            </CardContent>
        </Card>
    )
}

export default SignInCard