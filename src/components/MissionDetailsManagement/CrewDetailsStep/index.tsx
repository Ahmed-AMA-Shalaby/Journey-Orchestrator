import { AddCircle, RemoveCircle } from '@mui/icons-material';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { Control, Controller, FieldErrors, useFieldArray } from 'react-hook-form';

import engineerJobs from '@/assets/EngineerJobs.json';
import { MissionForm } from '@/components/MissionDetailsManagement/schema';
import { useAppSelector } from '@/store/hooks';

interface CrewDetailsStepProps {
  control: Control<MissionForm>;
  errors: FieldErrors<MissionForm>;
  stepBack: () => void;
}

const CrewDetailsStep: React.FC<CrewDetailsStepProps> = ({ control, errors, stepBack }) => {
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

  return (
    <Box>
      {/* Pilot Section */}
      <Typography variant='h6' gutterBottom>
        Pilot
      </Typography>
      <Controller
        name='pilotExperience'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label='Pilot Experience'
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
      <Typography variant='h6' gutterBottom sx={{ mt: 4 }}>
        Engineers
      </Typography>
      {engineerFields.map((field, index) => (
        <Box key={field.id} sx={{ display: 'flex', gap: 2, mt: 2 }}>
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
          <IconButton onClick={() => removeEngineer(index)}>
            <RemoveCircle />
          </IconButton>
        </Box>
      ))}
      <Button
        variant='contained'
        onClick={() => appendEngineer({ job: '', experience: '' })}
        startIcon={<AddCircle />}
        sx={{ mt: 2 }}
      >
        Add Engineer
      </Button>

      {/* Passengers Section */}
      <Typography variant='h6' gutterBottom sx={{ mt: 4 }}>
        Passengers
      </Typography>
      {passengerFields.map((field, index) => (
        <Box key={field.id} sx={{ display: 'flex', gap: 2, mt: 2 }}>
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
          <IconButton onClick={() => removePassenger(index)}>
            <RemoveCircle />
          </IconButton>
        </Box>
      ))}
      <Button
        variant='contained'
        onClick={() => appendPassenger({ age: '', wealth: '' })}
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
