# Token Storage - Gerenciamento Seguro de JWT

## 📋 Visão Geral

Este módulo implementa o gerenciamento seguro de tokens JWT seguindo os princípios de Clean Architecture.

## 🏗️ Arquitetura

```
src/
├── domain/auth/
│   └── TokenStorage.ts              # Interface (contrato)
├── infrastructure/persistence/
│   └── SecureTokenStorage.ts        # Implementação com expo-secure-store
└── presentation/hooks/
    └── useSecureToken.ts            # Hook customizado
```

## 🔐 Como Usar

### 1. Usar o Hook (Recomendado para componentes)

```typescript
import { useSecureToken } from '@presentation/hooks/useSecureToken';

function MyComponent() {
  const { saveToken, getToken, removeToken, hasToken } = useSecureToken();

  // Salvar token
  await saveToken('seu-jwt-token-aqui');

  // Recuperar token
  const token = await getToken();

  // Verificar se tem token
  const exists = await hasToken();

  // Remover token
  await removeToken();
}
```

### 2. Usar Diretamente o Serviço

```typescript
import { secureTokenStorage } from '@infrastructure/persistence/SecureTokenStorage';

// Salvar
await secureTokenStorage.saveToken('token');

// Recuperar
const token = await secureTokenStorage.getToken();

// Remover
await secureTokenStorage.removeToken();

// Verificar
const exists = await secureTokenStorage.hasToken();
```

## 🔄 Fluxo Automático no AuthContext

O token JWT é gerenciado automaticamente:

1. **Login**: Token é salvo automaticamente após login bem-sucedido
2. **Cadastro**: Token é salvo automaticamente após cadastro
3. **Logout**: Token é removido automaticamente

```typescript
// Em AuthContext.tsx
const login = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  
  // 🔐 Token é salvo automaticamente aqui
  const token = await userCredential.user.getIdToken();
  await secureTokenStorage.saveToken(token);
  
  return userCredential;
};
```

## 🔒 Segurança

- Tokens são armazenados usando `expo-secure-store`
- No iOS: Armazenado no Keychain
- No Android: Armazenado no Keystore com criptografia AES
- Chave de armazenamento: `@bytebank:jwt_token`

## 📝 Exemplo Completo

```typescript
import { useAuth } from '@presentation/state/AuthContext';
import { useSecureToken } from '@presentation/hooks/useSecureToken';

function ExampleComponent() {
  const { login } = useAuth();
  const { getToken } = useSecureToken();

  const handleLogin = async () => {
    // 1. Fazer login (token é salvo automaticamente)
    await login('user@example.com', 'password');
    
    // 2. Recuperar o token quando necessário
    const token = await getToken();
    
    // 3. Usar o token para chamadas de API
    fetch('https://api.example.com/data', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  };

  return (
    // Seu componente aqui
  );
}
```

## 🧪 Para Teste

Recuperar o token do Firebase e verificar se está armazenado:

```typescript
import { auth } from '@infrastructure/config/firebaseConfig';
import { useSecureToken } from '@presentation/hooks/useSecureToken';

const { getToken } = useSecureToken();

// Obter token do Firebase
const firebaseToken = await auth.currentUser?.getIdToken();
console.log('Token Firebase:', firebaseToken);

// Obter token armazenado
const storedToken = await getToken();
console.log('Token Armazenado:', storedToken);
