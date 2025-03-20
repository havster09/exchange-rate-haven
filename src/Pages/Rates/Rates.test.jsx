import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import Rates from './Rates';
import { fetchRate } from '../../api';

jest.mock('../../api', () => ({
  fetchRate: jest.fn(),
}));

jest.mock('../../Icons/Transfer.svg', () => ({
  ReactComponent: () => <div data-testid="transfer-icon">Transfer Icon</div>,
}));

describe('Rates Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    fetchRate.mockResolvedValue(1.5);
  });

  it('renders initial state correctly', async () => {
    render(<Rates />);

    expect(screen.getByText('Currency Conversion')).toBeInTheDocument();
    expect(screen.getByLabelText('From')).toBeInTheDocument();
    expect(screen.getByLabelText('To')).toBeInTheDocument();
    expect(screen.getByLabelText('Amount')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('1.5000')).toBeInTheDocument();
    });
  });

  it('handles currency selection changes', async () => {
    render(<Rates />);

    fetchRate.mockResolvedValueOnce(2.0);

    const fromDropdown = screen.getByLabelText('From');
    fireEvent.click(fromDropdown);

    await waitFor(() => {
      expect(fetchRate).toHaveBeenCalled();
    });
  });

  it('calculates conversion correctly', async () => {
    render(<Rates />);

    await waitFor(() => {
      expect(screen.getByText('1.5000')).toBeInTheDocument();
    });

    const amountInput = screen.getByLabelText('Amount');
    fireEvent.change(amountInput, { target: { value: '100' } });

    await waitFor(() => {
      expect(screen.getByText('Market Rate:').nextSibling.textContent.trim()).toBe('150.00 USD');
    });

    await waitFor(() => {
      expect(screen.getByText(/149\.25/)).toBeInTheDocument();
    });
  });

  it('displays error message when API call fails', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    fetchRate.mockRejectedValueOnce(new Error('API Error'));

    render(<Rates />);

    await waitFor(() => {
      expect(screen.getByText('Error Fetching Rate')).toBeInTheDocument();
      expect(
        screen.getByText('An unexpected error occurred. Please try again later.')
      ).toBeInTheDocument();
    });

    consoleSpy.mockRestore();
  });

  it('shows loading state during API calls', async () => {
    fetchRate.mockImplementationOnce(
      () => new Promise(resolve => setTimeout(() => resolve(1.5), 100))
    );

    render(<Rates />);

    expect(screen.getByRole('progressbar')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('1.5000')).toBeInTheDocument();
    });
  });

  it('updates exchange rate periodically', async () => {
    jest.useFakeTimers();

    render(<Rates />);

    await waitFor(() => {
      expect(screen.getByText('1.5000')).toBeInTheDocument();
    });

    fetchRate.mockResolvedValueOnce(1.6);

    await act(async () => {
      jest.advanceTimersByTime(10000);
    });

    await waitFor(() => {
      expect(fetchRate).toHaveBeenCalledTimes(2);
    });

    jest.useRealTimers();
  });
});
