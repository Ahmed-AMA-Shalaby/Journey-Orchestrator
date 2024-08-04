import { zodResolver } from '@hookform/resolvers/zod';
import { Card, Step, StepContent, StepLabel, Stepper, useMediaQuery, useTheme } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import CrewDetailsStep from '@/components/MissionDetailsManagement/CrewDetailsStep';
import MissionDetailsStep from '@/components/MissionDetailsManagement/MissionDetailsStep';
import { finalSchema, MissionForm, missionSchema } from '@/components/MissionDetailsManagement/schema';
import useSx from '@/components/MissionDetailsManagement/styles';
import { CrewMemberType } from '@/models/types/crewMemberType.type';
import { EngineerJob } from '@/models/types/engineerJob.type';
import { Mission } from '@/models/types/mission.type';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { missionActions } from '@/store/mission/MissionSlice';
import { snackbarActions } from '@/store/snackbar/SnackbarSlice';
import { hasDeparted } from '@/utils';

const steps = ['Mission Details', 'Crew Details'];

const MissionDetailsManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedMission = useAppSelector((state) => state.mission.selectedMission);
  const [activeStep, setActiveStep] = useState(0);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('sm'));

  const initializeForm = (selectedMission: Mission): MissionForm => {
    return {
      missionName: selectedMission.name,
      missionDestination: selectedMission.destination,
      departureDate: dayjs(selectedMission.departureDate),
      pilotExperience: `${selectedMission.crewMembers.find((crewMember) => crewMember.type === 'Pilot')?.experience}`,
      engineers: [
        ...selectedMission.crewMembers
          .filter((crewMember) => crewMember.type === 'Engineer')
          .map((engineer) => ({ experience: `${engineer.experience}`, job: `${engineer.job}` })),
      ],
      passengers: [
        ...selectedMission.crewMembers
          .filter((crewMember) => crewMember.type === 'Passenger')
          .map((passenger) => ({ age: `${passenger.age}`, wealth: `${passenger.wealth}` })),
      ],
    };
  };

  const isStep1 = activeStep === 0;
  const currentSchema = isStep1 ? missionSchema : finalSchema;
  const {
    control,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<MissionForm>({
    mode: 'onTouched',
    resolver: zodResolver(currentSchema),
    defaultValues: {
      missionName: '',
      missionDestination: '',
      departureDate: null,
      pilotExperience: '',
      engineers: [{ experience: '', job: '' }],
      passengers: [{ age: '', wealth: '' }],
    },
  });

  const navigate = useNavigate();
  const styles = useSx();

  useEffect(() => {
    if (selectedMission) {
      if (hasDeparted(selectedMission.departureDate)) {
        navigate('/missions');
      }
      reset(initializeForm(selectedMission));
    }
  }, [navigate, reset, selectedMission]);

  const onSubmit = (data: MissionForm): void => {
    if (activeStep === steps.length - 1) {
      const mission: Mission = {
        id: selectedMission?.id || Math.floor(Math.random() * 10000),
        name: data.missionName,
        destination: data.missionDestination,
        departureDate: (data.departureDate || dayjs()).toISOString(),
        crewMembers: [
          { type: 'Pilot', experience: +data.pilotExperience },
          ...data.engineers.map((engineer) => ({
            type: 'Engineer' as CrewMemberType,
            experience: +engineer.experience,
            job: engineer.job as EngineerJob,
          })),
          ...data.passengers.map((passenger) => ({
            type: 'Passenger' as CrewMemberType,
            age: +passenger.age,
            wealth: +passenger.wealth,
          })),
        ],
      };

      dispatch(missionActions.upsertMission(mission));
      dispatch(snackbarActions.showSnackbar(`Mission has been ${selectedMission ? 'updated' : 'created'}!`));
      navigate('/missions');
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const stepBack = (): void => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Card sx={styles.card}>
      <Stepper
        activeStep={activeStep}
        sx={styles.stepper}
        orientation={isLargeScreen ? 'horizontal' : 'vertical'}
        alternativeLabel={isLargeScreen}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            {!isLargeScreen && (
              <StepContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                  {activeStep === 0 && (
                    <MissionDetailsStep control={control} errors={errors} activeStep={activeStep} stepBack={stepBack} />
                  )}

                  {activeStep === 1 && (
                    <CrewDetailsStep control={control} errors={errors} getValues={getValues} stepBack={stepBack} />
                  )}
                </form>
              </StepContent>
            )}
          </Step>
        ))}
      </Stepper>

      {isLargeScreen && (
        <form onSubmit={handleSubmit(onSubmit)}>
          {activeStep === 0 && (
            <MissionDetailsStep control={control} errors={errors} activeStep={activeStep} stepBack={stepBack} />
          )}

          {activeStep === 1 && (
            <CrewDetailsStep control={control} errors={errors} getValues={getValues} stepBack={stepBack} />
          )}
        </form>
      )}
    </Card>
  );
};

export default MissionDetailsManagement;
