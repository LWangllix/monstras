git checkout -b $(date +release/%Y-%m-%d_%H-%M-%S)
git push --set-upstream origin $(date +release/%Y-%m-%d_%H-%M-%S)