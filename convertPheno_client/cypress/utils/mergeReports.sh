echo "merge junit reports"
jrm cypress/reports/junit_merged.xml cypress/reports/junit/*.xml
mv cypress/reports/junit_merged.xml testing/output/.
echo "merge mocha reports"
mochawesome-merge cypress/reports/mocha/*.json > cypress/reports/mocha_merged.json
echo "generate mochawesome report"
marge cypress/reports/mocha_merged.json --reportDir testing/output/. --inline
echo "merge coverage"
node ./testing/utils/mergeCoverage.js
