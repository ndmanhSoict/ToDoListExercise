import { z } from 'zod';

export const registerSchema = z
  .object({
    email: z.string().email('Email không hợp lệ'),
    password: z
      .string()
      .min(8, 'Mật khẩu ít nhất 8 ký tự')
      .regex(/[A-Z]/, 'Phải có ít nhất 1 chữ cái in hoa')
      .regex(/[a-z]/, 'Phải có ít nhất 1 chữ cái thường')
      .regex(/[0-9]/, 'Phải có ít nhất 1 chữ số')
      .regex(/[^A-Za-z0-9]/, 'Phải có ít nhất 1 ký tự đặc biệt'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Mật khẩu xác nhận không khớp',
  });

export type RegisterSchema = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export type AuthSchema = LoginSchema | RegisterSchema;
