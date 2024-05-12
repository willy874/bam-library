#!/bin/bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm

nvm use 20.11
npm uninstall -g pnpm
nvm use 21.2
npm uninstall -g pnpm
nvm alias default 21.2
nvm uninstall 20.11
nvm list