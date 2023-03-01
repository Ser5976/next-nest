import cn from 'classnames';
import styles from './CatalogMenu.module.css';
import { CatalogMenuProps } from './CatalogMenu.props';
import { SiScrollreveal } from 'react-icons/si';
import { AiOutlineClose } from 'react-icons/ai';
import { useData } from '../../../store/useData';
import { Category } from './Category/Category';
import { ICategoryProduct } from '../../../store/category-product/interface.categoryProduct';
import { useState } from 'react';

export const CatalogMenu = ({}: CatalogMenuProps): JSX.Element => {
  // стейт для открытие каталога
  const [isShow, setIsShow] = useState(true);

  //получем данные по категориям из стора
  const { categoryProducReducer } = useData();
  const { categoryProduct } = categoryProducReducer;

  // выбираем категорию при наведению мыши на название категории
  // делаем состояние по умолчанию в котором будет первый объект из массива категорий
  const [category, setCategory] = useState<ICategoryProduct | undefined>(
    categoryProduct[0]
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
      <button className={cn(styles.catalog)} onClick={() => setIsShow(!isShow)}>
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
            {categoryProduct.length === 0 && <h1>Нет данных!!!</h1>}
            {categoryProduct.map((element) => {
              return (
                <li
                  key={element._id}
                  className={cn({
                    [styles.li]: element.name !== category?.name,
                    [styles.activ]: element.name === category?.name,
                  })}
                  onMouseMove={() => selectCategory(element.name)}
                >
                  {element.name}
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
