import { ipcRenderer } from "electron"

const apiObject = {
  executaComando: (comandos: string, terminalString: string, id: string) => ipcRenderer.invoke('executaComando', comandos, terminalString, id)
}

export default apiObject