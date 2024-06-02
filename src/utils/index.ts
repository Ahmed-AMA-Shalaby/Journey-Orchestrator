import dayjs from 'dayjs';

const hasDeparted = (departureDate: string): boolean =>
  dayjs().startOf('day').isAfter(dayjs(departureDate).startOf('day'));

export { hasDeparted };
