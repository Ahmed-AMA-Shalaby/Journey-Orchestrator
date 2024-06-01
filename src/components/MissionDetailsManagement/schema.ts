import { z } from 'zod';

import { crewSchema } from '@/components/MissionDetailsManagement/CrewDetailsStep/schema';
import { missionSchema } from '@/components/MissionDetailsManagement/MissionDetailsStep/schema';

const finalSchema = missionSchema.merge(crewSchema);

type MissionForm = z.infer<typeof finalSchema>;

export { finalSchema, type MissionForm, missionSchema };
