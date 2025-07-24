"use client";
import { DottedSeprator } from '@/components/dotted-seprator';
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useLogout } from "../api/use-logout";
import { useCurrent } from "../api/use-current";
import { Loader, LogOut } from 'lucide-react';

const UserButton = () => {
    const { data: user, isLoading } = useCurrent();

    const { mutate: logout } = useLogout();

    if (isLoading) {
        return (
            <div className='size-10 rounded-full flex items-center justify-center bg-neutral-200 border border-neutral-300'>
                <Loader className='size-4 animate-spin text-muted-foreground' />
            </div>
        )
    }

    if (!user) {
        return null;
    }

    const { email, name } = user;
    const avatarFallback = name
        ? name.charAt(0).toUpperCase()
        : email.charAt(0).toUpperCase() ?? "U"

    return (
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className='outline-none relative'>
                <Avatar className='block rounded-full hover:opacity-75 transition border border-neutral-300'>
                    <AvatarFallback className='bg-neutral-200 font-medium text-neutral-500 size-10 flex justify-center items-center rounded-full'>
                        {avatarFallback}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' side='bottom' className='w-60' sideOffset={10}>
                <div className='flex flex-col items-center justify-center gap-2 px-2.5 py-4'>
                    <Avatar className='block border border-neutral-300 rounded-full'>
                        <AvatarFallback className='bg-neutral-200 font-medium text-xl text-neutral-500 size-[52px] flex justify-center items-center rounded-full'>
                            {avatarFallback}
                        </AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col justify-center items-center'>
                        <p className='text-sm font-medium text-neutral-900'>
                            {name || "user"}
                        </p>
                        <p className='text-xs text-neutral-500'>
                            {email}
                        </p>
                    </div>
                    <DottedSeprator className='mb-1' />
                    <DropdownMenuItem onClick={() => logout()} className='h-10 w-full flex justify-center items-center text-amber-700 font-medium cursor-pointer'>
                        <LogOut className='size-4 mr-2' />
                        Log out
                    </DropdownMenuItem>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserButton
