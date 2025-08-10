'use client';
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";


const Error = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-y-2">
            <AlertTriangle />
            <p className="text-sm text-muted-foreground">
                Something went wrong. Please try again later.
            </p>
            <Button variant={"secondary"}>
                <Link href={'/'}>
                    Back to home
                </Link>
            </Button>
        </div>
    )
}

export default Error
