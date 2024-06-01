import { Box, Button, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { Control, Controller, FieldErrors } from 'react-hook-form';

import { MissionForm } from '@/components/MissionDetailsManagement/schema';

interface MissionDetailsStepProps {
  control: Control<MissionForm>;
  errors: FieldErrors<MissionForm>;
  activeStep: number;
  stepBack: () => void;
}

const MissionDetailsStep: React.FC<MissionDetailsStepProps> = ({ control, errors, activeStep, stepBack }) => {
  return (
    <Box>
      <Controller
        name='missionName'
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label='Mission Name'
            fullWidth
            margin='normal'
            error={!!errors.missionName}
            helperText={errors.missionName?.message}
          />
        )}
      />

      <Controller
        name='departureDate'
        control={control}
        render={({ field }) => (
          <DatePicker
            {...field}
            label='Departure Date'
            slotProps={{
              textField: {
                fullWidth: true,
                margin: 'normal',
                error: !!errors.departureDate,
                helperText: errors.departureDate?.message,
              },
              field: { clearable: true, format: 'MMMM DD, YYYY' },
            }}
            onChange={(date) => field.onChange(date)}
          />
        )}
      />

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 2 }}>
        <Button variant='contained' disabled={activeStep === 0} onClick={stepBack}>
          Prev
        </Button>

        <Button variant='contained' type='submit'>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default MissionDetailsStep;
