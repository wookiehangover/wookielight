#! /bin/bash

cd "$(dirname "$0")"

echo "Updating Repo..."
git pull
git_pull_exit_status=$?
if [ $git_pull_exit_status -ne 0 ]
then
    echo "git pull Failed"
    exit $git_pull_exit_status
fi

function doIt() {
  echo "Copying theme files..."
  limechat_theme_directory="${HOME}/Library/Application Support/net.limechat.LimeChat-AppStore/Themes"
  if [ ! -d "$limechat_theme_directory" ]
  then
      # if not installed from AppStore
      limechat_theme_directory="${HOME}/Library/Application Support/LimeChat/Themes"
  fi
  rsync --exclude ".git/" --exclude ".DS_Store" --exclude "bootstrap.sh" --exclude "readme.md" -av . "$limechat_theme_directory"
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

