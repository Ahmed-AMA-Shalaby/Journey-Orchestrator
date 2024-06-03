import { fireEvent, screen, waitFor } from '@testing-library/react';

import AppSnackbar from '@/components/AppSnackbar';
import { renderWithProviders } from '@/tests/unit/utils/renderWithProviders';

describe('AppSnackbar', () => {
  it('renders the Snackbar component when open', () => {
    renderWithProviders(<AppSnackbar />, { snackbar: { isOpen: true, message: 'Test message' } });

    expect(screen.getByText('Test message')).toBeInTheDocument();
  });

  it('closes the Snackbar when close button is clicked', async () => {
    renderWithProviders(<AppSnackbar />, { snackbar: { isOpen: true, message: 'Test message' } });

    const closeButton = screen.getByRole('button', { name: 'Close' });

    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByText('Test message')).not.toBeInTheDocument();
    });
  });

  it('closes the Snackbar automatically after the autoHideDuration', { timeout: 6000 }, async () => {
    renderWithProviders(<AppSnackbar />, { snackbar: { isOpen: true, message: 'Test message' } });

    await waitFor(
      () => {
        expect(screen.queryByText('Test message')).not.toBeInTheDocument();
      },
      { timeout: 6000 },
    );
  });
});
