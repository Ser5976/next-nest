import { FC, useEffect } from 'react';
import styles from './CharacteristicForm.module.css';
import { CharacteristicFormProps } from './CharacteristicForm.props';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { IProduct } from '../../../../../Home/home.service';
import { Textarea } from '../../../../../../ui/Textarea/Textarea';
import { TiDeleteOutline } from 'react-icons/ti';

const CharacteristicForm: FC<CharacteristicFormProps> = ({}): JSX.Element => {
  const {
    register,
    formState: { errors },
  } =
    useFormContext<
      Omit<IProduct, '_id' | '_v' | 'createdAt' | 'updatedAt' | 'rating'>
    >();
  const { fields, append, remove } = useFieldArray({
    name: 'characteristic',
  });
  // это для того что бы при открытии формы уже была первая пара инпутов
  useEffect(() => {
    append({ title: '', property: '' });
  }, []);
  return (
    <>
      <div className={styles.headerWrapper}>
        <div className={styles.header}>Характеристики товара</div>
        <div
          className={styles.button}
          onClick={() => {
            append({ title: '', property: '' });
          }}
        >
          Добавить поле
        </div>
      </div>

      <div className={styles.container}>
        {fields.map((item, index) => {
          return (
            <div className={styles.wrapper} key={item.id}>
              <label className={styles.wrapperLabel}>
                <div className={styles.label}>Заголовок</div>
                <Textarea
                  className={styles.textarea}
                  rows={2}
                  {...register(`characteristic.${index}.title` as const, {
                    required: 'Обязательное поле для заполнения',
                  })}
                  error={errors.characteristic?.[index]?.title}
                />
              </label>
              <label className={styles.wrapperLabel}>
                <div className={styles.label}>Свойство</div>
                <Textarea
                  className={styles.textarea}
                  rows={2}
                  {...register(`characteristic.${index}.property` as const, {
                    required: 'Обязательное поле для заполнения',
                  })}
                  error={errors.characteristic?.[index]?.property}
                />
              </label>
              {fields.length > 1 ? (
                <TiDeleteOutline
                  className={styles.icon2}
                  onClick={() => {
                    remove(index);
                  }}
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CharacteristicForm;
