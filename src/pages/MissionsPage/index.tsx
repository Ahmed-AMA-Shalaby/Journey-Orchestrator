import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import MissionsTable from '@/components/MissionsTable';
import useSx from '@/pages/MissionsPage/styles';
import { useAppSelector } from '@/store/hooks';

const MissionsPage: React.FC = () => {
  const missions = useAppSelector((state) => state.mission.missions);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const navigate = useNavigate();
  const styles = useSx();

  const navigateToMissionCreation = (): void => {
    navigate('/missions/new');
  };

  return (
    <>
      <Box sx={styles.wrapper}>
        <Typography variant={isLargeScreen ? 'h3' : 'h5'} sx={styles.title}>
          Missions Dashboard
        </Typography>

        {missions.length !== 0 && (
          <Button variant='contained' onClick={navigateToMissionCreation} sx={styles.startMissionbutton}>
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
