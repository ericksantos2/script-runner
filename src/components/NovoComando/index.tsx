import { useContext, useState } from 'react';
import styles from './NovoComando.module.scss';
import { v4 as uuid } from 'uuid';
import { AppContext, ComandosAction } from '../../App';
import Prompt from '../Prompt';
import LabelComInput from '../LabelComInput';
import BotaoEnviar from '../BotaoEnviar';

export default function NovoComando() {
  const { app, comandos } = useContext(AppContext);
  const [nomeComando, setNomeComando] = useState('');
  const [comando, setComando] = useState('');
  const [abrirTerminal, setAbrirTerminal] = useState(false);
  const [fecharAutomaticamente, setFecharAutomaticamente] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    app.setAdicionando((valorAtual: boolean) => !valorAtual);
    (comandos.dispatch as React.Dispatch<ComandosAction>)({
      type: 'Adicionar',
      payload: {
        nome: nomeComando,
        comando,
        mostraTerminal: abrirTerminal,
        fechaSozinho: fecharAutomaticamente,
        id: uuid(),
      },
    });
  }

  return (
    <Prompt set={app.setAdicionando}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Novo Comando</h2>

        <LabelComInput label='Nome do comando' set={setNomeComando} required />
        <LabelComInput label='Comando' set={setComando} required />
        <LabelComInput
          label='Irá abrir o terminal ao ser executado?'
          type='checkbox'
          set={setAbrirTerminal}
        />
        {abrirTerminal && (
          <LabelComInput
            label='O terminal irá fechar após ser executado?'
            type='checkbox'
            set={setFecharAutomaticamente}
            value={fecharAutomaticamente}
          />
        )}
        <BotaoEnviar />
      </form>
    </Prompt>
  );
}
