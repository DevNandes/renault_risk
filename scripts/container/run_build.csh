#!/bin/csh -f

# ABSTRACT: Build do app
#
# "Mas ele foi traspassado pelas nossas transgressoes e moido pelas nossas
# iniquidades; o castigo que nos traz a paz estava sobre ele, e pelas
# suas pisaduras fomos sarados." Isaias 53.5

source /etc/csh.cshrc

set app_dir = "${APP_ROOT_DIR}/app_home/react"


if (-d "${app_dir}/build") then
	rm -Rf "${app_dir}/build"
	mkdir -p "${app_dir}/build"
endif


cd "$app_dir" && yarn run build
if ($status == 0) then
	echo "Build do app finalizado"
else
	echo "Falhou ao acessar ${app_dir} e fazer o build: $status"
	exit 1
endif	


# EOF
