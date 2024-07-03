root=$(pwd)
function rm_directorie() {
  target=$1
  if [ -d $target ]; then
    rm -r $target
    echo -e "${RED}Remove${NC} ${BLUE}$target${NC}"
  fi
}
for dir in $root/apps/* ; do
  [ -L "${dir}" ] && continue
  rm_directorie ${dir}/dist
done
for dir in $root/packages/* ; do
  [ -L "${dir}" ] && continue
  rm_directorie ${dir}/dist
done
pnpm exec nx run-many --target=build --all
