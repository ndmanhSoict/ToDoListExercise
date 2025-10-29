import { z } from 'zod';

export const registerSchema = z
  .object({
    email: z.string().nonempty('Email is required').email('Email invalid'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Must contain at least 1 uppercase letter')
      .regex(/[a-z]/, 'Must contain at least 1 lowercase letter')
      .regex(/[0-9]/, 'Must contain at least 1 number')
      .regex(/[^A-Za-z0-9]/, 'Must contain at least 1 special character'),
    confirmPassword: z.string().min(1, 'Confirm password is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Confirm password does not match',
  });

export type RegisterSchema = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().nonempty('Email is required').email('Email invalid'),
  password: z.string().nonempty('Password is required'),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export type AuthSchema = LoginSchema | RegisterSchema;
