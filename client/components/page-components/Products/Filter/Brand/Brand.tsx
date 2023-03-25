import styles from './Brand.module.css';
import React, { FC } from 'react';
import { BrandProps } from './Brand.props';

const Brand: FC<BrandProps> = ({
  typeName, // объект выбранного типа товара
  checkBox, // состояние,массив брэндов
  setCheckBox, //изменение состояния
}): JSX.Element => {
  // изменяем массив брэндов взависимости от активности чекбокса
  // метод splice удаляет из массива значение(по индексу)
  // indexOf находит индекс заданного значения,

  const checkboxHandler = (e: any, name: string) => {
    let brandIdList = [...checkBox];
    // setChecked({ ...checked, [name]: e.target.checked });
    if (e.target.checked) {
      brandIdList = [...checkBox, e.target.value];
    } else {
      brandIdList.splice(checkBox.indexOf(e.target.value), 1);
    }
    return setCheckBox(brandIdList);
  };
  console.log('typeName:', typeName);
  //console.log('checked:', checked);
  return (
    <div className={styles.container}>
      <h1>Производители</h1>
      <div className="flex flex-wrap">
        {typeName.brand.map((brand) => {
          return (
            <div className={styles.brand} key={brand._id}>
              <label>
                <input
                  type="checkbox"
                  name={brand.name}
                  value={brand._id}
                  checked={checkBox ? checkBox.includes(brand._id) : false}
                  onChange={(e) => checkboxHandler(e, brand.name)}
                />{' '}
                <span>{brand.name}</span>
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Brand;
