import React from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import DottedSeprator from '@/components/dotted-seprator';
import { Button } from '@/components/ui/button';

const SignInCard = () => {
    return (
        <Card className='w-full h-full md:w-[487px] border-none shadow-none '>
            <CardHeader className='flex items-center justify-center text-center p-7'>
                <CardTitle className='text-2xl'>
                    hello man
                </CardTitle>
            </CardHeader>
            <div className='px-7'>
                <DottedSeprator />
            </div>
            <CardContent className='p-7'>
                <form className='space-y-4'>
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

export default SignInCard