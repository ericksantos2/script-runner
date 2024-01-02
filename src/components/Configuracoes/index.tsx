import { useContext, useEffect, useState } from 'react';
import Prompt from '../Prompt';
import { AppContext } from '../../App';
import LabelComInput from '../LabelComInput';
import BotaoEnviar from '../BotaoEnviar';
import styles from './Configuracoes.module.scss';

const placeholders = {
  terminalPadrao: () => localStorage.getItem('terminalPadrao') || '',
};

export default function Configuracoes() {
  const { app } = useContext(AppContext);
  const [terminalPadrao, setTerminalPadrao] = useState('');
  const [preview, setPreview] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    terminalPadrao !== '' &&
      localStorage.setItem('terminalPadrao', terminalPadrao);

    app.setConfigurando((valor: boolean) => !valor);
  }

  useEffect(() => {
    const terminal = localStorage.getItem('terminalPadrao');
    if (!terminal) {
      localStorage.setItem('terminalPadrao', 'gnome-terminal --')
    }
  }, [])

  useEffect(() => {
    setPreview(`${terminalPadrao || placeholders.terminalPadrao()} /bin/bash -c "$COMMAND; read -n 1"`)
  }, [terminalPadrao])

  return (
    <Prompt set={app.setConfigurando}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <LabelComInput
          label='Linha de comando para execução do terminal'
          set={setTerminalPadrao}
          placeholder={placeholders.terminalPadrao()}
        />
        <LabelComInput
          label='Preview'
          set={setPreview}
          value={preview}
          disabled
        />
        <BotaoEnviar />
      </form>
    </Prompt>
  );
}
