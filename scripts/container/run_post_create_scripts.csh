#!/bin/csh -f
#
# ABSTRACT: Executa os scripts de Pos Instalacao no container
#
# "Mas ele foi traspassado pelas nossas transgressoes e moido pelas nossas
# iniquidades; o castigo que nos traz a paz estava sobre ele, e pelas
# suas pisaduras fomos sarados." Isaias 53.5

source /etc/csh.cshrc


"${APP_ROOT_DIR}/scripts/container/set_timezone.sh"
if ($status != 0) then
    echo "ERRO: Falhou no set_timezone.sh" 
    exit 1   
endif


"${APP_ROOT_DIR}/scripts/container/run_install.csh"
if ($status != 0) then
    echo "ERRO: Falhou no run_build.csh..." 
    exit 1   
endif


"${APP_ROOT_DIR}/scripts/container/run_build.csh"
if ($status != 0) then
    echo "ERRO: Falhou no run_build.csh..." 
    exit 1   
endif


# EOF
