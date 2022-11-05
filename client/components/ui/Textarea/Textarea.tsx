import { TextareaProps } from './Textarea.props';
import styles from './Textarea.module.css';
import cn from 'classnames';
import { ForwardedRef, forwardRef } from 'react';
import { RiErrorWarningLine } from 'react-icons/ri';
export const Textarea = forwardRef(
  (
    { className, error, placeholder, rows, ...props }: TextareaProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ): JSX.Element => {
    return (
      <div className={cn(className, styles.inputWrapper)}>
        <textarea
          rows={rows}
          placeholder={placeholder}
          className={cn(styles.textarea, {
            [styles.error]: error,
          })}
          ref={ref}
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
Textarea.displayName = 'TextArea'; // это чтобы build не ругался
