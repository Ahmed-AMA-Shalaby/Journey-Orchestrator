import ClearIcon from '@mui/icons-material/Clear';
import SettingsIcon from '@mui/icons-material/Settings';
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { missionActions } from '@/store/mission/MissionSlice';

const MissionList: React.FC = () => {
  const dispatch = useAppDispatch();
  const missions = useAppSelector((state) => state.mission.missions);
  const navigate = useNavigate();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

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
            <TableCell>Members</TableCell>
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
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 0, md: 2 } }}>
                  {isLargeScreen ? (
                    <>
                      <Button variant='contained' fullWidth onClick={() => navigateToMission(id)}>
                        Manage
                      </Button>
                      <Button variant='contained' fullWidth color='error' onClick={() => deleteMission(id)}>
                        Terminate
                      </Button>
                    </>
                  ) : (
                    <>
                      <Tooltip
                        title='Manage'
                        placement='top'
                        arrow
                        slotProps={{
                          popper: {
                            modifiers: [
                              {
                                name: 'offset',
                                options: {
                                  offset: [0, -14],
                                },
                              },
                            ],
                          },
                        }}
                      >
                        <IconButton color='primary' onClick={() => navigateToMission(id)}>
                          <SettingsIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip
                        title='Terminate'
                        placement='top'
                        arrow
                        slotProps={{
                          popper: {
                            modifiers: [
                              {
                                name: 'offset',
                                options: {
                                  offset: [0, -14],
                                },
                              },
                            ],
                          },
                        }}
                      >
                        <IconButton color='error' onClick={() => deleteMission(id)}>
                          <ClearIcon />
                        </IconButton>
                      </Tooltip>
                    </>
                  )}
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
