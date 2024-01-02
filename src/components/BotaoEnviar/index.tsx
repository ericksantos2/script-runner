import styles from './BotaoEnviar.module.scss';

export default function BotaoEnviar({ text = 'Enviar' }: { text?: string }) {
  return (
    <button type='submit' className={styles.enviar}>
      {text}
    </button>
  );
}
