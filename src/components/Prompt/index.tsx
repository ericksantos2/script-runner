import { AiOutlineCloseSquare } from 'react-icons/ai';
import styles from './Prompt.module.scss';

export default function Prompt({
  children,
  set,
}: {
  children?: JSX.Element | JSX.Element[];
  set: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className={styles.prompt}>
      <div>
        {children}
        <span
          className={styles.fechar}
          onClick={(e) => {
            e.preventDefault();
            set((valorAtual: boolean) => !valorAtual);
          }}
        >
          <AiOutlineCloseSquare size={20} />
        </span>
      </div>
    </div>
  );
}
