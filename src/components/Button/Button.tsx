import { omit } from 'es-toolkit';
import { Dynamic } from 'solid-js/web';
import styles from './styles.module.css';
import type { ComponentProps, JSXElement, ValidComponent } from 'solid-js';

// TODO: Add icons
const iconComponents: Record<string, ValidComponent> = {};

export default function Button(
  props: {
    icon?: string;
    variant?: 'primary' | 'alternate' | 'red';
    children: JSXElement;
  } & ComponentProps<'button'>,
) {
  const variant = props.variant ?? 'primary';
  const buttonProps = omit(props, ['children', 'variant']);
  return (
    <button class={`${styles.button} ${styles[variant]}`} {...buttonProps}>
      {props.icon && <Dynamic component={iconComponents[props.icon]} />}
      {props.children}
    </button>
  );
}
