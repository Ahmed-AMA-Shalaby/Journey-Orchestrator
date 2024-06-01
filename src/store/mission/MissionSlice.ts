import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Mission } from '@/models/types/mission.type';

type MissionState = {
  missions: Mission[];
  selectedMission?: Mission;
};

const initialState: MissionState = { missions: [], selectedMission: undefined };

const missionSlice = createSlice({
  name: 'mission',
  initialState,
  reducers: {
    resetSelectedMission: (state) => {
      state.selectedMission = initialState.selectedMission;
    },
    getSelectedMission: (state, { payload }: PayloadAction<string | undefined>) => {
      state.selectedMission = payload ? state.missions.find((mission) => mission.id === +payload) : undefined;
    },
    upsertMission: (state, { payload }: PayloadAction<Mission>) => {
      const existingMission = state.missions.find((mission) => mission.id === payload.id);

      if (existingMission) {
        state.missions = state.missions.map((mission) => (mission.id === payload.id ? payload : mission));
      } else {
        state.missions = [...state.missions, payload];
      }
    },
    deleteMission: (state, { payload }: PayloadAction<number>) => {
      state.missions = state.missions.filter((mission) => mission.id !== payload);
    },
  },
});

export const missionActions = missionSlice.actions;
export default missionSlice.reducer;
