import { z } from "zod";

export const createWorkSpaceSchema = z.object({
    name: z.string().trim().min(1, "Required"),
    imageUrl: z.union([
        z.instanceof(File),
        z.string().transform((value) => value === '' ? undefined : value),
    ]).optional(),
});

export const updateWorkSpaceSchema = z.object({
    name: z.string().trim().min(1, "Must be 1 or more charaters").optional(),
    imageUrl: z.union([
        z.instanceof(File),
        z.string().transform((value) => value === '' ? undefined : value),
    ]).optional(),
});