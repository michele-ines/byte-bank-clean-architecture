import { LoginForm } from '@/src/features/auth/LoginForm';
import { act, fireEvent, render, screen } from '@testing-library/react-native';
import { router } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React from 'react';
import { Alert } from 'react-native';

// Mock do módulo expo-router
jest.mock('expo-router', () => ({
  router: {
    replace: jest.fn(),
    push: jest.fn(),
  },
  Link: 'Link',
}));

jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
  getAuth: jest.fn(),
}));

jest.spyOn(Alert, 'alert');

jest.mock('../assets/images/login/ilustracao-login.svg', () => 'LoginIllustration');

describe('<LoginForm />', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renderiza todos os elementos do formulário corretamente', () => {
    render(<LoginForm />);
    expect(screen.getByText('Login')).toBeTruthy();
    expect(screen.getByPlaceholderText('Digite seu email')).toBeTruthy();
    expect(screen.getByPlaceholderText('Digite sua senha')).toBeTruthy();
    expect(screen.getByText('Acessar')).toBeTruthy();
    expect(screen.getByText('Criar conta')).toBeTruthy();
  });

  it('mostra um alerta se os campos estiverem vazios', () => {
    render(<LoginForm />);
    fireEvent.press(screen.getByText('Acessar'));
    expect(Alert.alert).toHaveBeenCalledWith("Atenção", "Informe e-mail e senha.");
    expect(signInWithEmailAndPassword).not.toHaveBeenCalled();
  });

  it('chama signInWithEmailAndPassword e redireciona em caso de sucesso', async () => {
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({ user: { uid: '123' } });

    render(<LoginForm />);

    fireEvent.changeText(screen.getByPlaceholderText('Digite seu email'), 'teste@email.com');
    fireEvent.changeText(screen.getByPlaceholderText('Digite sua senha'), 'senha123');
    
    await act(async () => {
      fireEvent.press(screen.getByText('Acessar'));
    });

    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(undefined, 'teste@email.com', 'senha123');
    expect(router.replace).toHaveBeenCalledWith('/dashboard');
    expect(Alert.alert).not.toHaveBeenCalled();
  });

  it('mostra um alerta de erro se o login do Firebase falhar', async () => {
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValue(new Error('Firebase error'));

    render(<LoginForm />);

    fireEvent.changeText(screen.getByPlaceholderText('Digite seu email'), 'teste@email.com');
    fireEvent.changeText(screen.getByPlaceholderText('Digite sua senha'), 'senha123');

    await act(async () => {
      fireEvent.press(screen.getByText('Acessar'));
    });

    expect(Alert.alert).toHaveBeenCalledWith("Erro de Login", "Email ou senha inválidos.");
    expect(router.replace).not.toHaveBeenCalled();
  });

  it('redireciona para /cadastro ao clicar em "Criar conta"', () => {
    render(<LoginForm />);
    fireEvent.press(screen.getByText('Criar conta'));
    expect(router.push).toHaveBeenCalledWith('/cadastro');
  });
});
