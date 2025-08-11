import { Card, CardContent } from '@/components/ui/card';
import { useGetMembers } from '@/features/members/api/use-get-members';
import { useGetProjects } from '@/features/projects/api/use-get-projects';
import { useWorkspaceId } from '@/features/workspaces/hooks/workspace-id';
import { Loader } from 'lucide-react';
import React from 'react'
import CreateTaskForm from './create-task-form';

interface CreateTaskFormWrapperProp {
    onCancel: () => void;
}

const CreateTaskFormWrapper = ({ onCancel }: CreateTaskFormWrapperProp) => {
    const workspaceId = useWorkspaceId();

    const { data: projects, isLoading: isLoadingProjects } = useGetProjects({
        workspaceId
    });
    const { data: members, isLoading: isLoadingMembers } = useGetMembers({
        workspaceId
    });

    const projectOptions = projects?.documents.map((project) => ({
        id: project.$id,
        name: project.name,
        imageUrl: project.imageUrl,
    }));

    const memberOptions = members?.documents.map((member) => ({
        id: member.$id,
        name: member.name,
    }));

    const isLoading = isLoadingProjects || isLoadingMembers




    if (isLoading) {
        return (
            <Card className='w-full h-[741px] border-none shadow-none'>
                <CardContent className='flex items-center justify-center h-full'>
                    <Loader className='size-5 animate-spin' />
                </CardContent>
            </Card>
        )
    }

    return (
        <div>
            <CreateTaskForm memberOptions={memberOptions ?? []} projectOptions={projectOptions ?? []} onCancel={onCancel} />
        </div>
    )
}

export default CreateTaskFormWrapper
