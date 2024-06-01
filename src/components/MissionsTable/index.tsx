import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { missionActions } from '@/store/mission/MissionSlice';

const MissionList: React.FC = () => {
  const dispatch = useAppDispatch();
  const missions = useAppSelector((state) => state.mission.missions);
  const navigate = useNavigate();

  const navigateToMission = (id: number): void => {
    navigate(`/missions/${id}`);
  };

  const deleteMission = (id: number): void => {
    dispatch(missionActions.deleteMission(id));
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ tableLayout: 'fixed' }} aria-label='missions-table'>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Memebers</TableCell>
            <TableCell>Departure</TableCell>
            <TableCell align='center'>Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {missions.map(({ id, name, crewMembers, departureDate }) => (
            <TableRow key={id}>
              <TableCell>{name}</TableCell>
              <TableCell>{crewMembers.length}</TableCell>
              <TableCell>{dayjs(departureDate).format('MMMM DD, YYYY')}</TableCell>
              <TableCell>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
                  <Button variant='contained' onClick={() => navigateToMission(id)}>
                    Manage
                  </Button>
                  <Button variant='contained' color='error' onClick={() => deleteMission(id)}>
                    Terminate
                  </Button>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MissionList;
