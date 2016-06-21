git checkout gh-pages
git merge master --ff
npm run build
git add "build/*"

LAST_CI=`git rev-list master | head -n 1`
git commit -am "Build gh-pages from #${LAST_CI:0:5}"

git push origin gh-pages
git checkout @{-1}
