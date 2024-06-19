#!/bin/bash
#
# ABSTRACT: Script para executar o container renault_risk
#
# - O nome do container sera renault_risk
# - O container sera executado em background (--detach)
#
# Porque convinha que aquele, por cuja causa e por quem todas as coisas
# existem, conduzindo muitos filhos a gloria, aperfeicoasse, por meio de
# sofrimentos, o Autor da salvacao deles. Hebreus 2.10

# Functions >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function main () {

    # Args >>>>>>>>>>>>>>>>>>
    container_type="$1"
    container_memory="$2"
    image_name="$3"
    run_policy="$4"
    container_name="$5"
    port="$6"
    # <<<<<<<<<<<<<<<<<<<<<<<

    docker inspect --type=image "$image_name"
    if [ "$?" != "0" ]; then
        echo "ERRO: Imagem ${image_name} nao localizada..."
        exit 1
    fi

    host_name=$(hostname)
    memory_size="$container_memory"
    memory_swappiness=0
    shared_memory_size='2g'
    root_dir=$(get_root_dir)
    nr='/nr/renault_risk'

    case "$container_type" in
        dev)
            env_file="${root_dir}/etc/env.list.dev"
            ;;
        *)
            echo "ERRO: Opcao desconhecida: $container_type"
            echo "ERRO: Nao subiu o container"
            ;;
    esac

    if [ ! -e "$root_dir" ]; then
        echo "ERRO: Nao encontrou o dir ROOT: ${root_dir}"
        exit 1
    fi

    if [ ! -e "$env_file" ]; then
        echo "ERRO: Nao encontrou o arquivo ENV: ${env_file}"
        exit 1
    fi

    docker_command=""
    if [ "$container_type" == "dev" ]; then
        docker_command="${root_dir}/scripts/container/start_dev.sh"
    fi

    exec docker run \
        --security-opt='seccomp=unconfined' \
        --security-opt='apparmor=unconfined' \
        --memory="$memory_size" \
        --memory-swap="$memory_size" \
        --memory-swappiness="$memory_swappiness" \
        --shm-size="$shared_memory_size" \
        --env renault_risk_PORT="$port" \
        --env-file="$env_file" \
        --volume="${root_dir}":"${root_dir}" \
        --volume="${root_dir}/etc/csh.cshrc":'/etc/csh.cshrc' \
        --volume="$nr":'/nr' \
        --net='host' \
        --hostname="$host_name" \
        --ipc='host' \
        --init \
        --detach \
        "$run_policy" \
        --name="$container_name" \
        "$image_name" \
        $docker_command
}


function get_root_dir () {
    script_path="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"
    echo "$(dirname $(dirname ${script_path}))"
}


function usage() { 
    echo "Usage: $0 [-n <container name>] [-p <port number> [-t <dev|pd>] [-m <memory usage percentage: 10, 75...>] [-i <image>] [-r]" 1>&2; 
    exit 1; 
}

# <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

# Main >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

run_policy_arg='--restart=always'
while getopts ":n:p:t:m:i:r" o; do
    case "${o}" in
        n)
            container_name=${OPTARG}
            ;;
        p)
            port=${OPTARG}
            echo "$port" | egrep '^[0-9]+$' >/dev/null
            test $? -eq 0 || usage      
            ;;            
        t)
            t=${OPTARG}
            ((t == "dev" || t == "pd" || t == "test")) || usage
            ;;
        m)
            memory_percentage=${OPTARG}
            echo "$memory_percentage" | egrep '^[0-9]+[.]?[0-9]*$' >/dev/null
            test $? -eq 0 || usage            
            if [ $(echo "($memory_percentage < 1) || ($memory_percentage > 99.0)" | bc -l) -eq 1 ]; then
                echo "Range invalido para a memoria: ${memory_percentage}"
                usage
            fi
            physical_memory=$(free -g | grep -oP '\d+' | head -n 1)
            container_memory_value=$(echo "scale=2; ${physical_memory} * (${memory_percentage} / 100.0)" | bc -l | sed 's/^\./0./')
            container_memory="${container_memory_value}g"
            ;;
        i)
            i=${OPTARG}
            ;;
        r)
            run_policy_arg='--rm'
            ;;
        *)
            usage
            ;;
    esac
done
shift $((OPTIND-1))

if [ -z "${container_name}" ] || \
    [ -z "${port}" ] || \
    [ -z "${t}" ] || \
    [ -z "${container_memory}" ] || \
    [ -z "${i}" ] || \
    [ -z "${run_policy_arg}" ] ; then

    usage
fi

main $t $container_memory $i $run_policy_arg $container_name $port

# <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

# EOF
