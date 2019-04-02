module.exports = {
  'extends': 'airbnb',
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaFeatures': {
      'legacyDecorators': true
    }
  },
  'env': {
    'jest': true,
  },
  'rules': {
    'class-methods-use-this': 'off',
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'global-require': 'warn',
    'func-names': ['error', 'always', {
      'generators': 'never'
    }],
  },
  'globals': {
    "fetch": false
  }
}
