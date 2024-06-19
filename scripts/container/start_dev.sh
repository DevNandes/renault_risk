#!/bin/bash

# Define o diretório do projeto
PROJECT_DIR="/home/renault/renault_risk/app_home/react"

# Navega para o diretório do projeto
cd $PROJECT_DIR

# Verifica se o módulo react-app-rewired está instalado
if [ ! -d "node_modules/react-app-rewired" ]; then
    echo "Módulo react-app-rewired não encontrado. Instalando dependências..."
    npm install --force
    if [ $? -eq 0 ]; then
        echo "Dependências instaladas com sucesso."
        echo "Aplicativo pronto para ser utilizado em: https://127.0.0.1:3080"
    else
        echo "Falha na instalação das dependências."
        exit 1
    fi
else
    echo "Módulo react-app-rewired encontrado. Continuando..."
fi

# Inicia o aplicativo
PORT=3081 npm run start:dev
