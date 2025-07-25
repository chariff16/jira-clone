"use client";
import { useEffect, useState } from "react";
import { MenuIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetDescription } from "./ui/sheet";
import { usePathname } from "next/navigation";
import Sidebar from "./sidebar";


const MobileSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <Sheet modal={false} open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="secondary" className="lg:hidden">
                    <MenuIcon className="size-4 text-neutral-500" />
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0">
                <SheetTitle className="hidden"> {/* removing error worning */}
                    Mobile Sidebar
                </SheetTitle>
                <SheetDescription className="hidden"> {/* removing error worning */}
                    Mobile Sidebar
                </SheetDescription>
                <Sidebar />
            </SheetContent>
        </Sheet>
    )
}

export default MobileSidebar
