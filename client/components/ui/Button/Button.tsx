import { ButtonProps } from './Button.props';
import styles from './Button.module.css';
import cn from 'classnames';

export const Button = ({
  children,
  className,
  apperance,
  ...props
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={cn(styles.button, className, {
        [styles.small]: apperance === 'small',
      })}
      {...props}
    >
      {children}
    </button>
  );
};
