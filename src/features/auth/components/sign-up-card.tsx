import React from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import DottedSeprator from '@/components/dotted-seprator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const SignUpCard = () => {
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
                <form className='space-y-4'>
                    <Input
                        required
                        type='text'
                        value={""}
                        onChange={() => { }}
                        placeholder='Enter Your Name'
                        disabled={false}
                    />
                    <Input
                        required
                        type='email'
                        value={""}
                        onChange={() => { }}
                        placeholder='Enter Email Address'
                        disabled={false}
                    />
                    <Input
                        required
                        type='password'
                        value={""}
                        onChange={() => { }}
                        placeholder='Enter Password'
                        disabled={false}
                        min={8}
                        max={256}
                    />
                    <Button disabled={false} size='lg' className='w-full'>
                        Login
                    </Button>
                </form>
            </CardContent>
            <div className='px-7'>
                <DottedSeprator />
            </div>
            <CardContent className='px-7 flex flex-col gap-y-4'>
                <Button disabled={false} variant='secondary' size='lg' className='w-full' >
                    <FcGoogle className='mr-2 size-5' />
                    Login with Google
                </Button>
                <Button disabled={false} variant='secondary' size='lg' className='w-full' >
                    <FaGithub className='mr-2 size-5' />
                    Login with GitHub
                </Button>
            </CardContent>
        </Card>
    )
}

export default SignUpCard