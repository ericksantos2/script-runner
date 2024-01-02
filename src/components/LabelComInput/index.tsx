import styles from './LabelComInput.module.scss';
import { v4 as uuid } from 'uuid';

interface LCIProps {
  label: string;
  type?: 'text' | 'checkbox';
  uuid?: string;
  set: React.Dispatch<React.SetStateAction<string | boolean>>;
  [x: string]: any;
}

export default function LabelComInput({
  type = 'text',
  ...props
}: LCIProps) {
  const estilo = type === 'checkbox' ? 'row' : 'column';
  const inputClassName = type === 'checkbox' ? styles.checkbox : styles.input;
  const id = uuid();

  return (
    <div className={styles[`input__${estilo}`]}>
      <label htmlFor={id}>{props.label}</label>
      <input
        type={type}
        id={id}
        className={inputClassName}
        onChange={(e) => {
          let value: string | boolean = e.target.value;
          type === 'checkbox' && (value = e.target.checked);
          props.set(value);
        }}
        {...props}
      />
    </div>
  );
}
