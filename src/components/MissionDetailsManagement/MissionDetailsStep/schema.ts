import dayjs, { Dayjs } from 'dayjs';
import { z } from 'zod';

export const missionSchema = z.object({
  missionName: z
    .string()
    .min(1, { message: 'Mission name is required' })
    .max(20, { message: 'Name cannot exceed 20 characters' }),
  departureDate: z
    .custom<Dayjs | null>()
    .refine((date) => date instanceof dayjs && !isNaN(date.millisecond()), {
      message: 'Departure date is required',
    })
    .refine((date) => date instanceof dayjs && date.isAfter(dayjs().subtract(1, 'day')), {
      message: 'Departure date cannot be earlier than today',
    }),
});
