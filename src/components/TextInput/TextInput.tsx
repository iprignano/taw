import styles from './styles.module.css';
import type { ComponentProps } from 'solid-js';

export default function TextInput(props: { id: string; label?: string } & ComponentProps<'input'>) {
  return (
    <div class={styles.wrapper}>
      {props.label && <label for={props.id}>{props.label}</label>}
      <input class={styles.input} type="text" {...props} />
    </div>
  );
}
