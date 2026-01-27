import { z } from 'zod';

export const resetPasswordSchema = z
    .object({
        email: z.string().email('Please enter a vaild email address'),
        password: z.string().min(8, 'Password must be at least 8 characters'),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'],
    });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
