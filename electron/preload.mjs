import { contextBridge, ipcRenderer } from 'electron'

// 向渲染进程暴露安全的API
contextBridge.exposeInMainWorld('electronAPI', {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  isPackaged: () => ipcRenderer.invoke('is-packaged'),
})

// 检查是否运行在Electron环境中
contextBridge.exposeInMainWorld('isElectron', true)
