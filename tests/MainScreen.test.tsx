import HomeScreen from "@/src/features/main/MainScreen";
import { render, screen } from '@testing-library/react-native';
import React from 'react';


jest.mock('@/src/features/auth/LoginForm', () => {
  
  const { View, Text } = require('react-native');
  return {
    LoginForm: () => (
      <View>
        <Text>MockLoginForm</Text>
      </View>
    ),
  };
});

describe('<MainScreen />', () => {
  it('deve renderizar o componente LoginForm', () => {
    render(<HomeScreen />);

    const loginForm = screen.getByText('MockLoginForm');
    
    expect(loginForm).toBeTruthy();
  });
});