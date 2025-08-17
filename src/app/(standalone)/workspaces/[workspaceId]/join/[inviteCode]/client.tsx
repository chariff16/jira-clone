import PageError from '@/components/page-error';
import PageLoader from '@/components/page-loader';
import { useGetWorkspaceInfo } from '@/features/workspaces/api/use-get-workspace-info';
import JoinWorkspaceForm from '@/features/workspaces/components/join-workspace-form';
import { useWorkspaceId } from '@/features/workspaces/hooks/workspace-id';


const WorkspaceIdJoinClient = () => {
    const workspaceId = useWorkspaceId();
    const { data, isLoading } = useGetWorkspaceInfo({ workspaceId });

    if (isLoading) return <PageLoader />

    if (!data) return <PageError message="Project not found" />
    return (
        <div className="w-full lg:max-w-xl">
            <JoinWorkspaceForm initialValues={data} />
        </div>
    )
}

export default WorkspaceIdJoinClient
