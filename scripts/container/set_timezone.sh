#!/bin/bash

# ABSTRACT: Ajusta o timezone para America/Sao_Paulo

# "Mas ele foi traspassado pelas nossas transgressoes e moido pelas nossas
# iniquidades; o castigo que nos traz a paz estava sobre ele, e pelas
# suas pisaduras fomos sarados." Isaias 53.5

rm -Rf /etc/localtime
if [ "$?" == "0" ]; then
    echo "Arquivo /etc/localtime removido com sucesso"
else
    echo "ERRO: Falhou na remocao do /etc/localtime"
fi

ln -s /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime
if [ "$?" == "0" ]; then
    echo "Link para o zoneinfo Sao_Paulo criado com sucesso"
else
    echo "ERRO: Falhou na criacao do link para o zoneinfo Sao_Paulo"
fi

# EOF
