import nextPlugin from "@next/eslint-plugin-next";

import base from "./index.js";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  ...base,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    plugins: { "@next/next": nextPlugin },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
    },
  },
];
