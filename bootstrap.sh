#! /bin/bash

cd "$(dirname "$0")"

echo "Updating Repo..."
git pull

function doIt() {
  echo "Copying theme files..."
  rsync --exclude ".git/" --exclude ".DS_Store" --exclude "bootstrap.sh" --exclude "readme.md" -av . ~/Library/Application\ Support/net.limechat.LimeChat-AppStore/Themes
  echo "Wookielight theme successfully installed!"
}

if [ "$1" == "--force" -o "$1" == "-f" ]; then
  doIt
else
  read -p "This may update pre-existing theme files. Are you sure? (y/n) " -n 1
  echo
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    doIt
  fi
fi

unset doIt

