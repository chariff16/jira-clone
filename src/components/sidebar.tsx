import Image from "next/image"
import Link from "next/link"
import { DottedSeprator } from "./dotted-seprator"
import Navigation from "./navigation"

const Sidebar = () => {
    return (
        <aside className="h-full w-full bg-neutral-100 p-4">
            <Link href='/'>
                <Image src="/logo.svg" alt="logo" width={164} height={48} />
            </Link>
            <DottedSeprator className="my-4" />
            <Navigation />
        </aside>
    )
}

export default Sidebar
