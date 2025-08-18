'use client';
import Link from 'next/link';
import { z } from 'zod';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useRegister } from '../api/use-register';
import { registerSchema } from '../schemas';
import { DottedSeprator } from '@/components/dotted-seprator';
import { Loader } from 'lucide-react';
import { signUpWithGithub, signUpWithGoogle } from '@/lib/oauth';

const SignUpCard = () => {
    const { mutate, isPending } = useRegister();

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    });

    const onSubmite = (values: z.infer<typeof registerSchema>) => {
        // console.log(values);
        mutate({ json: values });
    }

    return (
        <Card className='w-full h-full md:w-[487px] border-none shadow-none '>
            <CardHeader className='flex items-center justify-center text-center p-7'>
                <CardTitle className='text-2xl'>
                    Sign Up
                </CardTitle>
                <CardDescription>
                    By signing up, you agree to our{" "}
                    <Link href="#">
                        <span className='text-blue-700'>Privecy Policy</span>
                    </Link>
                    {" "}and{" "}
                    <Link href="#">
                        <span className='text-blue-700'>Terms of Services</span>
                    </Link>
                </CardDescription>
            </CardHeader>
            <div className='px-7'>
                <DottedSeprator />
            </div>
            <CardContent className='p-7'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmite)} className='space-y-4'>
                        <FormField
                            name='name'
                            control={form.control}
                            disabled={isPending}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type='text'
                                            placeholder='Enter Your Name'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                            }
                        />
                        <FormField
                            name='email'
                            control={form.control}
                            disabled={isPending}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
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
                            disabled={isPending}
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type='password'
                                            placeholder='Enter Your Password'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                            }
                        />
                        <Button disabled={isPending} size='lg' className='w-full'>
                            {isPending ? <Loader className='animate-spin size-4 text-black' /> : 'Register'}
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <div className='px-7'>
                <DottedSeprator />
            </div>
            <CardContent className='px-7 flex flex-col gap-y-4'>
                <Button onClick={() => signUpWithGoogle()} disabled={isPending} variant='secondary' size='lg' className='w-full' >
                    <FcGoogle className='mr-2 size-5' />
                    Login with Google
                </Button>
                <Button onClick={() => signUpWithGithub()} disabled={isPending} variant='secondary' size='lg' className='w-full' >
                    <FaGithub className='mr-2 size-5' />
                    Login with GitHub
                </Button>
            </CardContent>
            <div className='px-7'>
                <DottedSeprator />
            </div>
            <CardContent className='p-7 flex justify-center items-center'>
                <p>
                    Already have Account &nbsp;
                    <Link href='/sign-in' >
                        <span className='text-blue-700'>
                            Login
                        </span>
                    </Link>
                </p>
            </CardContent>
        </Card>
    )
}

export default SignUpCard