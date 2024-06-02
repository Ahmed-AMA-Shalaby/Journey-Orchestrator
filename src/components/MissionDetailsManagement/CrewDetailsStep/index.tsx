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
        <Typography variant='h6' gutterBottom sx={{ mt: 4 }}>
          Engineers
        </Typography>
      </FormLabel>
      {engineerFields.map((field, index) => (
        <Box key={field.id} sx={{ display: 'flex', gap: 2, mt: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
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
                <InputLabel>Job</InputLabel>
                <Select {...field} label='Job' error={!!errors.engineers?.[index]?.job}>
                  {engineerJobs.map((job) => (
                    <MenuItem key={job} value={job}>
                      {job}
                    </MenuItem>
                  ))}
                </Select>
                {errors.engineers?.[index]?.job && (
                  <Typography color='error'>{errors.engineers?.[index]?.job?.message}</Typography>
                )}
              </FormControl>
            )}
          />
          {isLargeScreen ? (
            <IconButton color='error' onClick={() => removeEngineer(index)}>
              <RemoveCircle />
            </IconButton>
          ) : (
            <Button
              variant='contained'
              color='error'
              onClick={() => removeEngineer(index)}
              startIcon={<RemoveCircle />}
              sx={{ mt: 2 }}
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
        sx={{ mt: 2 }}
      >
        Add Engineer
      </Button>

      {/* Passengers Section */}
      <FormLabel>
        <Typography variant='h6' gutterBottom sx={{ mt: 4 }}>
          Passengers
        </Typography>
      </FormLabel>
      {passengerFields.map((field, index) => (
        <Box key={field.id} sx={{ display: 'flex', gap: 2, mt: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
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
            <IconButton color='error' onClick={() => removePassenger(index)}>
              <RemoveCircle />
            </IconButton>
          ) : (
            <Button
              variant='contained'
              color='error'
              onClick={() => removePassenger(index)}
              startIcon={<RemoveCircle />}
              sx={{ mt: 2 }}
            >
              Remove Passenger
            </Button>
          )}
        </Box>
      ))}
      {getValues('passengers').length === 0 && errors.passengers && (
        <Typography color='error' sx={{ fontSize: '0.75rem' }}>
          {errors.passengers.message || errors.passengers.root?.message}
        </Typography>
      )}
      <Button
        variant='contained'
        onClick={() => appendPassenger({ age: '', wealth: '' })}
        fullWidth={!isLargeScreen}
        startIcon={<AddCircle />}
        sx={{ mt: 2 }}
      >
        Add Passenger
      </Button>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 4 }}>
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
