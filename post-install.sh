#!/bin/bash

SCRIPT_PATH="$(dirname "$(readlink -f "$0")")"

cd "$SCRIPT_PATH"


post-install() {
  mkdir -p ./out/script-runner-linux-x64/images
  cp ./images/icon.png ./out/script-runner-linux-x64/images

  if [ -d /opt/script-runner ]; then
    sudo rm -rf /opt/script-runner
  fi

  sudo cp -R ./out/script-runner-linux-x64 /opt/script-runner

  USER="$(whoami)"

  sudo chown -R "$USER" /opt/script-runner

  cp -f ./files/script-runner.desktop ~/.local/share/applications/
}

if [ -d ./out/script-runner-linux-x64 ]; then
  post-install
else
  echo "Primeiro você precisa buildar o aplicativo."
  echo "Para buildar use: npm run make, yarn make ou pnpm make"
fi