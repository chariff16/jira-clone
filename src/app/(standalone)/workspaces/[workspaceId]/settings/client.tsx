'use client';

import PageError from "@/components/page-error";
import PageLoader from "@/components/page-loader";
import { useGetWorkspace } from "@/features/workspaces/api/use-get-workspace";
import EditeWorkspaceForm from "@/features/workspaces/components/edit-workspace-form";
import { useWorkspaceId } from "@/features/workspaces/hooks/workspace-id";

const WorkspaceSettingsClient = () => {
    const workspaceId = useWorkspaceId();
    const { data, isLoading } = useGetWorkspace({ workspaceId });

    if (isLoading) return <PageLoader />

    if (!data) return <PageError message="Project not found" />

    return (
        <div className="w-full lg:max-w-xl">
            <EditeWorkspaceForm initialValues={data} />
        </div>
    )
}

export default WorkspaceSettingsClient
