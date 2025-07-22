import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string()
});

export const registerSchema = z.object({
    name: z.string().trim().min(2, "Require 2 charaters"),
    email: z.string().email(),
    password: z.string().min(8, "Minimum of 8 charecter"),
});