import { z } from 'zod';

export const todoSchema = z
  .object({
    name: z.string().min(1, 'Title is required'),
    description: z.string(),
    assignee: z.string().min(1, 'Assignee is required'),
    priority: z
      .string()
      .refine((val) => ['LOW', 'MEDIUM', 'HIGH', 'HIGHEST', 'URGENT'].includes(val), {
        message: 'Please select priority',
      }),
    status: z
      .string()
      .refine(
        (val) =>
          [
            'TODO',
            'IN_PROGRESS',
            'IN_REVIEW',
            'IN_DEPLOYMENT',
            'IN_TESTING',
            'DONE',
            'CREATED',
          ].includes(val),
        {
          message: 'Please select status',
        },
      ),
    startDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid start date',
    }),
    startTime: z.string().min(1, 'Start time is required'),
    endDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid end date',
    }),
    endTime: z.string().min(1, 'End time is required'),
  })
  .refine(
    (data) =>
      new Date(`${data.endDate}T${data.endTime}:00`) >=
      new Date(`${data.startDate}T${data.startTime}:00`),
    {
      message: 'End date must be after start date',
      path: ['endDate'],
    },
  );

export type TodoSchema = z.infer<typeof todoSchema>;
