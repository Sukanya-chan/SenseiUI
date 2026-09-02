const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const os = require("os");
const si = require("systeminformation");
const pty = require("node-pty");

let mainWindow;
let shellProcess;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1000,
    minHeight: 650,
    backgroundColor: "#070912",
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  mainWindow.loadFile(path.join(__dirname, "../src/index.html"));
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.handle("window:minimize", () => mainWindow.minimize());
ipcMain.handle("window:maximize", () => {
  if (mainWindow.isMaximized()) mainWindow.unmaximize();
  else mainWindow.maximize();
});
ipcMain.handle("window:close", () => mainWindow.close());

ipcMain.handle("system:info", async () => {
  const [load, mem, fs, net, battery, osInfo, graphics] = await Promise.all([
    si.currentLoad(),
    si.mem(),
    si.fsSize(),
    si.networkStats(),
    si.battery(),
    si.osInfo(),
    si.graphics()
  ]);
  const primaryFs = fs[0] || {};
  const primaryNet = net.find(n => n.operstate === "up") || net[0] || {};
  return {
    cpu: Number(load.currentLoad || 0),
    memory: Number((mem.active / mem.total) * 100 || 0),
    memoryUsed: mem.active,
    memoryTotal: mem.total,
    disk: Number(primaryFs.use || 0),
    networkRx: primaryNet.rx_sec || 0,
    networkTx: primaryNet.tx_sec || 0,
    battery: battery.hasBattery ? battery.percent : null,
    batteryCharging: battery.hasBattery ? battery.isCharging : null,
    hostname: os.hostname(),
    platform: osInfo.platform,
    distro: osInfo.distro,
    kernel: osInfo.kernel,
    gpu: graphics.controllers?.[0]?.model || "N/A",
    uptime: os.uptime()
  };
});

ipcMain.on("terminal:start", (event) => {
  if (shellProcess) {
    shellProcess.kill();
  }
  const shell = process.env.SHELL || (process.platform === "win32" ? "powershell.exe" : "/bin/bash");
  shellProcess = pty.spawn(shell, [], {
    name: "xterm-color",
    cols: 120,
    rows: 32,
    cwd: os.homedir(),
    env: process.env
  });

  shellProcess.onData(data => event.sender.send("terminal:data", data));
  shellProcess.onExit(() => event.sender.send("terminal:exit"));
});

ipcMain.on("terminal:input", (_event, data) => {
  if (shellProcess) shellProcess.write(data);
});

app.on("before-quit", () => {
  if (shellProcess) shellProcess.kill();
});