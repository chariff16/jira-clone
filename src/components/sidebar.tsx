import { DottedSeprator } from "./dotted-seprator";
import Image from "next/image";
import Link from "next/link";
import Navigation from "./navigation";
import WorkspaceSwitcher from "./workspace-switcher";
import Projects from "./projects";

const Sidebar = () => {
    return (
        <aside className="h-full w-full bg-neutral-100 p-4">
            <Link href='/'>
                <Image src="/logo.svg" alt="logo" width={164} height={48} />
            </Link>
            <DottedSeprator className="my-4" />
            <WorkspaceSwitcher />
            <DottedSeprator className="my-4" />
            <Navigation />
            <Projects />
        </aside>
    )
}

export default Sidebar
