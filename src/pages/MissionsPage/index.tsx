import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import MissionsTable from '@/components/MissionsTable';
import { useAppSelector } from '@/store/hooks';

const MissionsPage: React.FC = () => {
  const missions = useAppSelector((state) => state.mission.missions);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const navigate = useNavigate();

  const navigateToMissionCreation = (): void => {
    navigate('/missions/new');
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant={isLargeScreen ? 'h3' : 'h5'} sx={{ my: { xs: 2.5, sm: 5 }, color: 'white' }}>
          Missions Dashboard
        </Typography>

        {missions.length !== 0 && (
          <Button variant='contained' onClick={navigateToMissionCreation} sx={{ mb: { xs: 3, sm: 0, gap: 10 } }}>
            Start Mission
            <RocketLaunchIcon />
          </Button>
        )}
      </Box>

      <MissionsTable />
    </>
  );
};

export default MissionsPage;
