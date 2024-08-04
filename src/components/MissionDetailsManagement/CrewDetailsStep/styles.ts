import { Theme } from '@emotion/react';
import { SxProps } from '@mui/material';

const useSx: () => Record<string, SxProps<Theme>> = () => ({
  sectionSeparator: { mt: 4 },
  fieldsSeparator: {
    display: 'flex',
    gap: 2,
    mt: 2,
    flexDirection: { xs: 'column', sm: 'row' },
    alignItems: { xs: 'stretch', sm: 'flex-start' },
  },
  membersError: { fontSize: '0.75rem', mt: '3px', ml: '14px' },
  removeMemberIcon: { mt: 1 },
  addOrRemoveMemberButton: { mt: 2 },
  stepperControls: { display: 'flex', justifyContent: 'center', gap: 4, mt: 2 },
});

export default useSx;
