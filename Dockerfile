FROM node:20.11-bookworm

RUN apt update -y && export DEBIAN_FRONTEND=noninteractive && apt install -y \
    build-essential \
    vim \
    vim-scripts \
    tcsh \
    && rm -Rf /var/lib/apt/lists/*

ENTRYPOINT ["/home/renault/renault_risk/scripts/container/docker-entrypoint.sh"]
CMD ["/home/renault/renault_risk/scripts/container/start_app.csh"]
