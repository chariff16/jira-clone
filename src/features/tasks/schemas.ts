import { z } from 'zod';
import { TaskStatus } from './types';

export const createTaskSchema = z.object({
    name: z.string().trim().min(1, { error: "Required" }),
    status: z.nativeEnum(TaskStatus, { error: "Required" }),
    workspaceId: z.string().trim().min(1, { error: "Required" }),
    projectId: z.string().trim().min(1, { error: "Required" }),
    dueDate: z.date(),
    assigneeId: z.string().trim().min(1, { error: "Required" }),
    description: z.string().optional(),
});