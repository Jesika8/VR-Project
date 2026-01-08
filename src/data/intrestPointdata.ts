import { type InterestPointData } from "../types/index";

export const INTEREST_POINTS: InterestPointData[] = [
  {
    id: 'Ground',
    position: [-1.5, 0.2, 0],
    name: 'Main Ground',
    description: 'Main ground area of the Sunway College',
    has360: true,
    image360: '/360s/ground.jpg'
  },
  {
    id: 'Seminar Hall',
    position: [-3.3, 0.2, 2.7],
    name: 'Seminar Hall',
    description: 'A spacious hall used for seminars and large gatherings.',
    has360: true,
    image360: '/360s/seminarhall.jpg'
  },
  {
    id: 'frontdesk',
    position: [1.9, 0.2, -1],
    name: 'Front Desk',
    description: 'The main front desk area for visitor inquiries and assistance.',
    has360: true,
    image360: '/360s/frontdesk.jpg'
  }
];