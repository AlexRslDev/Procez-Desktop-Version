@echo off
echo Iniciando instalación de dependencias...

echo Instalando dependencias en la raiz...
npm install

cd backend
echo Instalando dependencias en el backend...
npm install
if %errorlevel% neq 0 (
    echo Error instalando en el backend. Abortando.
    pause
    exit /b
)
cd ..

cd frontend
echo Instalando dependencias en el frontend...
npm install
if %errorlevel% neq 0 (
    echo Error instalando en carpeta2. Abortando.
    pause
    exit /b
)
cd ..

echo.
echo Todas las dependencias se han instalado correctamente.
pause