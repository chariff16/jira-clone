import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface ProjectAvatarProps {
    image?: string,
    className?: string,
    name: string,
    fallBackClassName?: string
}

const ProjectAvatar = (
    {
        image,
        className,
        name,
        fallBackClassName
    }: ProjectAvatarProps
) => {
    if (image) {
        return (
            <div className={cn("size-5 relative rounded-md overflow-hidden", className)}>
                <Image src={image} alt={name} className="object-cover" />
            </div>
        )
    }
    return (
        <Avatar className={cn("size-5 rounded-md", className)}>
            <AvatarFallback className={cn("text-white bg-blue-600 font-semibold text-sm uppercase rounded-md", fallBackClassName)}>
                {name[0]}
            </AvatarFallback>
        </Avatar>
    )
}

export default ProjectAvatar
