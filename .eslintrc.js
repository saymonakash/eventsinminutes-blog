module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
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
}
