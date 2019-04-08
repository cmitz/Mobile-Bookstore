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
    'eol-last': ["error", "always"],
    'no-multiple-empty-lines': ["error", { "max": 2, "maxEOF": 1 }],
    'import/prefer-default-export': 'off',
    'react/prefer-stateless-function': 'off',
    'no-param-reassign': 'off'
  },
  'globals': {
    "fetch": false
  }
}
