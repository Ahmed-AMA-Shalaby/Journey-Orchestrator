import InfoIcon from '@mui/icons-material/Info';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
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
import useSx from '@/components/MissionsTable/styles';
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
  const styles = useSx();

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const handleSearch = (): void => {
      const filtered = missions.filter((mission) => mission.name.toLowerCase().includes(searchText.toLowerCase()));

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

  const navigateToMissionCreation = (): void => {
    navigate('/missions/new');
  };

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

  const NoMissionsCard = (): JSX.Element => (
    <Card sx={styles.noMissionsCard}>
      <Box sx={styles.noMissionsCardContent}>
        <Typography color='grey'>
          {missions.length !== 0
            ? `Couldn't find the missions you're looking for...`
            : `Welcome, let's orchestrate the first journey to Mars!`}
        </Typography>
        {missions.length !== 0 ? (
          <Typography color='grey'>Try searching by another name!</Typography>
        ) : (
          <Button variant='contained' onClick={navigateToMissionCreation} sx={styles.startMissionButton}>
            Start Mission
            <RocketLaunchIcon />
          </Button>
        )}
      </Box>
    </Card>
  );

  return (
    <Box sx={styles.wrapper}>
      {missions.length !== 0 ? (
        <>
          <Card sx={styles.searchCard}>
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

          {filteredMissions.length !== 0 ? (
            <Box sx={styles.tableOverflow}>
              <Box sx={styles.tableWrapper}>
                <TableContainer component={Paper}>
                  <Table aria-label='missions-table'>
                    <TableHead sx={styles.tableHead}>
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
                          <TableCell sx={styles.noWrap}>{name}</TableCell>

                          <TableCell sx={styles.noWrap}>{destination}</TableCell>

                          <TableCell>
                            <Box sx={styles.membersWrapper}>
                              {crewMembers.length}
                              <Tooltip
                                title={
                                  <Box sx={styles.tooltip}>
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
                                placement='top'
                                arrow
                                slotProps={tooltipSlotProps(isLargeScreen ? -7 : -14)}
                              >
                                <InfoIcon color='info' fontSize='small' />
                              </Tooltip>
                            </Box>
                          </TableCell>

                          <TableCell sx={styles.noWrap}>
                            <Box sx={styles.departureWrapper}>
                              {dayjs(departureDate).format('MMMM DD, YYYY')}
                              <Typography
                                color={hasDeparted(departureDate) ? 'red' : 'grey'}
                                sx={styles.departureStatus}
                              >
                                <FlightStatus departureDate={departureDate} />
                              </Typography>
                            </Box>
                          </TableCell>

                          <TableCell>
                            <Box sx={styles.actionsWrapper}>
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
          ) : (
            <NoMissionsCard />
          )}
        </>
      ) : (
        <NoMissionsCard />
      )}
    </Box>
  );
};

export default MissionList;
