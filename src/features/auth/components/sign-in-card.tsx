import { z } from 'zod';
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import DottedSeprator from '@/components/dotted-seprator';


const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1, "Required"),
})

const SignInCard = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const onSubmite = (values: z.infer<typeof formSchema>) => {
        console.log(values);
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
                                            type='password'
                                            placeholder='Enter Password'
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )
                            }
                        />
                        <Button disabled={false} size='lg' className='w-full'>
                            Login
                        </Button>
                    </form>
                </Form>
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