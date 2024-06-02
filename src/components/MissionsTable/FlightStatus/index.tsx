import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

import { hasDeparted } from '@/utils';

interface FlightStatusProps {
  departureDate: string;
}

const FlightStatus: React.FC<FlightStatusProps> = ({ departureDate: depDate }) => {
  const [status, setStatus] = useState<string>('');

  useEffect(() => {
    const updateStatus = (): void => {
      const departureDate = dayjs(depDate).startOf('day');
      const currentDate = dayjs().startOf('day');

      if (hasDeparted(depDate)) {
        setStatus('Departed');
      } else if (currentDate.isSame(departureDate, 'day')) {
        setStatus('Today');
      } else {
        const years = departureDate.diff(currentDate, 'year');
        const adjustedCurrentDate = currentDate.add(years, 'year');

        const months = departureDate.diff(adjustedCurrentDate, 'month');
        const adjustedCurrentDateWithMonths = adjustedCurrentDate.add(months, 'month');

        const days = departureDate.diff(adjustedCurrentDateWithMonths, 'day');

        if (years > 0) {
          setStatus(`in ${years} year${years > 1 ? 's' : ''}`);
        } else if (months > 0) {
          setStatus(`in ${months} month${months > 1 ? 's' : ''}`);
        } else {
          setStatus(`in ${days} day${days > 1 ? 's' : ''}`);
        }
      }
    };

    updateStatus();

    const intervalId = setInterval(updateStatus, 60000);

    return () => clearInterval(intervalId);
  }, [depDate]);

  return status;
};

export default FlightStatus;
