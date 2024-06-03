import { Mission } from '@/models/types/mission.type';

const mockedUseNavigate = vi.fn();

const mockMissions: Mission[] = [
  {
    id: 1,
    name: 'Mission to Mars-110',
    destination: 'Mars Alpha-110',
    departureDate: '2024-05-30T22:00:00Z',
    crewMembers: [
      {
        type: 'Pilot',
        experience: 20,
      },
      { type: 'Engineer', experience: 5, job: 'Navigation' },
      { type: 'Engineer', experience: 7, job: 'Mechanics' },
      { type: 'Passenger', age: 30, wealth: 200000 },
    ],
  },
  {
    id: 2,
    name: 'Mission to Mars-220',
    destination: 'Mars Alpha-220',
    departureDate: '2030-01-10T22:00:00Z',
    crewMembers: [
      {
        type: 'Pilot',
        experience: 20,
      },
      { type: 'Engineer', experience: 5, job: 'Navigation' },
      { type: 'Engineer', experience: 7, job: 'Mechanics' },
      { type: 'Passenger', age: 30, wealth: 200000 },
    ],
  },
];

export { mockedUseNavigate, mockMissions };
