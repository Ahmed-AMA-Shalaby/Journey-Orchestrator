import InfoIcon from '@mui/icons-material/Info';
import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Button,
  Card,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  TooltipProps,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FlightStatus from '@/components/MissionsTable/FlightStatus';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { missionActions } from '@/store/mission/MissionSlice';
import { snackbarActions } from '@/store/snackbar/SnackbarSlice';
import { hasDeparted } from '@/utils';

const tooltipSlotProps = (yOffset: number): TooltipProps['slotProps'] => ({
  popper: {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, yOffset],
        },
      },
    ],
  },
});

const MissionList: React.FC = () => {
  const dispatch = useAppDispatch();
  const missions = useAppSelector((state) => state.mission.missions);
  const navigate = useNavigate();
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  const [searchText, setSearchText] = useState('');
  const [filteredMissions, setFilteredMissions] = useState(missions);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const handleSearch = (): void => {
      const filtered = missions.filter((mission) => mission.name.toLowerCase().startsWith(searchText.toLowerCase()));

      setFilteredMissions(filtered);
    };

    if (searchText) {
      timeoutId = setTimeout(handleSearch, 500);
    } else {
      setFilteredMissions(missions);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [missions, searchText]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchText(event.target.value);
  };

  const navigateToMission = (id: number): void => {
    navigate(`/missions/${id}`);
  };

  const deleteMission = (id: number): void => {
    dispatch(missionActions.deleteMission(id));
    dispatch(snackbarActions.showSnackbar('Mission has been terminated!'));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
      <Card sx={{ px: 2, py: 1 }}>
        <TextField
          label='Search by mission name'
          value={searchText}
          onChange={handleSearchChange}
          variant='standard'
          fullWidth
          size='small'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Card>

      <Box sx={{ overflow: 'auto' }}>
        <Box sx={{ width: '100%', display: 'table', tableLayout: 'fixed' }}>
          <TableContainer component={Paper}>
            <Table aria-label='missions-table'>
              <TableHead sx={{ backgroundColor: 'white' }}>
                <TableRow>
                  <TableCell>Name</TableCell>

                  <TableCell>Destination</TableCell>

                  <TableCell>Members</TableCell>

                  <TableCell align='right'>Departure</TableCell>

                  <TableCell align='center'>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredMissions.map(({ id, name, destination, crewMembers, departureDate }) => (
                  <TableRow key={id}>
                    <TableCell sx={{ textWrap: 'nowrap' }}>{name}</TableCell>

                    <TableCell sx={{ textWrap: 'nowrap' }}>{destination}</TableCell>

                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {crewMembers.length}
                        <Tooltip
                          title={
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                              <Typography>Crew Overview:</Typography>
                              <Box>
                                <Typography>
                                  Pilots: {crewMembers.filter((member) => member.type === 'Pilot').length}
                                </Typography>
                                <Typography>
                                  Engineers: {crewMembers.filter((member) => member.type === 'Engineer').length}
                                </Typography>
                                <Typography>
                                  Passengers: {crewMembers.filter((member) => member.type === 'Passenger').length}
                                </Typography>
                              </Box>
                            </Box>
                          }
                          placement='bottom'
                          arrow
                          slotProps={tooltipSlotProps(isLargeScreen ? -7 : -14)}
                        >
                          <InfoIcon color='info' fontSize='small' />
                        </Tooltip>
                      </Box>
                    </TableCell>

                    <TableCell sx={{ textWrap: 'nowrap' }}>
                      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                        {dayjs(departureDate).format('MMMM DD, YYYY')}
                        <Typography
                          sx={{
                            fontSize: '0.75rem',
                            fontStyle: 'italic',
                            color: `${hasDeparted(departureDate) ? 'red' : 'grey'}`,
                          }}
                        >
                          <FlightStatus departureDate={departureDate} />
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell>
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4 }}>
                        {!hasDeparted(departureDate) && (
                          <>
                            <Button variant='contained' fullWidth onClick={() => navigateToMission(id)}>
                              Manage
                            </Button>
                            <Button variant='contained' fullWidth color='error' onClick={() => deleteMission(id)}>
                              Terminate
                            </Button>
                          </>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default MissionList;
