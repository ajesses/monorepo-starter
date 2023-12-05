import antfu from '@antfu/eslint-config'

export default await antfu(
  {
    rules: {
      'no-console': ['error', { allow: ['log', 'warn'] }],
      'array-callback-return': 'off',
      'vue/no-useless-v-bind': 'off',
      'vue/no-mutating-props': 'off',
      'indent': ['error', 2, { SwitchCase: 1 }],
      'quotes': ['error', 'single'],
      'no-undef': 0,
    },
  },
)
