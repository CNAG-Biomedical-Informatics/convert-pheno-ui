docker run --rm --net host -e SONAR_HOST_URL="http://localhost:9000" \
	-v ${PWD}:/usr/src sonarsource/sonar-scanner-cli \
	-D"sonar.login=${SONAR_TOKEN}"
