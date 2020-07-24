module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: ["plugin:react/recommended", "airbnb", "prettier"],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
    "react/jsx-filename-extension": "off",
    quotes: "off",
    "react/prop-types": "off",
    "react/jsx-props-no-spreading": "off",
    "react/button-has-type": "off",
    "import/order": "off",
    "import/order": "off",
    "no-unused-vars": "off",
    "no-underscore-dangle": "off",
    "spaced-comment": "off",
    "no-shadow": "warn",
    "react/no-array-index-key": "warn",
    "global-require": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "react/jsx-one-expression-per-line": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "consistent-return": "off",
    "react/self-closing-comp": "warn",
    "import/prefer-default-export": "warn",
    "react/jsx-curly-newline": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "react/jsx-equals-spacing": "off",
  },
};
