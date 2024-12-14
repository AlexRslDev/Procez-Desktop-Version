@echo off
echo Iniciando instalación de dependencias...

echo Instalando dependencias en la raiz...
npm install

cd backend
echo Instalando dependencias en el backend...
npm install

cd ..

cd frontend
echo Instalando dependencias en el frontend...
npm install

cd ..

echo.
echo Todas las dependencias se han instalado correctamente.
pause