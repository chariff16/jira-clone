import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ExternalLinkIcon, PencilIcon, TrashIcon } from 'lucide-react';
import { useDeleteTasks } from '../api/use-delete-tasks';
import { useConfirm } from '@/hooks/use-confirm';
import { useRouter } from 'next/navigation';
import { useWorkspaceId } from '@/features/workspaces/hooks/workspace-id';
import { useEditTaskModal } from '../hooks/use-edit-task-modal';

interface TaskActionProps {
    id: string;
    projectId: string;
    children: React.ReactNode;
};


const TaskAction = ({ id, projectId, children }: TaskActionProps) => {
    const router = useRouter();
    const workspaceId = useWorkspaceId();
    const { mutate, isPending } = useDeleteTasks();
    const [ConfirmDialog, confirm] = useConfirm(
        "Delete Task",
        "this action can not be undone",
        'destructive'
    );

    const { open } = useEditTaskModal();

    const onDelete = async () => {
        const ok = await confirm();
        if (!ok) return;

        mutate({ param: { taskId: id } })
    };

    const onOpenTask = () => {
        router.push(`/workspaces/${workspaceId}/tasks/${id}`)
    };

    const onOpenProject = () => {
        router.push(`/workspaces/${workspaceId}/projects/${projectId}`)
    }

    return (
        <div className='flex justify-end'>
            <ConfirmDialog />
            <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                    {children}
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-48'>
                    <DropdownMenuItem
                        onClick={onOpenTask}
                        className='font-medium p-[10px]'
                    >
                        <ExternalLinkIcon className='size-4 mr-2 stroke-2' />
                        Task Details
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={onOpenProject}
                        className='font-medium p-[10px]'
                    >
                        <ExternalLinkIcon className='size-4 mr-2 stroke-2' />
                        Open Project
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={() => open(id)}
                        className='font-medium p-[10px]'
                    >
                        <PencilIcon className='size-4 mr-2 stroke-2' />
                        Edit Task
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={onDelete}
                        className='font-medium text-amber-700 focus:text-amber-700 p-[10px]'
                        disabled={isPending}
                    >
                        <TrashIcon className='size-4 mr-2 stroke-2' />
                        Delete Task
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}

export default TaskAction
