import { fireEvent, screen } from '@testing-library/react';
import React from 'react';

import MissionsPage from '@/pages/MissionsPage';
import { mockedUseNavigate, mockMissions } from '@/tests/unit/utils/mocks';
import { renderWithProviders } from '@/tests/unit/utils/renderWithProviders';

describe('MissionsPage', () => {
  it('renders MissionsPage component', () => {
    renderWithProviders(<MissionsPage />);

    expect(screen.getByText('Missions Dashboard')).toBeInTheDocument();
  });

  it('renders "Start Mission" button when there are no missions', () => {
    renderWithProviders(<MissionsPage />);

    expect(screen.queryByRole('button', { name: 'Start Mission' })).toBeInTheDocument();
  });

  it('renders "Start Mission" button when there are missions', () => {
    renderWithProviders(<MissionsPage />, { mission: { missions: mockMissions } });

    expect(screen.getByRole('button', { name: 'Start Mission' })).toBeInTheDocument();
  });

  it('navigates to mission creation page on "Start Mission" button click', () => {
    renderWithProviders(<MissionsPage />, { mission: { missions: mockMissions } });

    fireEvent.click(screen.getByRole('button', { name: 'Start Mission' }));
    expect(mockedUseNavigate).toHaveBeenCalledWith('/missions/new');
  });
});
