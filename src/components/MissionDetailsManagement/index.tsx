import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Step, StepLabel, Stepper } from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import CrewDetailsStep from '@/components/MissionDetailsManagement/CrewDetailsStep';
import MissionDetailsStep from '@/components/MissionDetailsManagement/MissionDetailsStep';
import { finalSchema, MissionForm, missionSchema } from '@/components/MissionDetailsManagement/schema';
import { CrewMemberType } from '@/models/types/crewMemberType.type';
import { Mission } from '@/models/types/mission.type';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { missionActions } from '@/store/mission/MissionSlice';

const steps = ['Mission Details', 'Crew Details'];

const MissionDetailsManagement: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedMission = useAppSelector((state) => state.mission.selectedMission);
  const [activeStep, setActiveStep] = useState(0);

  const initializeForm = (selectedMission: Mission): MissionForm => {
    return {
      missionName: selectedMission.name,
      departureDate: dayjs(selectedMission.departureDate),
      pilotExperience: `${selectedMission.crewMembers.find((crewMember) => crewMember.type === 'Pilot')?.experience}`,
      engineers: [
        ...selectedMission.crewMembers
          .filter((crewMember) => crewMember.type === 'Engineer')
          .map((engineer) => ({ job: `${engineer.job}`, experience: `${engineer.experience}` })),
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
    formState: { errors },
  } = useForm<MissionForm>({
    mode: 'onTouched',
    resolver: zodResolver(currentSchema),
    defaultValues: {
      missionName: '',
      departureDate: null,
      pilotExperience: '',
      engineers: [{ job: '', experience: '' }],
      passengers: [{ age: '', wealth: '' }],
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedMission) {
      reset(initializeForm(selectedMission));
    }
  }, [reset, selectedMission]);

  const onSubmit = (data: MissionForm): void => {
    if (activeStep === steps.length - 1) {
      const mission: Mission = {
        id: selectedMission?.id || Math.floor(Math.random() * 10000),
        name: data.missionName,
        departureDate: (data.departureDate || dayjs()).toISOString(),
        crewMembers: [
          { type: 'Pilot', experience: +data.pilotExperience },
          ...data.engineers.map((engineer) => ({
            ...engineer,
            type: 'Engineer' as CrewMemberType,
            experience: +engineer.experience,
          })),
          ...data.passengers.map((passenger) => ({
            type: 'Passenger' as CrewMemberType,
            age: +passenger.age,
            wealth: +passenger.wealth,
          })),
        ],
      };

      dispatch(missionActions.upsertMission(mission));
      navigate('/missions');
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const stepBack = (): void => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Box>
      <Stepper activeStep={activeStep} alternativeLabel sx={{ m: 2 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <form onSubmit={handleSubmit(onSubmit)}>
        {activeStep === 0 && (
          <MissionDetailsStep control={control} errors={errors} activeStep={activeStep} stepBack={stepBack} />
        )}

        {activeStep === 1 && <CrewDetailsStep control={control} errors={errors} stepBack={stepBack} />}
      </form>
    </Box>
  );
};

export default MissionDetailsManagement;
