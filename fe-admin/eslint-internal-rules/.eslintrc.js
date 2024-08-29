module.exports = {
  rules: {
    indent: ['error', 2, {
      SwitchCase: 0,
    }],
  },
  overrides: [
    {
      files: ['*.json'],
      rules: {
        'no-invalid-meta': 'off',
        'indent': ['error', 2, {
          SwitchCase: 0,
        }],
      },
    },
  ],
}
