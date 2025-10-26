# byte-bank-platform (Expo) — Clean Architecture

Aplicativo **Expo + React Native (TypeScript)** usando **Expo Router** e **Clean Architecture**:

- **Domain**: entidades, contratos e regras de negócio puras (sem dependências externas)
- **Application**: casos de uso / orquestração
- **Infrastructure**: integrações externas (ex.: Firebase) e configs
- **Presentation**: UI/State (telas, componentes, estilos)

> Este projeto foi migrado de **Feature-first** para **Clean Architecture** em `feature/migrate-clean-architecture`.

---

## Sumário
- [Requisitos](#requisitos)
- [Instalação e execução](#instalação-e-execução)
- [Scripts](#scripts)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Roteamento (Expo Router)](#roteamento-expo-router)
- [Aliases de import](#aliases-de-import)
- [SVGs no React Native](#svgs-no-react-native)
- [Config Firebase](#config-firebase)
- [Páginas](#páginas)
- [Padrões de código](#padrões-de-código)
- [GitFlow (ramificação)](#gitflow-ramificação)

---

## Requisitos
- Node LTS
- Expo CLI (`npx expo`)
- Android Studio / Xcode (se for rodar em emuladores)

---

## Instalação e execução

```bash
npm install
npx expo start
```

Atalhos:
- `npm run web` — abrir no browser
- `npm run android` — abrir no emulador Android
- `npm run ios` — abrir no simulador iOS

---

## Scripts

```bash
npm run web
npm run android
npm run ios
npm test
npm run lint
```

---

## Estrutura de pastas

```
app/                      # Rotas (file-based routing do Expo Router)
  _layout.tsx
  (private)/
    minha-conta.tsx
  # ...demais rotas finas que apenas importam telas de src/presentation

src/
  domain/
    entities/
    repositories/
    value-objects/
  application/
    usecases/
  infrastructure/
    config/
      firebaseConfig.ts
    services/
  presentation/
    screens/
      Dashboard/
        DashboardScreen.tsx
        DashboardScreen.styles.ts
      MinhaConta/
        MinhaContaScreen.tsx
        MinhaContaScreen.styles.ts
      # ...
    components/
      # componentes de UI (cards, buttons, etc.)
    state/
      # contexts, hooks
    theme/
      tokens.ts

assets/
  images/
  fonts/

babel.config.js
metro.config.js
tsconfig.json
declarations.d.ts
```

> **Observação:** os arquivos em `app/` são **finos** — apenas exportam as telas de `src/presentation/...`.

---

## Roteamento (Expo Router)

- Tudo que está em `app/` vira rota.
- Layout principal em `app/_layout.tsx`.
- Exemplo de arquivo de rota fino:

```ts
// app/(private)/minha-conta.tsx
export { default } from '../../src/presentation/screens/MinhaConta/MinhaContaScreen';
```

---

## Aliases de import

Configurados via **babel-plugin-module-resolver** e **tsconfig paths**.

### `babel.config.js`
```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'expo-router/babel',
      ['module-resolver', {
        root: ['./'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json', '.svg'],
        alias: {
          '@': './',
          '@assets': './assets',
          '@domain': './src/domain',
          '@application': './src/application',
          '@infrastructure': './src/infrastructure',
          '@presentation': './src/presentation',
          '@shared': './src/shared'
        }
      }],
      'react-native-reanimated/plugin',
    ],
  };
};
```

### `tsconfig.json`
```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["*"],
      "@assets/*": ["assets/*"],
      "@domain/*": ["src/domain/*"],
      "@application/*": ["src/application/*"],
      "@infrastructure/*": ["src/infrastructure/*"],
      "@presentation/*": ["src/presentation/*"],
      "@shared/*": ["src/shared/*"]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts",
    "declarations.d.ts"
  ]
}
```

> Após alterações de alias, rode com cache limpo: `npx expo start -c`.

---

## SVGs no React Native

Instale e configure:

```bash
npm i react-native-svg react-native-svg-transformer
```

`metro.config.js`:
```js
const { getDefaultConfig } = require('expo/metro-config');
const config = getDefaultConfig(__dirname);
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');
config.resolver.assetExts = config.resolver.assetExts.filter((ext) => ext !== 'svg');
config.resolver.sourceExts = [...config.resolver.sourceExts, 'svg'];
module.exports = config;
```

`declarations.d.ts`:
```ts
declare module '*.svg' {
  import * as React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps & { title?: string }>;
  export default content;
}
```

Uso:
```tsx
import Logo from '@assets/images/logo.svg';
<Logo width={120} height={40} />
```

---

## Config Firebase

Arquivo: `src/infrastructure/config/firebaseConfig.ts`

```ts
export const firebaseConfig = {
  apiKey: 'api-key',
  authDomain: 'authDomain',
  projectId: 'projectId',
  storageBucket: 'storageBucket',
  messagingSenderId: 'messagingSenderId',
  appId: 'appId',
};
```

> As chaves são fornecidas no console do Firebase (Configurações do projeto).

---

## Páginas

- Home `/`
- Dashboard `/dashboard`
- Meus cartões `/meus-cartoes`
- Investimentos `/investments`
- Outros serviços `/outros-servicos`
- Minha conta `/minha-conta`
- Cadastro `/cadastro`
- Esqueci a senha `/esqueci-senha`

---

## Padrões de código

- Componentes em **PascalCase**; telas terminam com `*Screen.tsx`.
- Estilos locais com `StyleSheet`; tokens globais em `src/presentation/theme/tokens.ts`.
- Evitar “god components”—mantenha cada camada isolada (Domain/Application/Infrastructure/Presentation).

---

## GitFlow (ramificação)

- **main**: produção
- **develop**: integração contínua
- **feature/***: novas funcionalidades
- **release/***: preparação de release
- **hotfix/***: correções urgentes em produção

Comandos básicos (exemplo):

```bash
git checkout main && git pull
git checkout -b develop && git push -u origin develop
git checkout -b feature/migrate-clean-architecture
# ... commits ...
git push -u origin feature/migrate-clean-architecture
```
# byte-bank-clean-architecture
