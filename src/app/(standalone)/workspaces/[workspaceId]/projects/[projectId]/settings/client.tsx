'use client';
import PageError from '@/components/page-error';
import PageLoader from '@/components/page-loader';
import EditeProjectForm from '@/features/projects/components/edit-project-form';
import { useGetProject } from '@/features/projects/api/use-get-project';
import { useProjectId } from '@/features/projects/hooks/use-project-id';



const ProjectIdSettingClient = () => {
    const projectId = useProjectId();
    const { data, isLoading } = useGetProject({ projectId });

    if (isLoading) return <PageLoader />

    if (!data) return <PageError message="Project not found" />

    return (
        <div className="w-full xl:max-w-xl">
            <EditeProjectForm initialValues={data} />
        </div>
    )
}

export default ProjectIdSettingClient
