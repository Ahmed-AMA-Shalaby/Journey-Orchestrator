import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import MissionsTable from '@/components/MissionsTable';

const MissionsListPage: React.FC = () => {
  const navigate = useNavigate();

  const navigateToMissionCreation = (): void => {
    navigate('/missions/new');
  };

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant='h4' sx={{ my: 5 }}>
          Missions Dashboard
        </Typography>

        <Button variant='contained' onClick={navigateToMissionCreation}>
          Start Mission
        </Button>
      </Box>

      <MissionsTable />
    </>
  );
};

export default MissionsListPage;
