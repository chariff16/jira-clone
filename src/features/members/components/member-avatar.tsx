import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface MemberAvatarProps {
    name: string,
    className?: string,
    fullBackClassName?: string
}

const MemberAvatar = (
    {
        name,
        className,
        fullBackClassName,
    }: MemberAvatarProps
) => {

    return (
        <Avatar className={cn("size-5 rounded-full transition border border-neutral-300 ", className)}>
            <AvatarFallback className={cn('bg-neutral-200 font-medium text-neutral-500 flex justify-center items-center', fullBackClassName)}>
                {name.charAt(0).toUpperCase()}
            </AvatarFallback>
        </Avatar>
    )
}

export default MemberAvatar
