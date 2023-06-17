require('dotenv').config();
const scanner = require('sonarqube-scanner');
scanner(
  {
    serverUrl: "http://localhost:9000",
    token : process.env.SONAR_TOKEN,
  },
  () => process.exit()
);
