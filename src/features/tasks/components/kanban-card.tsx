import { MoreHorizontalIcon } from "lucide-react"
import { Task } from "../types"
import TaskAction from "./task-actions"
import { DottedSeprator } from "@/components/dotted-seprator"
import MemberAvatar from "@/features/members/components/member-avatar"
import TaskDate from "./task-date"
import ProjectAvatar from "@/features/projects/components/project-avatar"

interface KanbanCardProp {
    task: Task
};

const KanbanCard = ({ task }: KanbanCardProp) => {
    return (
        <div className="bg-white p-2.5 mb-1.5 rounded shadow-sm space-y-3 ">
            <div className="flex items-start justify-between gap-x-2">
                <p className="text-sm line-clamp-2">{task.name}</p>
                <TaskAction id={task.$id} projectId={task.projectId}>
                    <MoreHorizontalIcon className="size-[18px] stroke-1 shrink-0 text-neutral-700 hover:opacity-75 transition" />
                </TaskAction>
            </div>
            <DottedSeprator />
            <div className="flex items-center gap-x-1.5">
                <MemberAvatar name={task.assignee.name} fullBackClassName="text-[10px]" />
                <div className="size-1 rounded-full bg-neutral-300" />
                <TaskDate value={task.dueDate} className="text-xs" />
            </div>
            <div className="flex items-center gap-x-1.5">
                <ProjectAvatar
                    name={task.project.name}
                    image={task.project.imageUrl}
                    fallBackClassName="text-[10px]"
                />
                <span className="text-xs font-medium">{task.project.name}</span>
            </div>
        </div>
    )
}

export default KanbanCard
