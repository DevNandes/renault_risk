# DESCRICAO

Configuracao do software Cirnet 2.0.

## CONFIGURACAO DO DOCKER

### CRIACAO DA IMAGEM

```bash

cd /home/renault/
git clone [URL] 
cd /home/renault/renault_risk

docker build -t renault_risk:latest .

sudo /home/renault/renault_risk/scripts/host/create_dirs.pl

# 1. Ajusta o start_app.csh para nao rodar o node ainda
make run_dev
make post_create
# Caso o post_create nao seja executado com sucesso, remova o container, execute-o novamente, e então dentro dele, realize os seguintes comandos:
# cd /home/renault/renault_risk/app_home/react
# yarn cache clean
# rm -rf node_modules
# npm install
# yarn build

# No host: Salvar a imagem
# Importante: utilizar o id do container nos comandos commit
docker commit --message='Save image' `docker ps -aqf "name=renault_risk"` renault_risk:latest
docker images

docker image inspect -f {{.Config.Cmd}} renault_risk:latest
docker image history renault_risk:latest

mkdir /home/renault/images
docker save renault_risk:latest | gzip > /home/renault/images/renault_risk.tar.gz
# 2. Retorna o start_app.csh ao estado original

docker exec -it renault_risk tcsh

echo $REACT_APP_API_EWS_URL
echo $REACT_APP_API_RWS_URL
echo $NODE_ENV

```

### CRIACAO DO CONTAINER DEV

```bash

# Na estacao DEV  >>>>>>>
ssh-copy-id USER@HOST
ssh USER@HOST
# <<<<<<<<<<<<<<<<<<<<<<<

# Na estacao de destino >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
sudo mkdir -p /home/renault/images
sudo mkdir -p /home/renault/renault_risk
sudo chown -R $USER:$USER /home/renault/renault_risk
sudo chmod -R 0775 /home/renault/renault_risk
# <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

# Na estacao DEV >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
cd /home/renault/renault_risk
make push_image user=USER host=HOST  # USER / HOST na estacao remota

# PD ou TESTE
make deploy user=USER host=HOST      # USER / HOST na estacao remota
# <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

# A partir daqui, as acoes devem ser executadas na estacao remota de destino
docker load < /home/renault/images/renault_risk.tar.gz
docker images
docker ps -a

cd /home/renault/renault_risk
sudo ./scripts/host/create_dirs.pl

# DEV >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
make run_dev
make post_create
make build
# <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

docker ps
docker stats # Conferir a memoria

docker exec -it renault_risk tcsh

echo $REACT_APP_API_RWS_URL
echo $NODE_ENV

# Log: logrotate
sudo cp /home/renault/renault_risk/etc/logrotate.d/renault_risk /etc/logrotate.d/
sudo chmod 0644 /etc/logrotate.d/renault_risk
sudo logrotate -d /etc/logrotate.d/renault_risk
sudo logrotate /etc/logrotate.d/renault_risk

# Liberar portas (Debian)
sudo ufw allow 3080/tcp
sudo ufw allow 3083/tcp

```

### DEMAIS ACOES

O comando build eh executado no momento da criacao da imagem, 
pelo comando `make post_create`. 

Eh necessario fazer um novo build para que alteracoes feitas no codigo 
sejam consideradas pelo app em execucao. 
Para se fazer um build em um container em execucao, utiliza-se o 
comando `make build`, que faz o build a partir do host.
Para fazer o build a partir do container o comando deve ser
`make build_in_container`.

Para importar alteracoes feitas pelo Senai, utiliza-se o comando
`make import host=HOST user=USER`. 
Parte-se do principio que o diretorio `/home/renault/renault_risk_senai`, 
do host indicado no comando, esta atualizado com o repositorio do Senai. 
Somente o cir87 tem as chaves ssh para fazer push e pull do repositorio do Senai.

Para instalar as dependencias do app, utiliza-se o comando
`make install`.

Se desejar desenvolver a partir do container, eh necessario importar 
as chaves ssh para o container e instalar o git no container.
O comando `make dev_env` executa estas acoes.

Para verificar todos os targets disponiveis no `Makefile`, executar o 
comando `make help`.