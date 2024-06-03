import { fireEvent, screen, waitFor } from '@testing-library/react';

import MissionsTable from '@/components/MissionsTable';
import { mockedUseNavigate, mockMissions } from '@/tests/unit/utils/mocks';
import { renderWithProviders } from '@/tests/unit/utils/renderWithProviders';

describe('MissionsTable', () => {
  it('renders MissionsTable component', () => {
    renderWithProviders(<MissionsTable />);

    expect(screen.getByText("Welcome, let's orchestrate the first journey to Mars!")).toBeInTheDocument();
  });

  it('renders "Start Mission" button when there are no missions', () => {
    renderWithProviders(<MissionsTable />);

    expect(screen.getByRole('button', { name: 'Start Mission' })).toBeInTheDocument();
  });

  it('renders missions table when there are missions', () => {
    renderWithProviders(<MissionsTable />, { mission: { missions: mockMissions } });

    expect(screen.getByText('Mission to Mars-110')).toBeInTheDocument();
    expect(screen.getByText('Mars Alpha-110')).toBeInTheDocument();
  });

  it('filters missions based on search input', async () => {
    renderWithProviders(<MissionsTable />, { mission: { missions: mockMissions } });

    fireEvent.change(screen.getByLabelText('Search by mission name'), { target: { value: 'moon' } });
    await waitFor(() => {
      expect(screen.queryByText('Mission to Mars-110')).not.toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText('Search by mission name'), { target: { value: 'mars' } });
    await waitFor(() => {
      expect(screen.getByText('Mission to Mars-110')).toBeInTheDocument();
    });
  });

  it('navigates to mission creation page on "Start Mission" button click', () => {
    renderWithProviders(<MissionsTable />);

    fireEvent.click(screen.getByRole('button', { name: 'Start Mission' }));
    expect(mockedUseNavigate).toHaveBeenCalledWith('/missions/new');
  });

  it('navigates to mission detail page on "Manage" button click', () => {
    renderWithProviders(<MissionsTable />, { mission: { missions: mockMissions } });

    fireEvent.click(screen.getByRole('button', { name: 'Manage' }));
    expect(mockedUseNavigate).toHaveBeenCalledWith('/missions/2');
  });

  it('terminates mission on "Terminate" button click', () => {
    renderWithProviders(<MissionsTable />, { mission: { missions: mockMissions } });

    expect(screen.getByText('Mission to Mars-220')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Terminate' }));
    expect(screen.queryByText('Mission to Mars-220')).not.toBeInTheDocument();
  });
});
