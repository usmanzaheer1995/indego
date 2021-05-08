module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint"
  ],
  extends: ['airbnb-typescript/base'],
  parserOptions: {
    project: './tsconfig.eslint.json'
  },
  rules: {
    "linebreak-style": "off",
    "import/no-extraneous-dependencies": "off",
    "@typescript-eslint/no-unused-vars": "warn",
    "import/prefer-default-export": "off",
    "@typescript-eslint/no-useless-constructor": "off",
    "class-methods-use-this": "off",
    "no-param-reassign": "off",
    "no-underscore-dangle": "off"
  }
};
