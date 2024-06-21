#!/bin/bash

# Set the colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Set the target versions
TARGET_NODE_VERSION="v20.11.0"
TARGET_PNPM_VERSION="8.15.1"

# Function to get the version of a command
function get_version() {
    local command=$1
    version=$($command --version 2>&1)

    if [[ $? -ne 0 ]]; then
        return 1
    fi

    echo $version
}

# Function to compare versions
function compare_version() {
    local current_version=$1
    local target_version=$2

    if [[ "$current_version" == "$target_version" ]]; then
        echo -e "${GREEN}PASS: Version matches ($current_version)${NC}"
    else
        echo -e "${RED}FAIL: Expected $target_version but got $current_version${NC}"
        return 1
    fi
}

# Function to test a command's version against a target version
function test_version() {
    local command=$1
    local target_version=$2
    local version=$(get_version $command)

    echo -e "${BLUE}Testing $command version...${NC}"
    compare_version $version $target_version
}

# Function to check if nvm exists
function check_nvm_exists() {
    echo -e "${BLUE}Testing nvm exists...${NC}"

    if ! [ -s "$HOME/.nvm/nvm.sh" ]; then
        echo -e "${RED}FAIL: nvm not found. Please ensure nvm is installed and available.${NC}"
        exit 1
    else
        echo -e "${GREEN}PASS: nvm found with version $(nvm --version)${NC}"
    fi
}

# Load nvm if available
if [ -s "$HOME/.nvm/nvm.sh" ]; then
    source "$HOME/.nvm/nvm.sh"
else
    echo -e "${RED}nvm not found. Please ensure nvm is installed and available.${NC}"
    exit 1
fi

# Run tests
check_nvm_exists
test_version "node" $TARGET_NODE_VERSION
test_version "pnpm" $TARGET_PNPM_VERSION


