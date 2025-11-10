import { Dynamic } from 'solid-js/web';
import styles from './styles.module.css';
import type { ComponentProps, ValidComponent } from 'solid-js';

// TODO: Add icons
const iconComponents: Record<string, ValidComponent> = {};

export default function Button(
  props: {
    icon?: string;
    variant?: 'primary' | 'alternate' | 'red';
  } & ComponentProps<'button'>,
) {
  const variant = props.variant ?? 'primary';
  return (
    <button class={`${styles.button} ${styles[variant]}`} {...props}>
      {props.icon && <Dynamic component={iconComponents[props.icon]} />}
      {props.children}
    </button>
  );
}
