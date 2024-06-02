import { ArrowBack } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
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
    <>
      <Typography variant='h4' sx={{ display: 'flex', my: 5, color: 'white' }}>
        <IconButton color='primary' onClick={navigateToMisssions}>
          <ArrowBack sx={{ mr: 1 }} />
        </IconButton>
        {selectedMission ? 'Configure Mission' : 'Initiate Mission'}
      </Typography>

      <MissionDetailsManagement />
    </>
  );
};

export default MissionManagmentPage;
