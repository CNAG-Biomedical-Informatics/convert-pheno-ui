grep -E "^\s*image:" docker-compose.yml | awk '{print $2}' | sort | uniq > used_docker_imgs.txt
