#!/bin/bash

# ABSTRACT: Configuracoes para container DEV

# "Mas ele foi traspassado pelas nossas transgressoes e moido pelas nossas
# iniquidades; o castigo que nos traz a paz estava sobre ele, e pelas
# suas pisaduras fomos sarados." Isaias 53.5


function main () {

    container_name="$1"

    # Tratar dos pares de chave ssh >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    docker cp "${HOME}/.ssh/" "${container_name}:/root/"
    docker exec "$container_name" sh -c "chown -R root:root /root/.ssh"
    docker exec "$container_name" sh -c "chmod 0700 /root/.ssh"
    docker exec "$container_name" sh -c "chmod 0644 /root/.ssh/id_rsa.pub"
    docker exec "$container_name" sh -c "chmod 0600 /root/.ssh/id_rsa"

    if [ -e "${HOME}/.ssh/config" ]; then
	    docker exec "$container_name" sh -c "chmod 0644 /root/.ssh/config"
    fi

    if [ -e "${HOME}/.ssh/authorized_keys" ]; then
	    docker exec "$container_name" sh -c "chmod 0600 /root/.ssh/authorized_keys"
    fi

    if [ -e "${HOME}/.ssh/known_hosts" ]; then
	    docker exec "$container_name" sh -c "chmod 0600 /root/.ssh/known_hosts"
    fi
    # <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


    # Git >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    docker exec "$container_name" sh -c "dnf update -y && dnf install -y git"

    # Define o user name do git para o hostname, apenas para identificar melhor
    docker exec "$container_name" sh -c "git config --global user.name `hostname`"
    # <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


}


function usage() { 
    echo "Usage: $0 [-n <container name>]" 1>&2;
    exit 1; 
}


# Main >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

container_name='renault_risk'
while getopts ":n:" o; do
    case "${o}" in
        n)
            container_name=${OPTARG}
            ;;
        *)
            usage
            ;;
    esac
done
shift $((OPTIND-1))

if [ -z "${container_name}" ] ; then
    usage
fi

main $container_name

# <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

# EOF
