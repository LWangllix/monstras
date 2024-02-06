const withTranspile = require('next-transpile-modules')(['ol', 'bpmn-js', 'bpmn-js-properties-panel']);
module.exports = withTranspile({
  reactStrictMode: true,
  env: {
    DB_HOST: 'localhost'
  }
});


