@echo off

SETLOCAL
CMD /C PowerShell.exe -NoProfile -ExecutionPolicy Bypass -Command %ARG%
ENDLOCAL
