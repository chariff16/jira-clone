import { Task, TaskStatus } from "../types";
import { Draggable, Droppable, DragDropContext, DropResult } from '@hello-pangea/dnd';
import React, { useState, useCallback, useEffect } from 'react'
import KanbanColumnHeader from "./kanban-column-header";


interface DataKanbanProp {
    data: Task[];
};

const boards: TaskStatus[] = [
    TaskStatus.BACKLOG,
    TaskStatus.TODO,
    TaskStatus.IN_PROGRESS,
    TaskStatus.IN_REVIEW,
    TaskStatus.DONE,
];

type TasksStatus = {
    [key in TaskStatus]: Task[];
};


const DataKanban = ({ data }: DataKanbanProp) => {
    const [tasks, setTasks] = useState<TasksStatus>(() => {
        const initialTasks: TasksStatus = {
            [TaskStatus.BACKLOG]: [],
            [TaskStatus.TODO]: [],
            [TaskStatus.IN_PROGRESS]: [],
            [TaskStatus.IN_REVIEW]: [],
            [TaskStatus.DONE]: [],
        };

        data.forEach((task) => {
            initialTasks[task.status].push(task);
        });

        Object.keys(initialTasks).forEach((status) => {
            initialTasks[status as TaskStatus].sort(
                (a, b) => a.position - b.position
            );
        });

        return initialTasks;
    });

    return (
        <DragDropContext onDragEnd={() => { }}>
            <div className="flex overflow-x-auto ">
                {boards.map((board) => {
                    return (
                        <div key={board} className="flex-1 mx-2 bg-muted p-1.5 rounded-md min-w-[200px]">
                            <KanbanColumnHeader board={board} taskCount={tasks[board].length} />
                        </div>
                    )
                })}
            </div>
        </DragDropContext>
    )
}

export default DataKanban;
