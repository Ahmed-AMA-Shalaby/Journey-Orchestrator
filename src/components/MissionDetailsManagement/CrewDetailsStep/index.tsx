import { AddCircle, RemoveCircle } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Control, Controller, FieldErrors, useFieldArray, UseFormGetValues } from 'react-hook-form';

import engineerJobs from '@/assets/EngineerJobs.json';
import useSx from '@/components/MissionDetailsManagement/CrewDetailsStep/styles';
import { MissionForm } from '@/components/MissionDetailsManagement/schema';
import { useAppSelector } from '@/store/hooks';

interface CrewDetailsStepProps {
  control: Control<MissionForm>;
  errors: FieldErrors<MissionForm>;
  getValues: UseFormGetValues<MissionForm>;
  stepBack: () => void;
}

const CrewDetailsStep: React.FC<CrewDetailsStepProps> = ({ control, errors, getValues, stepBack }) => {
  const {
    fields: engineerFields,
    append: appendEngineer,
    remove: removeEngineer,
  } = useFieldArray({
    control,
    name: 'engineers',
  });

  const {
    fields: passengerFields,
    append: appendPassenger,
    remove: removePassenger,
  } = useFieldArray({
    control,
    name: 'passengers',
  });

  const selectedMission = useAppSelector((state) => state.mission.selectedMission);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const styles = useSx();

  return (
    <Box>
      {/* Pilot Section */}
      <FormLabel>
        <Typography variant='h6' gutterBottom>
          Pilot
        </Typography>
      </FormLabel>
      <Controller
        name='pilotExperience'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label='Experience'
            type='number'
            margin='normal'
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>year{Math.abs(+field.value) === 1 ? '' : 's'}</InputAdornment>
              ),
            }}
            error={!!errors.pilotExperience}
            helperText={errors.pilotExperience?.message}
          />
        )}
      />

      {/* Engineers Section */}
      <FormLabel>
        <Typography variant='h6' gutterBottom sx={styles.sectionSeparator}>
          Engineers
        </Typography>
      </FormLabel>
      {engineerFields.map((field, index) => (
        <Box key={field.id} sx={styles.fieldsSeparator}>
          <Controller
            name={`engineers.${index}.experience`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Experience'
                type='number'
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      year{field.value && Math.abs(+field.value) === 1 ? '' : 's'}
                    </InputAdornment>
                  ),
                }}
                error={!!errors.engineers?.[index]?.experience}
                helperText={errors.engineers?.[index]?.experience?.message}
              />
            )}
          />
          <Controller
            name={`engineers.${index}.job`}
            control={control}
            render={({ field }) => (
              <FormControl fullWidth margin='none'>
                <InputLabel id='engineer-job-select'>Job</InputLabel>
                <Select {...field} labelId='engineer-job-select' label='Job' error={!!errors.engineers?.[index]?.job}>
                  {engineerJobs.map((job) => (
                    <MenuItem key={job} value={job}>
                      {job}
                    </MenuItem>
                  ))}
                </Select>
                {errors.engineers?.[index]?.job && (
                  <Typography color='error' sx={styles.membersError}>
                    {errors.engineers?.[index]?.job?.message}
                  </Typography>
                )}
              </FormControl>
            )}
          />
          {isLargeScreen ? (
            <IconButton color='error' onClick={() => removeEngineer(index)} sx={styles.removeMemberIcon}>
              <RemoveCircle />
            </IconButton>
          ) : (
            <Button
              variant='contained'
              color='error'
              onClick={() => removeEngineer(index)}
              startIcon={<RemoveCircle />}
              sx={styles.addOrRemoveMemberButton}
            >
              Remove Engineer
            </Button>
          )}
        </Box>
      ))}
      <Button
        variant='contained'
        onClick={() => appendEngineer({ experience: '', job: '' })}
        fullWidth={!isLargeScreen}
        startIcon={<AddCircle />}
        sx={styles.addOrRemoveMemberButton}
      >
        Add Engineer
      </Button>

      {/* Passengers Section */}
      <FormLabel>
        <Typography variant='h6' gutterBottom sx={styles.sectionSeparator}>
          Passengers
        </Typography>
      </FormLabel>
      {passengerFields.map((field, index) => (
        <Box key={field.id} sx={styles.fieldsSeparator}>
          <Controller
            name={`passengers.${index}.age`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Age'
                type='number'
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      year{field.value && Math.abs(+field.value) === 1 ? '' : 's'}
                    </InputAdornment>
                  ),
                }}
                error={!!errors.passengers?.[index]?.age}
                helperText={errors.passengers?.[index]?.age?.message}
              />
            )}
          />
          <Controller
            name={`passengers.${index}.wealth`}
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label='Wealth'
                type='number'
                fullWidth
                InputProps={{ startAdornment: <InputAdornment position='start'>€</InputAdornment> }}
                error={!!errors.passengers?.[index]?.wealth}
                helperText={errors.passengers?.[index]?.wealth?.message}
              />
            )}
          />
          {isLargeScreen ? (
            <IconButton color='error' onClick={() => removePassenger(index)} sx={styles.removeMemberIcon}>
              <RemoveCircle />
            </IconButton>
          ) : (
            <Button
              variant='contained'
              color='error'
              onClick={() => removePassenger(index)}
              startIcon={<RemoveCircle />}
              sx={styles.addOrRemoveMemberButton}
            >
              Remove Passenger
            </Button>
          )}
        </Box>
      ))}
      {getValues('passengers').length === 0 && errors.passengers && (
        <Typography color='error' sx={styles.membersError}>
          {errors.passengers.message || errors.passengers.root?.message}
        </Typography>
      )}
      <Button
        variant='contained'
        onClick={() => appendPassenger({ age: '', wealth: '' })}
        fullWidth={!isLargeScreen}
        startIcon={<AddCircle />}
        sx={styles.addOrRemoveMemberButton}
      >
        Add Passenger
      </Button>

      <Box sx={styles.stepperControls}>
        <Button variant='contained' onClick={stepBack}>
          Prev
        </Button>

        <Button variant='contained' color='success' type='submit'>
          {selectedMission ? 'Update' : 'Create'}
        </Button>
      </Box>
    </Box>
  );
};

export default CrewDetailsStep;
