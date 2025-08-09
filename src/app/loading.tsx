'use client';
import { Loader } from "lucide-react";


const LoadingPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-y-2">
            <Loader className="size-6 animate-spin text-muted-foreground" />

        </div>
    )
}

export default LoadingPage;
