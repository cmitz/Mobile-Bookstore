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
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'func-names': ['error', 'always', {
      'generators': 'never'
    }],
  },
  'globals': {
    "fetch": false
  }
}
