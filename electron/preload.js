const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("sensei", {
  window: {
    minimize: () => ipcRenderer.invoke("window:minimize"),
    maximize: () => ipcRenderer.invoke("window:maximize"),
    close: () => ipcRenderer.invoke("window:close")
  },
  system: {
    info: () => ipcRenderer.invoke("system:info")
  },
  terminal: {
    start: () => ipcRenderer.send("terminal:start"),
    input: data => ipcRenderer.send("terminal:input", data),
    onData: callback => ipcRenderer.on("terminal:data", (_event, data) => callback(data)),
    onExit: callback => ipcRenderer.on("terminal:exit", callback)
  }
});