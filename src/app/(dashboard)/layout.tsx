import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"

interface DashboardLayoutProps {
    children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <div className="min-h-screen">
            <div className="flex w-full h-full">
                <div className="fixed top-0 left-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
                    <Sidebar />
                </div>
                <div className="lg:pl-[264px] w-full">
                    <div className="mx-auto max-w-screen-2xl h-full">
                        <Navbar />
                        <main className="h-full px-6 py-8 flex flex-col">
                            {children}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout
