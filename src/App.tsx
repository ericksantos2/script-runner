import { createContext, useReducer, useState } from 'react';
import styles from './styles/App.module.scss';
import Comando from './components/Comando';
import { FaRegSquarePlus } from 'react-icons/fa6';
import NovoComando from './components/NovoComando';
import { IoPencil, IoSettingsOutline } from 'react-icons/io5';
import Configuracoes from './components/Configuracoes';

export type ComandosType = {
  nome: string;
  comando: string;
  mostraTerminal: boolean;
  fechaSozinho: boolean;
  id: string;
};

export const AppContext = createContext(null);

export type ComandosAction = {
  type: string;
  payload: string | ComandosType | ComandosType[];
};

function comandosReducer(state: ComandosType[], action: ComandosAction) {
  if (action.type === 'Adicionar') {
    const novoState = [...state, action.payload];
    localStorage.setItem('comandos', JSON.stringify(novoState));
    return novoState;
  } else if (action.type === 'Remover') {
    const novoState = [...state];
    const index = novoState.findIndex((item) => item.id === action.payload);
    if (index < 0) return state;
    novoState.splice(index, 1);
    localStorage.setItem('comandos', JSON.stringify(novoState));
    return novoState;
  } else {
    return state;
  }
}

export default function App() {
  const [comandosState, comandosDispatch] = useReducer(
    comandosReducer,
    JSON.parse(localStorage.getItem('comandos')) || []
  );
  const [adicionando, setAdicionando] = useState(false);
  const [editando, setEditando] = useState(false);
  const [configurando, setConfigurando] = useState(false);

  return (
    <AppContext.Provider
      value={{
        comandos: { state: comandosState, dispatch: comandosDispatch },
        app: { setAdicionando, editando, setConfigurando },
      }}
    >
      <div className={styles.app}>
        <div className={styles.comandos}>
          {(comandosState as ComandosType[]).map((comando, index) => (
            <Comando key={index} id={comando.id} nome={comando.nome} />
          ))}
        </div>
        <div className={styles.botoes}>
          <span
            onClick={() => {
              setAdicionando((value) => !value);
            }}
          >
            <FaRegSquarePlus size={18} />
          </span>
          <span
            onClick={() => {
              setEditando((value) => !value);
            }}
          >
            <IoPencil size={18} />
          </span>
          <span
            onClick={() => {
              setConfigurando((value) => !value);
            }}
          >
            <IoSettingsOutline size={18} />
          </span>
        </div>
        {adicionando && <NovoComando />}
        {configurando && <Configuracoes />}
      </div>
    </AppContext.Provider>
  );
}
