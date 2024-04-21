module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'react/react-in-jsx-scope': 'off',
        'react-native/no-inline-styles': 'off',
        'react/self-closing-comp': 'off',
        'no-trailing-spaces': 'on',
        'prettier/prettier': [
          'error',
          {
            useTabs: false,
            endOfLine: 'auto',
            jsxBracketSameLine: true, 
          },
        ],
      },
    },
  ],
};
