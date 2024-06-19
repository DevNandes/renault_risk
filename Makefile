# ABSTRACT: renault_risk
#
# make help
#

.PHONY: all run_pd run_dev install build build_in_docker post_create import deploy dev_env push push_image deploy_test develop commit help

CONTAINER ?= renault_risk

ROOT_DIR := $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST))))


# target: all - Executa o container de producao
all: run_dev


# target: run - Executa o container de producao, name=renault_risk, type=pd, image=renault_risk:latest, mem=20
run_pd:
	exec $(ROOT_DIR)/scripts/host/run_container.sh -n $(CONTAINER) -t pd -m 50 -i renault_risk:latest -p 3081


# target: run_test - Executa o container test, name=renault_risk, type=test, image=renault_risk:latest, mem=20
run_test:
	exec $(ROOT_DIR)/scripts/host/run_container.sh -n $(CONTAINER) -t test -m 40 -i renault_risk:latest -p 3081


# target: run_dev - Executa o container dev, name=renault_risk, type=dev, image=renault_risk:latest, mem=20
run_dev:
	exec $(ROOT_DIR)/scripts/host/run_container.sh -n $(CONTAINER) -t dev -m 40 -i renault_risk:latest -p 3081

# target: install - Instala os modulos nodejs
install:
	docker exec $(CONTAINER) $(ROOT_DIR)/scripts/container/run_install.csh


# target: build - Compila e copia os arquivos para o nginx a partir do host
build:
	docker exec $(CONTAINER) $(ROOT_DIR)/scripts/container/run_build.csh


# target: build - Compila e copia os arquivos para o nginx a partir do container
build_in_docker:
	$(ROOT_DIR)/scripts/container/run_build.csh


# target: post_install - Acoes pos criacao do container
post_create:
	docker exec $(CONTAINER) $(ROOT_DIR)/scripts/container/run_post_create_scripts.csh


# target: import - Importa os arquivos do repositorio do Senai
import: guard-user guard-host
	$(ROOT_DIR)/scripts/host/import_source.sh -u $(user) -h $(host)


# target: deploy - Deploy do projeto para um host remoto
deploy: guard-user guard-host
	$(ROOT_DIR)/scripts/host/deploy_app.sh -u $(user) -h $(host)


# target: push_image - Copia a imagem para um host remoto
push_image: guard-user guard-host
	rsync -v /home/renault/images/renault_risk.tar.gz $(user)@$(host):/home/renault/images/


# target: dev_env - Configura o ambiente de desenv (ssh keys, git)
dev_env:
	$(ROOT_DIR)/scripts/host/set_dev_env.sh -n $(CONTAINER)

# target: push - Push para os repositorios remotos do Git (especificar branch)
push:
	git push local $(branch)
	git push github $(branch)


# target: deploy_test - Atualiza o servidor de testes
deploy_test:
	docker rm --force renault_risk && \
	make run_test && \
	make build && \
	$(ROOT_DIR)/scripts/host/deploy_app.sh -u develop -h 192.168.1.20 && \
	docker rm --force renault_risk && \
	make run_dev && \
	make build

# target: deploy_pd - Atualiza o servidor de testes
deploy_pd:
	docker rm --force renault_risk && \
	make run_pd && \
	make build && \
	$(ROOT_DIR)/scripts/host/deploy_app.sh -u develop -h 192.168.1.103 && \
	docker rm --force renault_risk && \
	make run_dev && \
	make build

# target: commit - Executa 'git add .', 'git commit -a', 'make push'
commit:
	git add .
	git commit -a
	git push local $(branch)
	git push github $(branch)
	git status


# target: guard-% - Aborta se a variavel especificada nao estiver definida
guard-%:
	@ if [ "${${*}}" = "" ]; then \
		echo "Variavel $* indefinida"; \
		exit 1; \
	fi

# target: help - Mostra os targets que sao executaveis
help:
	@egrep "^# target:" [Mm]akefile


# EOF
