import { getCurrent } from "@/features/auth/queries";
import { redirect } from "next/navigation";
import WorkspaceIdJoinClient from "./client";




const WorkspaceIdJoinPage = async () => {
    const user = getCurrent();
    if (!user) redirect('/sign-in');

    return (
        <WorkspaceIdJoinClient />
    )
}

export default WorkspaceIdJoinPage 
