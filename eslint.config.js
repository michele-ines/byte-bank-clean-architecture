const { defineConfig } = require("eslint/config");
const expo = require("eslint-config-expo/flat");
const tseslint = require("typescript-eslint");
const boundaries = require("eslint-plugin-boundaries");

module.exports = defineConfig([
  ...expo,

  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "coverage/**", 
      "babel.config.js",
      "metro.config.js",
      "jest.config.js",
      "eslint.config.js",
    ],
  },

  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
    },
  },

  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  {
    files: ["**/*.ts", "**/*.tsx"],

    plugins: {
      boundaries,
      "@typescript-eslint": tseslint.plugin,
    },

    languageOptions: {
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
          extensions: [".js", ".jsx", ".ts", ".tsx", ".json", ".svg"],
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
      "@typescript-eslint/no-explicit-any": [
        "error",
        { fixToUnknown: true, ignoreRestArgs: false },
      ],

      "@typescript-eslint/no-unsafe-assignment": "error",
      "@typescript-eslint/no-unsafe-return": "error",
      "@typescript-eslint/no-unsafe-call": "error",
      "@typescript-eslint/no-unsafe-member-access": "error",

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

      "import/no-unresolved": "error",
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          ts: "never",
          tsx: "never",
          js: "never",
          jsx: "never",
          json: "never",
          svg: "never",
        },
      ],
    },
  },

  {
    files: ["**/*.test.ts", "**/*.test.tsx", "**/*.spec.ts", "**/*.spec.tsx"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
]);
