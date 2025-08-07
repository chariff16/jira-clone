import { getCurrent } from "@/features/auth/queries";
import MembersList from "@/features/workspaces/components/members-list";
import { redirect } from "next/navigation";

const WorkspaceIdMemberspage = async () => {
    const user = getCurrent();

    if (!user) redirect('/sign-in')


    return (
        <div className="w-full lg:max-w-xl">
            <MembersList />
        </div>
    )
}

export default WorkspaceIdMemberspage
