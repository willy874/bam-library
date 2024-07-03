#!/bin/bash

# Load nvm if available
if [ -s "$HOME/.nvm/nvm.sh" ]; then
    source "$HOME/.nvm/nvm.sh"
else
    echo -e "${RED}nvm not found. Please ensure nvm is installed and available.${NC}"
    exit 1
fi

nvm use 20.11
npm uninstall -g pnpm
nvm use 21.2
npm uninstall -g pnpm
nvm alias default 21.2
nvm uninstall 20.11
nvm list
