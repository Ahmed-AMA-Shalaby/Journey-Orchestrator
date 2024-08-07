import { ArrowBack } from '@mui/icons-material';
import { IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import MissionDetailsManagement from '@/components/MissionDetailsManagement';
import useSx from '@/pages/MissionManagmentPage/styles';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { missionActions } from '@/store/mission/MissionSlice';

const MissionManagementPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const selectedMission = useAppSelector((state) => state.mission.selectedMission);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const navigate = useNavigate();
  const styles = useSx();

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
      <Typography variant={isLargeScreen ? 'h3' : 'h5'} sx={styles.backButtonWrapper}>
        <IconButton color='primary' onClick={navigateToMisssions}>
          <ArrowBack sx={styles.backButtonIcon} />
        </IconButton>
        {selectedMission ? 'Configure Mission' : 'Initiate Mission'}
      </Typography>

      <MissionDetailsManagement />
    </>
  );
};

export default MissionManagementPage;
