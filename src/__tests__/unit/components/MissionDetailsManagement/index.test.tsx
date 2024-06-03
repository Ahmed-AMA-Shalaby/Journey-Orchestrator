import { fireEvent, screen, waitFor } from '@testing-library/react';
import dayjs from 'dayjs';

import MissionDetailsManagement from '@/components/MissionDetailsManagement';
import { mockedUseNavigate } from '@/tests/unit/utils/mocks';
import { renderWithProviders } from '@/tests/unit/utils/renderWithProviders';

describe('MissionDetailsManagement', () => {
  it('renders the MissionDetailsManagement component', () => {
    renderWithProviders(<MissionDetailsManagement />);
    expect(screen.getByText('Mission Details')).toBeInTheDocument();
  });

  it('allows navigation between steps', async () => {
    renderWithProviders(<MissionDetailsManagement />);

    expect(screen.getByText('Prev')).toBeDisabled();

    // Fill in the first step
    fireEvent.change(screen.getByLabelText('Mission Name'), { target: { value: 'Test Mission - 1' } });

    fireEvent.mouseDown(screen.getByLabelText('Destination'));
    fireEvent.click(screen.getByText('Mars Alpha-116'));

    fireEvent.click(screen.getByLabelText('Departure Date'));
    fireEvent.click(screen.getByText(dayjs().date()));

    fireEvent.click(screen.getByText('Next'));

    await waitFor(() => {
      expect(screen.getByText('Prev')).not.toBeDisabled();
    });

    fireEvent.click(screen.getByText('Prev'));

    await waitFor(() => {
      expect(screen.getByText('Prev')).toBeDisabled();
    });
  });

  it('validates the form and shows error messages', async () => {
    renderWithProviders(<MissionDetailsManagement />);

    // Try to proceed without filling the form
    fireEvent.click(screen.getByText('Next'));

    await waitFor(() => {
      expect(screen.queryByText('Mission name is required')).toBeInTheDocument();
      expect(screen.queryByText('Mission destination is required')).toBeInTheDocument();
      expect(screen.queryByText('Departure date is required')).toBeInTheDocument();
    });

    // Fill in the Mission Details step
    fireEvent.change(screen.getByLabelText('Mission Name'), { target: { value: 'Test Mission - 2' } });
    await waitFor(() => {
      expect(screen.queryByText('Mission name is required')).not.toBeInTheDocument();
    });

    fireEvent.mouseDown(screen.getByLabelText('Destination'));
    fireEvent.click(screen.getByText('Mars Alpha-116'));
    await waitFor(() => {
      expect(screen.queryByText('Mission destination is required')).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByLabelText('Departure Date'));
    fireEvent.click(screen.getByText(dayjs().date()));
    await waitFor(() => {
      expect(screen.queryByText('Departure date is required')).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Next'));

    await waitFor(() => {
      expect(screen.getByText('Prev')).not.toBeDisabled();
    });

    // Try to proceed without filling the form
    fireEvent.click(screen.getByText('Create'));

    await waitFor(() => {
      expect(screen.queryByText('Pilot must have at least 10 years of experience')).toBeInTheDocument();
      expect(screen.queryByText("Engineer's job is required")).toBeInTheDocument();
    });

    // Fill in the Crew Details step
    fireEvent.change(screen.getAllByLabelText('Experience')[0], { target: { value: '10' } });
    await waitFor(() => {
      expect(screen.queryByText('Pilot must have at least 10 years of experience')).not.toBeInTheDocument();
    });

    fireEvent.change(screen.getAllByLabelText('Experience')[1], { target: { value: '5' } });

    fireEvent.mouseDown(screen.getByLabelText('Job'));
    fireEvent.click(screen.getByText('Navigation'));
    await waitFor(() => {
      expect(screen.queryByText("Engineer's job is required")).not.toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText('Age'), { target: { value: '25' } });
    fireEvent.change(screen.getByLabelText('Wealth'), { target: { value: '1000000' } });

    // Submit the form
    fireEvent.click(screen.getByText('Create'));

    await waitFor(() => {
      expect(mockedUseNavigate).toHaveBeenCalledWith('/missions');
    });
  });
});
