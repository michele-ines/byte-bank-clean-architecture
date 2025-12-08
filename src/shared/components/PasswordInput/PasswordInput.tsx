import { Feather } from "@expo/vector-icons";
import { colors } from "@presentation/theme";
import React, { useCallback, useState } from "react";
import {
  Pressable,
  Text,
  TextInput,
  type TextInputProps,
  View,
  type ViewStyle,
} from "react-native";
import { styles } from "./PasswordInput.styles";

interface PasswordInputProps extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  error?: string;
  containerStyle?: ViewStyle;
  label?: string;
  showLabel?: boolean;
}

/**
 * Componente de input de senha com toggle de visibilidade
 * 
 * @example
 * ```tsx
 * <PasswordInput
 *   value={password}
 *   onChangeText={setPassword}
 *   label="Senha"
 *   error={passwordError}
 *   placeholder="Digite sua senha"
 * />
 * ```
 * 
 * Hooks utilizados:
 * - useState: Gerencia o estado de visibilidade da senha
 * - useCallback: Memoriza a função de toggle para evitar recriações
 */
export const PasswordInput: React.FC<PasswordInputProps> = ({
  value,
  onChangeText,
  error,
  containerStyle,
  label,
  showLabel = true,
  placeholder = "Digite sua senha",
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleTogglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <View style={containerStyle}>
      {showLabel && label && <Text style={styles.label}>{label}</Text>}
      
      <View style={styles.passwordContainer}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          style={[
            styles.input,
            styles.passwordInput,
            error ? styles.inputError : null,
          ]}
          secureTextEntry={!showPassword}
          {...rest}
        />
        
        <Pressable
          onPress={handleTogglePasswordVisibility}
          style={styles.eyeIcon}
          accessibilityLabel={showPassword ? "Ocultar senha" : "Mostrar senha"}
          accessibilityRole="button"
          accessibilityHint="Toque para alternar a visibilidade da senha"
        >
          <Feather
            name={showPassword ? "eye-off" : "eye"}
            size={20}
            color={colors.byteGray450}
          />
        </Pressable>
      </View>

      {error ? (
        <Text style={styles.errorText} accessibilityLiveRegion="polite">
          {error}
        </Text>
      ) : null}
    </View>
  );
};
