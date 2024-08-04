import { Theme } from '@emotion/react';
import { SxProps } from '@mui/material';
import { pickersCalendarHeaderClasses } from '@mui/x-date-pickers';

const useSx: () => Record<string, SxProps<Theme>> = () => ({
  missionDestinationError: { fontSize: '0.75rem', mt: '3px', ml: '14px' },
  calendarHeader: {
    [`.${pickersCalendarHeaderClasses.label}`]: {
      color: 'rgba(0, 0, 0, 0.87)',
    },
    [`.${pickersCalendarHeaderClasses.switchViewIcon}`]: {
      color: 'rgba(0, 0, 0, 0.87)',
    },
    [`.${pickersCalendarHeaderClasses.labelContainer}`]: {
      color: 'rgba(0, 0, 0, 0.87)',
    },
  },
  stepperControls: { display: 'flex', justifyContent: 'center', gap: 4, mt: 2 },
});

export default useSx;
