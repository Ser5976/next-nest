import cn from 'classnames';
import styles from './CatalogMenu.module.css';
import Link from 'next/link';
import { CatalogMenuProps } from './CatalogMenu.props';
import { useClickOutside } from '../../../hook/clickOutside';
import { SiScrollreveal } from 'react-icons/si';
import { AiOutlineClose } from 'react-icons/ai';
import { useData } from '../../../store/useData';
import { Category } from './Category/Category';
import { ICategoryProduct } from '../../../store/category-product/interface.categoryProduct';
import { useState } from 'react';

export const CatalogMenu = ({
  className,
  ...props
}: CatalogMenuProps): JSX.Element => {
  const { ref, isShow, setIsShow } = useClickOutside(true); //кастомный хук (используем для закрытия dropdown по клику снаружи)

  //получем данные по категориям из стора
  const { categoryProducReducer } = useData();
  const { categoryProduct } = categoryProducReducer;

  // выбираем категорию при наведению мыши на название категории
  const [category, setCategory] = useState<ICategoryProduct | undefined>(
    categoryProduct[0] // делаем состояние по умолчанию в котором будет первый объект из массива категорий
  );
  //  при помощи метода find выбираем нужную нам категорию(name название категории) и записываем в состояния
  const selectCategory = (name: string) => {
    const selectedCategory = categoryProduct.find(
      (element) => element.name === name
    );

    setCategory(selectedCategory);
  };

  return (
    <>
      <button
        className={cn(className, styles.catalog)}
        ref={ref}
        onClick={() => setIsShow(!isShow)}
        {...props}
      >
        Каталог товаров
        <span>{isShow ? <SiScrollreveal /> : <AiOutlineClose />}</span>
      </button>

      {/* выпадающий список */}
      <div
        className={cn(styles.show, {
          [styles.hidden]: isShow,
        })}
      >
        <div className={styles.wrapper}>
          <ul className={styles.block1}>
            {categoryProduct.map((category) => {
              return (
                <li
                  key={category._id}
                  className="cursor-pointer"
                  onMouseMove={() => selectCategory(category.name)}
                >
                  {category.name}
                </li>
              );
            })}
          </ul>
          <Category category={category} />
        </div>
      </div>
    </>
  );
};
