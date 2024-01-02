import { useContext } from 'react';
import styles from './Comando.module.scss';
import { FaTrash } from 'react-icons/fa';
import { AppContext, ComandosAction } from '../../App';

type Props = {
  nome: string;
  id: string;
};

export default function Comando({ nome, id }: Props) {
  const { app, comandos } = useContext(AppContext);
  return (
    <div
      className={styles.comando}
      id={id}
      onClick={(e) => {
        const targetId = (e.target as HTMLElement).id;
        if (targetId === id) {
          (window as any).api.executaComando(
            localStorage.getItem('comandos'),
            localStorage.getItem('terminalPadrao'),
            id
          );
        }
      }}
    >
      {nome}
      {app.editando && (
        <span
          onClick={(e) => {
            (comandos.dispatch as React.Dispatch<ComandosAction>)({
              type: 'Remover',
              payload: id,
            });
          }}
        >
          <FaTrash size={15} />
        </span>
      )}
    </div>
  );
}
