#!/bin/csh -f

# ABSTRACT: Script de instalacao de modulos nodejs
#
# "Mas ele foi traspassado pelas nossas transgressoes e moido pelas nossas
# iniquidades; o castigo que nos traz a paz estava sobre ele, e pelas
# suas pisaduras fomos sarados." Isaias 53.5

source /etc/csh.cshrc

set web_server_root_dir  = "${APP_ROOT_DIR}/app_home/web_server"
set package_lock_file = "${web_server_root_dir}/package-lock.json"
set yarn_lock_file = "${web_server_root_dir}/yarn.lock"

set react_root_dir = "${APP_ROOT_DIR}/app_home/react"
set react_package_lock_file = "${react_root_dir}/package-lock.json"
set react_yarn_lock_file = "${react_root_dir}/yarn.lock"


# Packages (1/2) >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

if (-f "$package_lock_file") then
    rm -f "$package_lock_file"
endif

if (-f "$yarn_lock_file") then
    rm -f "$yarn_lock_file"
endif

yarn install
if ($status == 0) then
        echo "Modulos globais instalados com sucesso"
else
        echo "Falhou na instalacao dos modulos globais: $status"
        exit 1
endif

cd "$web_server_root_dir" && yarn install
if ($status == 0) then
        echo "Dependencias do projeto (1/2) instaladas com sucesso"
else
        echo "Falhou na instalacao das dependencias do projeto (1/2): $status"
        exit 1
endif

# <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


# Packages (2/2) >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

if (-f "$react_package_lock_file") then
    rm -f "$react_package_lock_file"
endif

if (-f "$react_yarn_lock_file") then
    rm -f "$react_yarn_lock_file"
endif

cd "$react_root_dir" && yarn cache clean --all && yarn install
if ($status == 0) then
        echo "Dependencias do projeto (2/2) instaladas com sucesso"
else
        echo "Falhou na instalacao das dependencias do projeto (2/2): $status"
        exit 1
endif

# <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

# EOF
