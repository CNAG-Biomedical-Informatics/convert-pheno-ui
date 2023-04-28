echo "delete junit reports"
rm cypress/reports/junit/*.xml || true
echo "delete mocha reports"
rm cypress/reports/mocha/*.json || true