import { CrewMember } from '@/models/types/crewMember.type';

export type Mission = {
  id: number;
  name: string;
  departureDate: string;
  crewMembers: CrewMember[];
};
