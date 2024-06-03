import { fireEvent, screen } from '@testing-library/react';

import MissionManagementPage from '@/pages/MissionManagmentPage';
import { mockedUseNavigate, mockMissions } from '@/tests/unit/utils/mocks';
import { renderWithProviders } from '@/tests/unit/utils/renderWithProviders';

describe('MissionManagmentPage', () => {
  it('renders MissionManagmentPage component', () => {
    renderWithProviders(<MissionManagementPage />);

    expect(screen.getByText('Initiate Mission')).toBeInTheDocument();
  });

  it('renders "Configure Mission" when there is a selected mission', () => {
    renderWithProviders(<MissionManagementPage />, {
      mission: { missions: mockMissions, selectedMission: mockMissions[1] },
    });

    expect(screen.getByText('Configure Mission')).toBeInTheDocument();
  });

  it('navigates to missions page on back button click', () => {
    renderWithProviders(<MissionManagementPage />);

    fireEvent.click(screen.getByTestId('ArrowBackIcon'));
    expect(mockedUseNavigate).toHaveBeenCalledWith('/missions');
  });
});
