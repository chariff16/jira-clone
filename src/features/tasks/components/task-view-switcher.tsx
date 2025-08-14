'use client';
import { DottedSeprator } from "@/components/dotted-seprator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader, PlusIcon } from "lucide-react";
import { useCreateTaskModal } from "../hooks/use-create-task-modal";
import { useGetTasks } from "../api/use-get-tasks";
import { useWorkspaceId } from "@/features/workspaces/hooks/workspace-id";
import { useQueryState } from "nuqs";
import DataFilters from "./data-filters";
import { useTaskFilters } from "../hooks/use-task-filters";
import { DataTable } from "./data-table";
import { columns } from './columns';
import DataKanban from "./data-kanban";
import { useCallback } from "react";
import { TaskStatus } from "../types";
import { useBulkUpdateTask } from "../api/use-bulk-update-task";

const TaskViewSwitcher = () => {
    const [view, setView] = useQueryState("task-view", {
        defaultValue: "table"
    });
    const [{ status, assigneeId, projectId, dueDate }] = useTaskFilters();
    const workspaceId = useWorkspaceId();
    const { data: tasks, isLoading: isLoadingTasks } = useGetTasks({ workspaceId, assigneeId, projectId, status, dueDate });
    const { open } = useCreateTaskModal();
    const { mutate: bulkUpdate } = useBulkUpdateTask()

    const onKanbanChange = useCallback((tasks: { $id: string; status: TaskStatus; position: number }[]) => {
        console.log(tasks);
        bulkUpdate({ json: { tasks } })

    }, [bulkUpdate]);
    return (
        <Tabs defaultValue={view} onValueChange={setView} className="flex-1 w-full border rounded-lg">
            <div className="h-full flex flex-col overflow-auto p-4">
                <div className="flex flex-col lg:flex-row gap-y-2 justify-between items-center">
                    <TabsList className="w-full lg:w-auto">
                        <TabsTrigger className="h-8 w-full lg:w-auto" value="table">
                            table
                        </TabsTrigger>
                        <TabsTrigger className="h-8 w-full lg:w-auto" value="kanban">
                            kanban
                        </TabsTrigger>
                        <TabsTrigger className="h-8 w-full lg:w-auto" value="calendar">
                            calendar
                        </TabsTrigger>
                    </TabsList>
                    <Button onClick={open} size={'sm'} className="w-full lg:w-auto">
                        <PlusIcon className=" size-4 mr-2" />
                        New Task
                    </Button>
                </div>
                <DottedSeprator className="my-4" />
                <DataFilters />
                <DottedSeprator className="my-4" />
                {isLoadingTasks ?
                    (
                        <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
                            <Loader className="size-5 animate-spin" />
                        </div>
                    )
                    : (
                        <>
                            <TabsContent value="table" className="mt-0">
                                <DataTable columns={columns} data={tasks?.documents ?? []} />
                            </TabsContent>
                            <TabsContent value="kanban" className="mt-0">
                                <DataKanban onChange={onKanbanChange} data={tasks?.documents ?? []} />
                            </TabsContent>
                            <TabsContent value="calendar" className="mt-0">
                                {JSON.stringify(tasks)}
                            </TabsContent>
                        </>

                    )
                }
            </div>

        </Tabs>
    )
}

export default TaskViewSwitcher
