import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { DatePicker, pickersCalendarHeaderClasses } from '@mui/x-date-pickers';
import { useState } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';

import destinations from '@/assets/Destinations.json';
import { MissionForm } from '@/components/MissionDetailsManagement/schema';

interface MissionDetailsStepProps {
  control: Control<MissionForm>;
  errors: FieldErrors<MissionForm>;
  activeStep: number;
  stepBack: () => void;
}

const MissionDetailsStep: React.FC<MissionDetailsStepProps> = ({ control, errors, activeStep, stepBack }) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const openDatePicker = (): void => {
    setIsDatePickerOpen(true);
  };

  const closeDatePicker = (): void => {
    setIsDatePickerOpen(false);
  };

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
        name={'missionDestination'}
        control={control}
        render={({ field }) => (
          <FormControl fullWidth margin='none'>
            <InputLabel>Destination</InputLabel>
            <Select {...field} label='Destination' error={!!errors.missionDestination}>
              {destinations.map((destination) => (
                <MenuItem key={destination} value={destination}>
                  {destination}
                </MenuItem>
              ))}
            </Select>
            {errors.missionDestination && (
              <Typography color='error' sx={{ fontSize: '0.75rem', mt: '3px', ml: '14px' }}>
                {errors.missionDestination.message}
              </Typography>
            )}
          </FormControl>
        )}
      />

      <Controller
        name='departureDate'
        control={control}
        render={({ field }) => (
          <DatePicker
            {...field}
            open={isDatePickerOpen}
            onOpen={openDatePicker}
            onClose={closeDatePicker}
            label='Departure Date'
            slotProps={{
              textField: {
                fullWidth: true,
                margin: 'normal',
                error: !!errors.departureDate,
                helperText: errors.departureDate?.message,
                onClick: openDatePicker,
              },
              field: { clearable: true, format: 'MMMM DD, YYYY' },
              calendarHeader: {
                sx: {
                  [`.${pickersCalendarHeaderClasses.label}`]: {
                    color: 'rgba(0, 0, 0, 0.87)',
                  },
                  [`.${pickersCalendarHeaderClasses.switchViewIcon}`]: {
                    color: 'rgba(0, 0, 0, 0.87)',
                  },
                  [`.${pickersCalendarHeaderClasses.labelContainer}`]: {
                    color: 'rgba(0, 0, 0, 0.87)',
                  },
                },
              },
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
