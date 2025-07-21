'use client'
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface AuthProps {
    children: React.ReactNode
}

const Authlayout = ({ children }: AuthProps) => {
    const pathName = usePathname();

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
                    <Button asChild variant="secondary">
                        <Link href={pathName === '/sign-in' ? '/sign-up' : '/sign-in'}>
                            {pathName === '/sign-in' ? 'Sing up' : 'Login'}
                        </Link>
                    </Button>
                </nav>
                <div className='flex flex-col items-center justify-center pt-4 md:pt-14 gap-2'>
                    {children}
                </div>

            </div>
        </main>
    )
}

export default Authlayout
