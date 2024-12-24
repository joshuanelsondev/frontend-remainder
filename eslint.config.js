import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import parser from "@babel/eslint-parser";

/** @type {import('eslint').Linter.Config'} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 2021,
      sourceType: "module",
      parser: parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        requireConfigFile: false,
        babelOptions: {
          presets: ["@babel/preset-react"],
        },
      },
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      "react/prop-types": "off",
      ...pluginJs.configs.recommended.rules,
      ...pluginReact.configs.recommended.rules,
      "import/no-unresolved": [2, { caseSensitive: true }],
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
];
