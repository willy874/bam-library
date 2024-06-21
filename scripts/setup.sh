RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color
PWD=$(pwd)
TARGET_NVM_VERSION="0.39.0"
TARGET_NODE_VERSION="v20.11.0"
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
  if ! [[ $NODE_INSTALLED_LIST =~ $TARGET_NODE_VERSION ]]; then
    echo -e "Installing Node.js version: ${BLUE}$TARGET_NODE_VERSION${NC}"
    nvm install $TARGET_NODE_VERSION
  fi
  NODE_VERSION=$(node -v)
  if ! [[ $NODE_VERSION =~ $TARGET_NODE_VERSION ]]; then
    echo -e "Setting Node.js version as default: ${BLUE}$TARGET_NODE_VERSION${NC}"
    nvm alias default $TARGET_NODE_VERSION
    nvm use
  fi
  echo -e "Node.js version: ${BLUE}$NODE_VERSION${NC}"
}

function create_pnpm() {
  # Chech if pnpm is installed and version is correct
  if ! command -v pnpm >/dev/null 2>&1 || ! [[ $(pnpm -v) =~ $TARGET_PNPM_VERSION ]]; then
    echo -e "Install pnpm: ${BLUE}$TARGET_PNPM_VERSION${NC}"
    npm install -g pnpm@$TARGET_PNPM_VERSION --verbose
  fi

  # Print pnpm version
  echo "PNPM Version: $(pnpm -v)"

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

# Refresh the shell environment
echo -e "${YELLOW}Refreshing shell environment...${NC}"
CURRENT_SHELL=$(basename "$SHELL")
if [ "$CURRENT_SHELL" == "bash" ]; then
  source ~/.bashrc
elif [ "$CURRENT_SHELL" == "zsh" ]; then
  source ~/.zshrc
fi
echo -e "${GREEN}Shell environment refreshed.${NC}"