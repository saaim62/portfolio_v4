import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CheckoutFlow from '@/components/checkout/CheckoutFlow';
import { useCart } from '@/context/CartContext';
import { processPayment } from '@/services/paymentService';
import { useRouter } from 'next/navigation';

// Mock dependencies
jest.mock('@/context/CartContext', () => ({
  useCart: jest.fn(),
}));

jest.mock('@/services/paymentService', () => ({
  processPayment: jest.fn(),
}));

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('CheckoutFlow Integration Tests', () => {
  const mockCartItems = [
    { id: '1', name: 'AI Portfolio Template', price: 299, quantity: 1 },
    { id: '2', name: 'Consultation Session', price: 150, quantity: 1 },
  ];

  const mockCart = {
    items: mockCartItems,
    total: 449,
    clearCart: jest.fn(),
  };

  const mockRouter = {
    push: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useCart as jest.Mock).mockReturnValue(mockCart);
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  test('should render checkout form with correct total', () => {
    render(<CheckoutFlow />);

    expect(screen.getByText(/Total: \$449/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Card Number/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Complete Purchase/i })).toBeInTheDocument();
  });

  test('should process payment successfully and redirect on valid input', async () => {
    (processPayment as jest.Mock).mockResolvedValue({ success: true, transactionId: 'txn_123' });

    render(<CheckoutFlow />);

    await userEvent.type(screen.getByLabelText(/Name/i), 'Saim Asif');
    await userEvent.type(screen.getByLabelText(/Email/i), 'saaim62@gmail.com');
    await userEvent.type(screen.getByLabelText(/Card Number/i), '4242424242424242');
    await userEvent.type(screen.getByLabelText(/Expiry/i), '12/25');
    await userEvent.type(screen.getByLabelText(/CVV/i), '123');

    fireEvent.click(screen.getByRole('button', { name: /Complete Purchase/i }));

    await waitFor(() => {
      expect(processPayment).toHaveBeenCalledWith({
        items: mockCartItems,
        total: 449,
        customerInfo: expect.any(Object),
      });
      expect(mockRouter.push).toHaveBeenCalledWith('/checkout/success');
    });
  });

  test('should display error message when payment fails', async () => {
    (processPayment as jest.Mock).mockRejectedValue(new Error('Payment declined'));

    render(<CheckoutFlow />);

    await userEvent.type(screen.getByLabelText(/Name/i), 'Saim Asif');
    await userEvent.type(screen.getByLabelText(/Email/i), 'saaim62@gmail.com');
    await userEvent.type(screen.getByLabelText(/Card Number/i), '4242424242424242');
    await userEvent.type(screen.getByLabelText(/Expiry/i), '12/25');
    await userEvent.type(screen.getByLabelText(/CVV/i), '123');

    fireEvent.click(screen.getByRole('button', { name: /Complete Purchase/i }));

    await waitFor(() => {
      expect(screen.getByText(/Payment declined/i)).toBeInTheDocument();
    });
  });

  test('should validate required fields before submission', async () => {
    render(<CheckoutFlow />);

    fireEvent.click(screen.getByRole('button', { name: /Complete Purchase/i }));

    await waitFor(() => {
      expect(screen.getByText(/Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Card Number is required/i)).toBeInTheDocument();
    });
  });

  test('should clear cart and redirect on successful purchase', async () => {
    (processPayment as jest.Mock).mockResolvedValue({ success: true, transactionId: 'txn_456' });

    render(<CheckoutFlow />);

    await userEvent.type(screen.getByLabelText(/Name/i), 'Saim Asif');
    await userEvent.type(screen.getByLabelText(/Email/i), 'saaim62@gmail.com');
    await userEvent.type(screen.getByLabelText(/Card Number/i), '4242424242424242');
    await userEvent.type(screen.getByLabelText(/Expiry/i), '12/25');
    await userEvent.type(screen.getByLabelText(/CVV/i), '123');

    fireEvent.click(screen.getByRole('button', { name: /Complete Purchase/i }));

    await waitFor(() => {
      expect(mockCart.clearCart).toHaveBeenCalled();
      expect(mockRouter.push).toHaveBeenCalledWith('/checkout/success');
    });
  });
});