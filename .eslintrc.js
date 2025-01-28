export default {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  globals: {
    myCustomGlobal: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  extends: [
    '@nuxtjs',
    'plugin:vue/vue3-essential',
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'plugin:prettier/recommended', // Add this line
  ],
  plugins: ['vue', 'prettier'],
  // add your custom rules here
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        semi: false,
      },
    ],
  },
}
