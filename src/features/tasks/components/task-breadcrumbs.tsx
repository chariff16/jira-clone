import Link from 'next/link';
import ProjectAvatar from '@/features/projects/components/project-avatar';
import { Task } from '../types';
import { useWorkspaceId } from '@/features/workspaces/hooks/workspace-id';
import { ChevronRightIcon, TrashIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useDeleteTasks } from '../api/use-delete-tasks';
import { useConfirm } from '@/hooks/use-confirm';
import { useRouter } from 'next/navigation';
import { Project } from '@/features/projects/types';

interface TaskBreadcrumbsProp {
    project: Project,
    task: Task
}

const TaskBreadcrumbs = ({ project, task }: TaskBreadcrumbsProp) => {
    const workspaceId = useWorkspaceId();
    const router = useRouter();

    const { mutate, isPending } = useDeleteTasks();
    const [ConfirmDailog, confirm] = useConfirm(
        'Delete Task',
        'This action can not be undone.',
        'destructive'
    );

    const handleDelete = async () => {
        const ok = await confirm();
        if (!ok) return;

        mutate({ param: { taskId: task.$id } }, {
            onSuccess: () => {
                router.push(`/workspaces/${workspaceId}/tasks`)
            }
        })
    }

    return (
        <div className='flex items-center gap-x-2'>
            <ConfirmDailog />
            <ProjectAvatar name={project.name} image={project.imageUrl} className='size-6 lg:size-8' />
            <Link href={`/workspaces/${workspaceId}/projects/${project.$id}`}>
                <p className='text-sm lg:text-lg font-semibold text-muted-foreground hover:opacity-75 transition'>
                    {project.name}
                </p>
            </Link>
            <ChevronRightIcon className='size-4 lg:size-5 text-muted-foreground' />
            <p className='text-sm lg:text-lg font-semibold '>
                {task.name}
            </p>
            <Button onClick={handleDelete} disabled={isPending} variant={'destructive'} size={'sm'} className='ml-auto'>
                <TrashIcon className='size-4 lg:mr-2' />
                <span className='hidden lg:block'>Delete Task</span>
            </Button>
        </div>
    )
}

export default TaskBreadcrumbs
