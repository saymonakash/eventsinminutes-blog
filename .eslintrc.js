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
  languageOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    globals: {
      ...global.browser,
      ...global.node,
      myCustomGlobal: 'readonly',
    },
  },
}
