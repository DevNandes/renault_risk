#!/bin/bash

# ABSTRACT: Build do app
#
# "Mas ele foi traspassado pelas nossas transgressoes e moido pelas nossas
# iniquidades; o castigo que nos traz a paz estava sobre ele, e pelas
# suas pisaduras fomos sarados." Isaias 53.5

nx_dir=/home/renault/nx2/var/www/html/renault_risk/
build_dir=/tmp/build/

echo "Copiando arquivos do build para o nx2"

if [ ! -d "$build_dir" ]; then
	echo "O diretorio ${build_dir} nao existe, ou seja, o build nao foi executado corretamente"
	exit 1
fi

if [ ! -d "$nx_dir" ]; then
	echo "O diretorio ${nx_dir} nao existe, nao sera possivel copiar o build"
	exit 1
fi

rm -Rf $nx_dir*

mv $build_dir* $nx_dir

echo "Build copiado com sucesso para ${nx_dir}"

# EOF
