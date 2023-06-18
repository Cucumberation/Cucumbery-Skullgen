@ECHO OFF
CD /d %~dp0

:INIT
IF EXIST node_modules (
  GOTO START
) ELSE (
  GOTO INSTALL
)

:INSTALL
CALL npm ci
GOTO START

:START
ECHO node src/app.mjs -p 4499 > process.cmd
ECHO EXIT 0 >> process.cmd
START process.cmd
TIMEOUT /t 1 >NUL
START "" http://localhost:4499
EXIT