import { execSync } from 'child_process';
import { ComandosType } from '../../App';

function executaComando(
  comando: string,
  mostraTerminal = false,
  fechaSozinho = true,
  terminalString: string
) {
  let readString = '';
  if (mostraTerminal && !fechaSozinho) {
    readString = '; read -n 1"';
  } else if (mostraTerminal && fechaSozinho) {
    readString = '" &> /dev/null &';
  }
  const linhaDeCodigo = `${
    mostraTerminal ? `${terminalString} /bin/bash -c "` : ''
  }${comando}${mostraTerminal ? readString : ' &> /dev/null & '}`;
  console.log(linhaDeCodigo)
  const execucao = execSync(linhaDeCodigo);
  return execucao.toString();
}

export default function executaComandoController(
  _: Electron.IpcMainInvokeEvent,
  comandosArg: string,
  terminalStringArg: string,
  id: string
) {
  const terminalString = terminalStringArg || 'kitty --detach';
  const comandos: ComandosType[] = JSON.parse(comandosArg);
  const comando = comandos.find((item) => item.id === id);
  if (comando) {
    executaComando(
      comando.comando,
      comando.mostraTerminal,
      comando.fechaSozinho,
      terminalString
    );
  }
}
