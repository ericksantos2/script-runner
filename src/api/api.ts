import { ipcMain } from 'electron';
import executaComandoController from './comandos/executaComando';

function api() {
  ipcMain.handle('executaComando', executaComandoController);
}

export default api;
