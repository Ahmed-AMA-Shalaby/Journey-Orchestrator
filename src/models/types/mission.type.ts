import { CrewMember } from '@/models/types/crewMember.type';

export type Mission = {
  id: number;
  name: string;
  destination: string;
  departureDate: string;
  crewMembers: CrewMember[];
};
