// import { SignupForm } from '@/src/features/auth/SignupForm';
// import { fireEvent, render, screen } from '@testing-library/react-native';
// import { router } from 'expo-router';
// import React from 'react';
// import { Alert } from 'react-native';

// jest.mock('expo-router', () => ({
//   router: {
//     push: jest.fn(),
//   },
// }));

// jest.spyOn(Alert, 'alert');

// jest.mock('../assets/images/cadastro/ilustracao-cadastro.svg', () => 'SignupIllustration');

// jest.mock('expo-checkbox', () => 'Checkbox');


// describe('<SignupForm />', () => {
//   beforeEach(() => {
//     (router.push as jest.Mock).mockClear();
//     (Alert.alert as jest.Mock).mockClear();
//   });

//   it('renderiza todos os campos do formulário', () => {
//     render(<SignupForm />);

//     expect(screen.getByText(/Preencha os campos abaixo/i)).toBeTruthy();
//     expect(screen.getByPlaceholderText('Digite seu nome completo')).toBeTruthy();
//     expect(screen.getByPlaceholderText('Digite seu email')).toBeTruthy();
//     expect(screen.getByPlaceholderText('Digite sua senha')).toBeTruthy();
//     expect(screen.getByPlaceholderText('Confirme sua senha')).toBeTruthy();
//     expect(screen.getByText(/Li e estou ciente/i)).toBeTruthy();
//     expect(screen.getByText('Criar conta')).toBeTruthy();
//   });

//   it('mostra um alerta se os campos estiverem vazios ao submeter', () => {
//     render(<SignupForm />);
//     fireEvent.press(screen.getByText('Criar conta'));
//     expect(Alert.alert).toHaveBeenCalledWith("Atenção", "Por favor, preencha todos os campos.");
//   });

//   it('mostra um alerta se as senhas não coincidirem', () => {
//     render(<SignupForm />);
    
//     fireEvent.changeText(screen.getByPlaceholderText('Digite seu nome completo'), 'Teste');
//     fireEvent.changeText(screen.getByPlaceholderText('Digite seu email'), 'teste@email.com');
//     fireEvent.changeText(screen.getByPlaceholderText('Digite sua senha'), 'senha123');
//     fireEvent.changeText(screen.getByPlaceholderText('Confirme sua senha'), 'senha456');
//     fireEvent.press(screen.getByText('Criar conta'));

//     expect(Alert.alert).toHaveBeenCalledWith("Atenção", "As senhas não coincidem.");
//   });
  
//   it('mostra um alerta se os termos não forem aceites', () => {
//     render(<SignupForm />);
    
//     fireEvent.changeText(screen.getByPlaceholderText('Digite seu nome completo'), 'Teste');
//     fireEvent.changeText(screen.getByPlaceholderText('Digite seu email'), 'teste@email.com');
//     fireEvent.changeText(screen.getByPlaceholderText('Digite sua senha'), 'senha123');
//     fireEvent.changeText(screen.getByPlaceholderText('Confirme sua senha'), 'senha123');
    
//     fireEvent.press(screen.getByText('Criar conta'));

//     expect(Alert.alert).toHaveBeenCalledWith("Atenção", "Você precisa aceitar os termos e condições.");
//   });

//   it('mostra mensagem de erro para email inválido', () => {
//     render(<SignupForm />);
    
//     const emailInput = screen.getByPlaceholderText('Digite seu email');
//     fireEvent.changeText(emailInput, 'emailinvalido');

//     expect(screen.getByText("Dado incorreto. Revise e digite novamente.")).toBeTruthy();
//   });


// });