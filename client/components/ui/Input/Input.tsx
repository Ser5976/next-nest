import { InputProps } from './Input.props';
import styles from './Input.module.css';
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';
import { RiErrorWarningLine } from 'react-icons/ri';
export const Input = forwardRef(
  (
    {
      className,
      error,
      type,
      placeholder,
      scale = 'larg',
      defaultValue,
      ...props
    }: InputProps,
    ref: ForwardedRef<HTMLInputElement>
  ): JSX.Element => {
    return (
      <div className={cn(className, styles.inputWrapper)}>
        <input
          type={type}
          placeholder={placeholder}
          className={cn({
            [styles.inputSmall]: scale === 'small',
            [styles.input]: scale === 'larg',
            [styles.error]: error,
          })}
          ref={ref}
          defaultValue={defaultValue ? defaultValue : ''}
          {...props}
        />

        {error && (
          <>
            <RiErrorWarningLine className={styles.errorIcon} />
            <span className={styles.errorMessage}>{error.message}</span>
          </>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input'; // это чтобы build не ругался
