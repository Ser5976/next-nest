import { FC } from 'react';
import styles from './InputFieldsForm.module.css';
import cn from 'classnames';
import { InputFieldsFormProps } from './InputFieldsForm.props';
import { useFormContext } from 'react-hook-form';
import { IProduct } from '../../../../../Home/home.service';
import { Input } from '../../../../../../ui/Input/Input';
import { RiErrorWarningLine } from 'react-icons/ri';
import { Textarea } from '../../../../../../ui/Textarea/Textarea';

const InputFieldsForm: FC<InputFieldsFormProps> = ({}): JSX.Element => {
  const {
    register,
    formState: { errors },
  } =
    useFormContext<
      Omit<IProduct, '_id' | '_v' | 'createdAt' | 'updatedAt' | 'rating'>
    >();

  return (
    <div className={styles.wrapper}>
      <label>
        <div className={styles.label}>Название товара</div>
        <Input
          type="text"
          autoFocus
          className={styles.input}
          scale="small"
          {...register('name', {
            required: 'Обязательное поле для заполнения',
          })}
          error={errors.name}
        />
      </label>
      <div className={styles.priceBlock}>
        <label>
          <div className={styles.label}>Цена</div>
          <Input
            type="number"
            className={cn(styles.input, {
              [styles.errorHouse]: errors.price,
            })}
            scale="small"
            {...register('price', {
              required: 'Обязательное поле для заполнения',
            })}
          />
          {errors.price && (
            <>
              <RiErrorWarningLine className={styles.errorIconPrice} />
              <span className={styles.errorMessagePrice}>
                {errors.price.message}
              </span>
            </>
          )}
        </label>
        <label>
          <div className={styles.label}>Старая цена</div>
          <Input
            type="number"
            className={styles.input}
            scale="small"
            {...register('oldPrice')}
          />
        </label>
      </div>
      <label>
        <div className={styles.label}>Описание товара</div>
        <Textarea
          className={styles.textarea}
          rows={5}
          {...register('description', {
            required: 'Обязательное поле для заполнения',
          })}
          error={errors.description}
        />
      </label>
    </div>
  );
};

export default InputFieldsForm;
