#!/bin/csh -f

# ABSTRACT: Script de inicializacao do app
#
# "Mas ele foi traspassado pelas nossas transgressoes e moido pelas nossas
# iniquidades; o castigo que nos traz a paz estava sobre ele, e pelas
# suas pisaduras fomos sarados." Isaias 53.5

source /etc/csh.cshrc

# 1: Via nginx (NAO UTILIZADO)
#exec nginx -g 'daemon off;'

# 2: Via nodejs
exec node /home/renault/renault_risk/app_home/web_server/server.js

# 3: Somente loop
#exec sh -c "while true; do sleep 1; done"

# EOF
