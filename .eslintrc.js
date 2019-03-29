module.exports = {
  'extends': 'airbnb',
  'parser': 'babel-eslint',
  'ecmaFeatures': {
    'experimentalDecorators': true,
  },
  'env': {
    'jest': true,
  },
  'rules': {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'func-names': {
      'generators': 'never'
    },
  },
  'globals': {
    "fetch": false
  }
}
