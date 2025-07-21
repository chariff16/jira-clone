import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface AuthProps {
    children: React.ReactNode
}

const layout = ({ children }: AuthProps) => {
    return (
        <main className='bg-neutral-100 min-h-screen'>
            <div className='mx-auto max-w-screen-2xl p-4'>
                <nav className='flex justify-between items-center'>
                    <Image
                        src='/logo.svg'
                        height={56}
                        width={152}
                        alt='logo image'
                    />
                    <Button variant="secondary">
                        Sing up
                    </Button>
                </nav>
                <div className='flex flex-col items-center justify-center pt-4 md:pt-14 gap-2'>
                    {children}
                </div>

            </div>
        </main>
    )
}

export default layout
