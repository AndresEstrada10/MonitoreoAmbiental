@echo off
REM Script para iniciar el servidor de desarrollo
REM Agrega Node.js al PATH y ejecuta npm run dev

setlocal enabledelayedexpansion
set "PATH=C:\Program Files\nodejs;%PATH%"

echo Iniciando servidor de desarrollo...
cd /d "C:\Users\ASUS\Documents\MonitoreoAmbiental"
node "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run dev

pause
