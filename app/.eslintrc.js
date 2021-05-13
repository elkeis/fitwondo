module.exports = {
  env: {
    browser: true
  },
  extends: 'xo',
  rules: {
    'indent': [2, 2, {
      SwitchCase: 1
    }],
    'space-before-function-paren': [2, 'never'],
    'valid-jsdoc': [2, {
      requireReturn: false,
      prefer: {
        returns: 'return'
      }
    }],
    'max-len': [1, 80, 4, {
      ignoreComments: true,
      ignoreUrls: true
    }]
  }
};
