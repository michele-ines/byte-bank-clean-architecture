import type { AppError } from '@domain/errors/AppErrors';
import { showToast } from '@shared/utils/transactions.utils';
import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(): State {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary capturou um erro:', error, errorInfo);
    
    const isAppError = 'userMessage' in error;
    const userMessage = isAppError
      ? (error as AppError).userMessage
      : 'Ocorreu um erro inesperado. Por favor, tente novamente.';

    showToast('error', 'Erro', userMessage);

    setTimeout(() => {
      this.setState({ hasError: false });
    }, 100);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.children;
    }

    return this.props.children;
  }
}
