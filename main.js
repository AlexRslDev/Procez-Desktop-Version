const { app, BrowserWindow } = require('electron');
const path = require('path');
const { exec } = require('child_process');

// Variables globales para almacenar las referencias de los procesos
let win;
let backendProcess = null; // Almacenará el proceso del backend
let frontendProcess = null; // Almacenará el proceso del frontend

// Crear la ventana del navegador
function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,       // Habilitar acceso a Node.js en el frontend
      contextIsolation: false,     // Desactivar el aislamiento de contexto
    }
  });

  // Cargar la interfaz de usuario de React (sin hacer build)
  win.loadURL('http://localhost:5173'); // Puerto en el que corre Vite (el frontend)

  // Al cerrar la ventana, terminar los procesos
  win.on('closed', () => {
    if (backendProcess) {
      backendProcess.kill();  // Terminar el proceso del backend
    }
    if (frontendProcess) {
      frontendProcess.kill();  // Terminar el proceso del frontend
    }
  });
}

// Ejecutar el servidor de backend y frontend
function startServers() {
  // Ejecutar el backend (Express)
  backendProcess = exec('npx nodemon', { cwd: path.join(__dirname, 'backend') }, (err, stdout, stderr) => {
    if (err) {
      console.error('Error al iniciar el backend:', err);
      return;
    }
    console.log('Backend iniciado en puerto 5000');
    console.log(stdout);
  });

  // Ejecutar el frontend (React con Vite)
  frontendProcess = exec('npm run dev', { cwd: path.join(__dirname, 'frontend') }, (err, stdout, stderr) => {
    if (err) {
      console.error('Error al iniciar el frontend:', err);
      return;
    }
    console.log('Frontend iniciado en puerto 5173');
    console.log(stdout);
  });
}

// Cuando Electron esté listo, crear la ventana
app.whenReady().then(() => {
  startServers();  // Iniciar backend y frontend
  createWindow();  // Crear la ventana de la aplicación

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
