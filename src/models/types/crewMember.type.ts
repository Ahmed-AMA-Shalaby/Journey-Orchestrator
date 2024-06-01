import { CrewMemberType } from '@/models/types/crewMemberType.type';

export type CrewMember = {
  type: CrewMemberType;
  experience?: number;
  job?: string;
  age?: number;
  wealth?: number;
};
