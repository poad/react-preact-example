#!/bin/sh

CUR=$(pwd)

CURRENT=$(cd "$(dirname "$0")" || exit;pwd)
echo "${CURRENT}"

cd "${CURRENT}" || exit
git pull --prune
result=$?
if [ $result -ne 0 ]; then
  cd "${CUR}" || exit $result
  exit $result
fi
echo ""
pwd

cd "${CURRENT}/preact" || exit
result=$?
if [ $result -ne 0 ]; then
  cd "${CUR}" || exit
  exit $result
fi
echo ""
pwd

if ! (npx -y pnpm@latest self-update latest-11 && pnpm install -r && pnpm up -r && pnpm audit --fix override && pnpm up -r && pnpm lint-fix && pnpm clean && pnpm build); then
  cd "${CUR}" || exit $result
  exit 1
fi

cd "${CURRENT}/react" || exit
result=$?
if [ $result -ne 0 ]; then
  cd "${CUR}" || exit
  exit $result
fi
echo ""
pwd

if ! (npx -y pnpm@latest self-update latest-11 && pnpm install -r && pnpm up -r && pnpm audit --fix override && pnpm up -r && pnpm lint-fix && pnpm clean && pnpm build); then
  cd "${CUR}" || exit $result
  exit $result
fi

git commit -am "Bumps node modules" && git push
result=$?
if [ $result -ne 0 ]; then
  cd "${CUR}" || exit $result
  exit $result
fi

cd "${CUR}" || exit $result
