// eslint.config.js
const { defineConfig } = require("eslint/config");
const expo = require("eslint-config-expo/flat");
const tseslint = require("typescript-eslint"); // ✅ importa o meta-pacote
const boundaries = require("eslint-plugin-boundaries");

module.exports = defineConfig([
  // Base do Expo (já habilita várias regras/plug-ins úteis)
  ...expo,

  // Conjuntos recomendados do TS-ESLint com type-check
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  {
    ignores: ["dist/**"],

    files: ["**/*.ts", "**/*.tsx"],

    plugins: {
      boundaries,
      // opcional: expõe o plugin explicitamente (os presets acima já o trazem)
      "@typescript-eslint": tseslint.plugin,
    },

    languageOptions: {
      // ✅ parser do TS-ESLint
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },

    settings: {
      "import/resolver": {
        typescript: { project: "./tsconfig.json" },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx", ".d.ts", ".json", ".svg"],
        },
      },
      "boundaries/elements": [
        { type: "domain", pattern: "src/domain/**" },
        { type: "application", pattern: "src/application/**" },
        { type: "infrastructure", pattern: "src/infrastructure/**" },
        { type: "presentation", pattern: "src/presentation/**" },
        { type: "shared", pattern: "src/shared/**" },
      ],
    },

    rules: {
      // ------- SEM ANY -------
      "@typescript-eslint/no-explicit-any": [
        "error",
        { fixToUnknown: true, ignoreRestArgs: false },
      ],

      // ------- SEM UNSAFE -------
      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unsafe-return": "error",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",

      // ------- BOAS PRÁTICAS TS -------
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports" },
      ],
      "@typescript-eslint/explicit-function-return-type": [
        "error",
        { allowExpressions: true, allowHigherOrderFunctions: true },
      ],
      "@typescript-eslint/no-misused-promises": [
        "error",
        { checksVoidReturn: { arguments: false } },
      ],
      "@typescript-eslint/ban-ts-comment": ["error", { "ts-ignore": true }],

      // Suas regras existentes
      "import/no-unresolved": "error",
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          js: "never",
          jsx: "never",
          ts: "never",
          tsx: "never",
          json: "never",
          svg: "never",
        },
      ],
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          message: "Quebrou as dependências da Clean Architecture.",
          rules: [
            { from: "presentation", allow: ["application", "domain", "shared"] },
            { from: "application", allow: ["domain", "shared"] },
            { from: "infrastructure", allow: ["application", "domain", "shared"] },
            { from: "domain", allow: ["shared"] },
            { from: "shared", allow: [] },
          ],
        },
      ],
    },
  },
]);
