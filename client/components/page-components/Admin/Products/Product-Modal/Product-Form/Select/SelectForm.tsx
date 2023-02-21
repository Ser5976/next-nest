import styles from './SelectForm.module.css';
import { FC } from 'react';
import { SelectFormProps } from './SelectForm.props';
import { useFormContext } from 'react-hook-form';
import { IProduct } from '../../../../../Home/home.service';

const SelectForm: FC<SelectFormProps> = ({
  categoryProduct, // массив категорий товара
  productType, // массив типов товара
  brands, // массив брэндов товара
}): JSX.Element => {
  const {
    register,
    formState: { errors },
  } =
    useFormContext<
      Omit<IProduct, '_id' | '_v' | 'createdAt' | 'updatedAt' | 'rating'>
    >();

  return (
    <div className={styles.selectBlock}>
      <div className="   relative mb-5 ">
        <select
          {...register('categoryId', {
            required: 'Выберите категорию!',
          })}
          className={styles.select}
        >
          <option value="" className=" text-gray-400">
            Выберите категорию
          </option>
          {categoryProduct.map((category) => {
            return (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            );
          })}
        </select>
        {errors.categoryId && (
          <span className={styles.errorMessage}>
            {errors.categoryId.message}
          </span>
        )}
      </div>
      <div className="   relative mb-5 ">
        <select
          {...register('typeId', {
            required: 'Выберите тип!',
          })}
          className={styles.select}
        >
          <option value="" className=" text-gray-400">
            Выберите тип
          </option>
          {productType.map((type) => {
            return (
              <option key={type._id} value={type._id}>
                {type.name}
              </option>
            );
          })}
        </select>
        {errors.typeId && (
          <span className={styles.errorMessage}>{errors.typeId.message}</span>
        )}
      </div>
      <div className="   relative mb-5 ">
        <select
          {...register('brandId', {
            required: 'Выберите брэнд!',
          })}
          className={styles.select}
        >
          <option value="" className=" text-gray-400">
            Выберите брэнд
          </option>
          {brands.map((brand) => {
            return (
              <option key={brand._id} value={brand._id}>
                {brand.name}
              </option>
            );
          })}
        </select>
        {errors.brandId && (
          <span className={styles.errorMessage}>{errors.brandId.message}</span>
        )}
      </div>
    </div>
  );
};

export default SelectForm;
