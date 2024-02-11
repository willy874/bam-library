RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m'
PWD=$(pwd)
TARGET_NVM_VERSION="0.39.0"
TARGET_NODE_VERSION="20.11.0"
TARGET_PNPM_VERSION="8.15.1"

function create_nvm() {
  if ! [ -s "$HOME/.nvm/nvm.sh" ]; then
    echo -e "Create nvm bin: ${BLUE}$HOME/.nvm${NC}"
    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v$TARGET_NVM_VERSION/install.sh | bash
  fi
  [ -s "$HOME/.nvm/nvm.sh" ] && \. "$HOME/.nvm/nvm.sh"
  [ -s "$HOME/.nvm/bash_completion" ] && \. "$HOME/.nvm/bash_completion"
  NVM_VERSION=$(nvm --version)
  echo -e "nvm version: ${BLUE}v$NVM_VERSION${NC}"
}

function create_nodejs() {
  NODE_INSTALLED_LIST=$(nvm ls)
  if ! [[ $NODE_VERSION =~ $TARGET_NODE_VERSION ]]; then
    nvm install $TARGET_NODE_VERSION
  fi
  NODE_VERSION=$(node -v)
  if ! [[ $NODE_INSTALLED_LIST =~ $TARGET_NODE_VERSION ]]; then
    nvm alias default $TARGET_NODE_VERSION
    nvm use default
  fi
  echo -e "Node.js version: ${BLUE}$NODE_VERSION${NC}"
}

function create_pnpm() {
  PNPM_VERSION=$(pnpm -v)
  if ! [ -s "$HOME/.nvm/versions/node/v$TARGET_NODE_VERSION/bin/pnpm"] && [[ $PNPM_VERSION =~ $TARGET_PNPM_VERSION ]]; then
    npm install -g pnpm@$TARGET_PNPM_VERSION
  fi
  pnpm reinstall
}

function handle_error() {
  echo -e "${RED}Error occurred.${NC}"
}

function setup() {
  create_nvm
  trap 'handle_error' ERR
  create_nodejs
  create_pnpm
  \. "$PWD/scripts/build.sh"
  echo -e "${GREEN}Setup completed.${NC}"
  trap - ERR
}

setup
