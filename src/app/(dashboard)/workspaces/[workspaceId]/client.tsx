'use client';

import Analytics from "@/components/analytics";
import Link from "next/link";
import PageError from "@/components/page-error";
import PageLoader from "@/components/page-loader";
import { DottedSeprator } from "@/components/dotted-seprator";
import { Button } from "@/components/ui/button";
import { useGetMembers } from "@/features/members/api/use-get-members";
import { useGetProjects } from "@/features/projects/api/use-get-projects";
import { useGetTasks } from "@/features/tasks/api/use-get-tasks";
import { useCreateTaskModal } from "@/features/tasks/hooks/use-create-task-modal";
import { Task } from "@/features/tasks/types";
import { useGetWorkspaceAnalytics } from "@/features/workspaces/api/use-get-workspace-analytics";
import { useWorkspaceId } from "@/features/workspaces/hooks/workspace-id";
import { formatDistanceToNow } from "date-fns";
import { CalendarIcon, PlusIcon, SettingsIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useCreateProjectsModal } from "@/features/projects/hooks/use-create-project-modal";
import ProjectAvatar from "@/features/projects/components/project-avatar";
import { Project } from "@/features/projects/types";
import { Member } from "@/features/members/types";
import MemberAvatar from "@/features/members/components/member-avatar";


const WorkspaceIdClient = () => {
    const workspaceId = useWorkspaceId();
    const { data: analytics, isLoading: isLoadingAnalytics } = useGetWorkspaceAnalytics({ workspaceId });
    const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({ workspaceId });
    const { data: projects, isLoading: isLoadingProjects } = useGetProjects({ workspaceId });
    const { data: members, isLoading: isLoadingMembers } = useGetMembers({ workspaceId });

    const isLoading = isLoadingAnalytics || isLoadingTasks || isLoadingProjects || isLoadingMembers;

    if (isLoading) return <PageLoader />
    if (!analytics || !tasks || !projects || !members) return <PageError message="Failed to load workspace data" />
    return (
        <div className="h-full flex flex-col space-y-4">
            <Analytics data={analytics} />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <TaskList data={tasks.documents} total={tasks.total} />
                <ProjectList data={projects.documents} total={projects.total} />
                <MemberList data={members.documents} total={members.total} />
            </div>
        </div>
    )
};

interface TaskListProps {
    data: Task[];
    total: number;
};

export const TaskList = ({ data, total }: TaskListProps) => {
    const workspaceId = useWorkspaceId();
    const { open: createTask } = useCreateTaskModal();
    return (
        <div className="flex flex-col gap-y-4 col-span-1">
            <div className="bg-muted rounded-lg p-4">
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">Tasks ({total})</p>
                    <Button variant="muted" size="icon" onClick={createTask}>
                        <PlusIcon className="size-4 text-neutral-400" />
                    </Button>
                </div>
                <DottedSeprator className="my-4" />
                <ul className="flex flex-col gap-y-4">
                    {
                        data.map((task) => (
                            <li key={task.$id}>
                                <Link href={`/workspaces/${workspaceId}/tasks/${task.$id}`}>
                                    <Card className="shadow-none rounded-lg hover:opacity-75 transition">
                                        <CardContent className="p-4">
                                            <p className="text-lg font-medium truncate">{task.name}</p>
                                            <div className="flex items-center gap-x-2">
                                                <p>{task.project?.name}</p>
                                                <div className="size-1 rounded-full bg-neutral-300" />
                                                <div className="flex items-center text-sm text-muted-foreground">
                                                    <CalendarIcon className="size-3 mr-1" />
                                                    <span className="truncate">
                                                        {formatDistanceToNow(new Date(task.dueDate))}
                                                    </span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            </li>
                        ))
                    }
                    <li className="text-muted-foreground text-sm text-center hidden first-of-type:block">
                        No task found
                    </li>
                </ul>
            </div>
        </div>
    )
};

interface ProjectListProps {
    data: Project[];
    total: number;
};

export const ProjectList = ({ data, total }: ProjectListProps) => {
    const workspaceId = useWorkspaceId();
    const { open: createProject } = useCreateProjectsModal();
    return (
        <div className="flex flex-col gap-y-4 col-span-1">
            <div className="bg-white border rounded-lg p-4">
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">Projects ({total})</p>
                    <Button variant="secondary" size="icon" onClick={createProject}>
                        <PlusIcon className="size-4 text-neutral-400" />
                    </Button>
                </div>
                <DottedSeprator className="my-4" />
                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {data.map((project) => (
                        <li key={project.$id}>
                            <Link href={`/workspaces/${workspaceId}/projects/${project.$id}`}>
                                <Card className="shadow-none rounded-lg hover:opacity-75 transition">
                                    <CardContent className="flex items-center gap-x-2.5 p-4">
                                        <ProjectAvatar
                                            name={project.name}
                                            image={project.imageUrl}
                                            className="size-12"
                                            fallBackClassName="text-lg"
                                        />
                                        <p className="text-lg font-medium truncate">
                                            {project.name}
                                        </p>
                                    </CardContent>
                                </Card>
                            </Link>
                        </li>
                    ))}
                    <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
                        No projects found
                    </li>
                </ul>
            </div>
        </div>
    )
};

interface MemberListProps {
    data: Member[];
    total: number;
};

export const MemberList = ({ data, total }: MemberListProps) => {
    const workspaceId = useWorkspaceId();

    return (
        <div className="flex flex-col gap-y-4 col-span-1">
            <div className="bg-white border rounded-lg p-4">
                <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold">Members ({total})</p>
                    <Button variant="secondary" size="icon" asChild>
                        <Link href={`/workspaces/${workspaceId}/members`}>
                            <SettingsIcon className="size-4 text-neutral-400" />
                        </Link>
                    </Button>
                </div>
                <DottedSeprator className="my-4" />
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.map((member) => (
                        <li key={member.$id}>
                            <Card className="shadow-none rounded-lg overflow-hidden">
                                <CardContent className="p-3 flex flex-col items-center gap-x-2">
                                    <MemberAvatar name={member.name} className="size-12" />
                                    <div className="flex flex-col items-center overflow-hidden">
                                        <p className="text-lg font-medium line-clamp-1">
                                            {member.name}
                                        </p>
                                        <p className="text-sm text-muted-foreground line-clamp-1">
                                            {member.email}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </li>
                    ))}
                    <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
                        No members found
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default WorkspaceIdClient
