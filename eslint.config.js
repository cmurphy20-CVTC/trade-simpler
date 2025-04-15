import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "module",
      ecmaVersion: "latest",
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-constant-condition": "warn",
      "no-duplicate-imports": "error",
      "no-template-curly-in-string": "error",
      "no-use-before-define": ["error", { functions: false }],
      "prefer-const": "warn",
      "prefer-template": "warn",
      "require-await": "warn",
    },
  },
  prettier, // This must be the last configuration in the array
];
