import { CrewMemberType } from '@/models/types/crewMemberType.type';
import { EngineerJob } from '@/models/types/engineerJob.type';

export type CrewMember = {
  type: CrewMemberType;
  experience?: number;
  job?: EngineerJob;
  age?: number;
  wealth?: number;
};
