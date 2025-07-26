import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface WorkspaceAvatarProps {
    image?: string,
    className?: string,
    name: string,
}

const WorkspaceAvatar = (
    {
        image,
        className,
        name
    }: WorkspaceAvatarProps
) => {
    if (image) {
        return (
            <div className={cn("size-10 relative rounded-md overflow-hidden", className)}>
                <Image src={image} alt={name} className="object-cover" />
            </div>
        )
    }
    return (
        <Avatar className={cn("size-10 rounded-md", className)}>
            <AvatarFallback className="text-white bg-blue-600 font-semibold text-lg uppercase rounded-md">
                {name[0]}
            </AvatarFallback>
        </Avatar>
    )
}

export default WorkspaceAvatar
