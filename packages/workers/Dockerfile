ARG BASE_IMAGE=python:3.8-slim-buster
FROM ${BASE_IMAGE}

ENV APP_PATH=/app
ENV SRC_CORE_PATH=packages/internal/core
ENV DEST_CORE_PATH=$APP_PATH/$SRC_CORE_PATH
ENV SRC_WORKERS_PATH=packages/workers
ENV DEST_WORKERS_PATH=$APP_PATH/$SRC_WORKERS_PATH

RUN apt-get update && apt-get install -y wget gnupg curl unzip make xz-utils

RUN \
  echo "deb https://deb.nodesource.com/node_16.x buster main" > /etc/apt/sources.list.d/nodesource.list && \
  wget -qO- https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add - && \
  apt-get update && \
  apt-get install -yqq nodejs && \
  pip install -U pip==21.3.1 && pip install pdm==2.1.1 && \
  npm i -g npm@^8 nx@^15.4.5 pnpm@^7.25.0 && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /pkgs
COPY packages/workers/pdm.lock packages/workers/pyproject.toml packages/workers/.pdm.toml /pkgs/
RUN pdm sync

WORKDIR $APP_PATH
COPY package.json pnpm*.yaml $APP_PATH/
COPY $SRC_CORE_PATH/package.json $DEST_CORE_PATH/
COPY $SRC_WORKERS_PATH/package.json $DEST_WORKERS_PATH/
RUN pnpm install --include-workspace-root --frozen-lockfile --filter=core --filter=workers

COPY nx.json tsconfig* jest* babel* .eslintrc* .prettier* $APP_PATH/
COPY $SRC_CORE_PATH $DEST_CORE_PATH/
COPY $SRC_WORKERS_PATH $DEST_WORKERS_PATH/
RUN chmod +x $DEST_WORKERS_PATH/scripts/*.sh

ENV PYTHONPATH=/pkgs/__pypackages__/3.8/lib \
    PATH=$PATH:/pkgs/__pypackages__/3.8/bin

WORKDIR $DEST_WORKERS_PATH

CMD nx serve workers