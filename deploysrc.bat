@echo off
call npm run build
cd public
git add -A
git commit -m "Site updated: %date% - %time%"
git push -u built master -f
close