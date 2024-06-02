import { z } from 'zod';

import engineerJobs from '@/assets/EngineerJobs.json';

export const crewSchema = z.object({
  pilotExperience: z.coerce
    .string()
    .refine((data) => +data >= 0, {
      message: 'Experience must be a positive number',
    })
    .refine((data) => +data >= 10, {
      message: 'Pilot must have at least 10 years of experience',
    }),
  engineers: z
    .array(
      z.object({
        experience: z.string().refine((data) => +data >= 0, {
          message: 'Experience must be a positive number',
        }),
        job: z.enum(engineerJobs as [string, ...string[]], {
          errorMap: () => ({ message: 'Invalid job' }),
        }),
      }),
    )
    .superRefine((engineers, ctx) => {
      const jobSet = new Set();

      engineers.forEach((engineer, index) => {
        if (jobSet.has(engineer.job)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: `Two engineers cannot have the same job: ${engineer.job}`,
            path: [index, 'job'],
          });
        }
        jobSet.add(engineer.job);
      });
    }),
  passengers: z
    .array(
      z.object({
        age: z.string().refine((data) => +data >= 0, {
          message: 'Age must be a positive number',
        }),
        wealth: z.string().refine((data) => +data >= 0, {
          message: 'Wealth must be a positive number',
        }),
      }),
    )
    .min(1, { message: 'At least one passenger is required' }),
});
