import { Theme } from '@emotion/react';
import { SxProps } from '@mui/material';

const useSx: () => Record<string, SxProps<Theme>> = () => ({
  wrapper: { display: 'flex', flexDirection: 'column', gap: 5, mb: 8 },
  searchCard: { px: 2, py: 1 },
  tableOverflow: { overflow: 'auto' },
  tableWrapper: { width: '100%', display: 'table', tableLayout: 'fixed' },
  tableHead: { backgroundColor: 'white' },
  noWrap: { textWrap: 'nowrap' },
  membersWrapper: { display: 'flex', alignItems: 'center', gap: 1 },
  tooltip: { display: 'flex', flexDirection: 'column', gap: 1 },
  departureWrapper: { display: 'flex', flexDirection: 'column', alignItems: 'flex-end' },
  departureStatus: { fontSize: '0.75rem', fontStyle: 'italic' },
  actionsWrapper: { display: 'flex', justifyContent: 'center', gap: 4 },
  noMissionsCard: { display: 'flex', justifyContent: 'center', alignItems: 'center', p: { xs: 4, sm: 10 } },
  noMissionsCardContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    gap: 3,
  },
  startMissionbutton: { mb: { xs: 3, sm: 0, gap: 10 } },
});

export default useSx;
