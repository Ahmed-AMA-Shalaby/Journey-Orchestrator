import { ArrowBack } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import MissionDetailsManagement from '@/components/MissionDetailsManagement';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { missionActions } from '@/store/mission/MissionSlice';

const MissionManagmentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const selectedMission = useAppSelector((state) => state.mission.selectedMission);
  const navigate = useNavigate();

  const navigateToMisssions = (): void => {
    navigate('/missions');
  };

  useEffect(() => {
    dispatch(missionActions.getSelectedMission(id));

    return () => {
      dispatch(missionActions.resetSelectedMission());
    };
  }, [dispatch, id]);

  return (
    <Box>
      <Button onClick={navigateToMisssions} sx={{ mt: 3 }}>
        <ArrowBack sx={{ mr: 1 }} />
        Back
      </Button>

      <Typography variant='h4' sx={{ mt: 2, mb: 5 }}>
        {selectedMission ? 'Configure Mission' : 'Initiate Mission'}
      </Typography>

      <MissionDetailsManagement />
    </Box>
  );
};

export default MissionManagmentPage;