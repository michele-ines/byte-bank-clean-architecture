import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import Balance from './BalanceComponent';

jest.mock('@/src/utils/currency-formatte', () => ({
  formatBRL: jest.fn((value: number) => `R$ ${value.toFixed(2).replace('.', ',')}`),
}));

jest.mock('@/src/utils/string', () => ({
  getFirstName: jest.fn((fullName: string) => fullName?.split(" ")[0] || ""),
}));

jest.mock('@/src/utils/date', () => ({
  getCurrentDate: jest.fn(() => "Segunda-feira, 15/01/2024"),
}));

jest.mock('@expo/vector-icons', () => ({
  Entypo: 'Entypo',
}));

jest.mock('@/assets/images/dash-card-saldo/card-pixels-1.svg', () => 'card-pixels-1.svg');
jest.mock('@/assets/images/dash-card-saldo/card-pixels-2.svg', () => 'card-pixels-2.svg');

describe('BalanceComponent', () => {
  const mockUser = {
    displayName: 'John Silva Santos',
    email: 'john@email.com',
    uid: 'test-uid',
  } as any;

  const mockBalance = {
    account: 'Current Account',
    value: 1500.75,
  };

  const defaultProps = {
    user: mockUser,
    balance: mockBalance,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Basic rendering', () => {
    it('should render the component correctly', () => {
      render(<Balance {...defaultProps} />);
      
      expect(screen.getByText('Olá, John! :)')).toBeTruthy();
      expect(screen.getByText('Saldo')).toBeTruthy();
      expect(screen.getByText('Conta Current Account')).toBeTruthy();
    });

    it('should show only the first name of the user', () => {
      render(<Balance {...defaultProps} />);
      
      expect(screen.getByText('Olá, John! :)')).toBeTruthy();
      expect(screen.queryByText('Olá, John Silva Santos! :)')).toBeFalsy();
    });

    it('should render the current formatted date', () => {
      render(<Balance {...defaultProps} />);
      
      expect(screen.getByText('Segunda-feira, 15/01/2024')).toBeTruthy();
    });
  });

  describe('Show/hide balance functionality', () => {
    it('should show balance by default', () => {
      render(<Balance {...defaultProps} />);
      
      expect(screen.getByText('R$ 1500,75')).toBeTruthy();
      expect(screen.queryByText('••••••')).toBeFalsy();
    });

    it('should hide balance when button is pressed', () => {
      render(<Balance {...defaultProps} />);
      
      const toggleButton = screen.getByLabelText('Ocultar saldo da conta');
      fireEvent.press(toggleButton);
      
      expect(screen.getByText('••••••')).toBeTruthy();
      expect(screen.queryByText('R$ 1500,75')).toBeFalsy();
    });

    it('should show balance again after second press', () => {
      render(<Balance {...defaultProps} />);
      
      const toggleButton = screen.getByLabelText('Ocultar saldo da conta');
      
      fireEvent.press(toggleButton);
      expect(screen.getByText('••••••')).toBeTruthy();
      
      const showButton = screen.getByLabelText('Mostrar saldo da conta');
      fireEvent.press(showButton);
      expect(screen.getByText('R$ 1500,75')).toBeTruthy();
    });

    it('should change icon when balance is hidden', () => {
      render(<Balance {...defaultProps} />);
      
      const toggleButton = screen.getByLabelText('Ocultar saldo da conta');
      fireEvent.press(toggleButton);
      
      expect(screen.getByLabelText('Mostrar saldo da conta')).toBeTruthy();
    });
  });

  describe('Special value handling', () => {
    it('should show "Carregando..." when value is null', () => {
      const propsWithNullValue = {
        ...defaultProps,
        balance: { ...mockBalance, value: null },
      };
      
      render(<Balance {...propsWithNullValue} />);
      
      expect(screen.getByText('Carregando...')).toBeTruthy();
    });

    it('should show "••••••" when balance is hidden and value is null', () => {
      const propsWithNullValue = {
        ...defaultProps,
        balance: { ...mockBalance, value: null },
      };
      
      render(<Balance {...propsWithNullValue} />);
      
      const toggleButton = screen.getByLabelText('Ocultar saldo da conta');
      fireEvent.press(toggleButton);
      
      expect(screen.getByText('••••••')).toBeTruthy();
    });

    it('should handle zero value correctly', () => {
      const propsWithZeroValue = {
        ...defaultProps,
        balance: { ...mockBalance, value: 0 },
      };
      
      render(<Balance {...propsWithZeroValue} />);
      
      expect(screen.getByText('R$ 0,00')).toBeTruthy();
    });
  });

  describe('User handling', () => {
    it('should handle empty user displayName', () => {
      const propsWithEmptyName = {
        ...defaultProps,
        user: { ...mockUser, displayName: '' },
      };
      
      render(<Balance {...propsWithEmptyName} />);
      
      expect(screen.getByText('Olá, ! :)')).toBeTruthy();
    });

    it('should handle null user', () => {
      const propsWithNullUser = {
        ...defaultProps,
        user: null as any,
      };
      
      render(<Balance {...propsWithNullUser} />);
      
      expect(screen.getByText('Olá, ! :)')).toBeTruthy();
    });

    it('should show only first name even with compound names', () => {
      const propsWithCompoundName = {
        ...defaultProps,
        user: { ...mockUser, displayName: 'Maria José da Silva Santos' },
      };
      
      render(<Balance {...propsWithCompoundName} />);
      
      expect(screen.getByText('Olá, Maria! :)')).toBeTruthy();
    });
  });

  describe('Accessibility', () => {
    it('should have correct accessibility labels', () => {
      render(<Balance {...defaultProps} />);
      
      expect(screen.getByLabelText('Cartão de saldo de John')).toBeTruthy();
      expect(screen.getByLabelText('Informações de saldo da conta')).toBeTruthy();
      expect(screen.getByLabelText('Tipo de conta: Current Account')).toBeTruthy();
    });

    it('should have correct accessibilityHint for toggle button', () => {
      render(<Balance {...defaultProps} />);
      
      const toggleButton = screen.getByLabelText('Ocultar saldo da conta');
      expect(toggleButton.props.accessibilityHint).toBe('Toque para ocultar o valor do saldo');
    });

    it('should update balance accessibilityLabel when hidden', () => {
      render(<Balance {...defaultProps} />);
      
      const toggleButton = screen.getByLabelText('Ocultar saldo da conta');
      fireEvent.press(toggleButton);
      
      expect(screen.getByLabelText('Saldo oculto. Toque no ícone do olho para mostrar')).toBeTruthy();
    });

    it('should have correct accessibilityRole for headers', () => {
      render(<Balance {...defaultProps} />);
      
      const nameHeader = screen.getByText('Olá, John! :)');
      const balanceHeader = screen.getByText('Saldo');
      
      expect(nameHeader.props.accessibilityRole).toBe('header');
      expect(balanceHeader.props.accessibilityRole).toBe('header');
    });
  });


  describe('Date formatting', () => {
    it('should format date in Brazilian Portuguese', () => {
      const mockDate = new Date('2024-03-15');
      jest.spyOn(global, 'Date').mockImplementation(() => mockDate as any);
      
      render(<Balance {...defaultProps} />);
      
      expect(screen.getByLabelText(/Data de hoje:/)).toBeTruthy();
    });
  });

  describe('formatBRL integration', () => {
    it('should call formatBRL with correct value', () => {
      const { formatBRL } = require('@/src/utils/currency-formatte');
      
      render(<Balance {...defaultProps} />);
      
      expect(formatBRL).toHaveBeenCalledWith(1500.75);
    });

    it('should not call formatBRL when value is null', () => {
      const { formatBRL } = require('@/src/utils/currency-formatte');
      const propsWithNullValue = {
        ...defaultProps,
        balance: { ...mockBalance, value: null },
      };
      
      render(<Balance {...propsWithNullValue} />);
      
      expect(formatBRL).not.toHaveBeenCalled();
    });
  });
});
