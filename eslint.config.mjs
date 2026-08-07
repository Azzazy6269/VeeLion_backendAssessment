import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs}"], 
    plugins: { js }, 
    extends: ["js/recommended"], 
    languageOptions: { globals: globals.node },
    rules: {
      "no-undef": "error",
      "no-unused-vars": "warn"
    }
  },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
]);
