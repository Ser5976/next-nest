import styles from './Characteristics.module.css';
import React, { FC } from 'react';
import { CharacteristicsProps } from './Characteristics.props';

const Characteristics: FC<CharacteristicsProps> = ({
  typeName, // объект выбранного типа товара
  checkBox, // состояние,массив брэндов
  setCheckBox, //изменение состояния
}): JSX.Element => {
  // изменяем массив брэндов взависимости от активности чекбокса
  // метод splice удаляет из массива значение(по индексу)
  // indexOf находит индекс заданного значения,
  const { characteristic } = typeName;
  const checkboxHandler = (e: any, title: string) => {
    let propertyList = [...checkBox];

    if (e.target.checked) {
      propertyList = [...checkBox, { title, property: e.target.value }];
    } else {
      propertyList = checkBox.filter((item) => {
        return item.property !== e.target.value;
      });
    }
    return setCheckBox(propertyList);
  };
  //console.log('typeName:', typeName);

  return (
    <div className={styles.container}>
      <h1>Характеристики</h1>
      {characteristic.length !== 0
        ? characteristic.map((char, i) => {
            return (
              <div key={char.title}>
                <h2>{char.title}</h2>
                {char.property.map((property) => {
                  return (
                    <div className={styles.property} key={property}>
                      <label>
                        <input
                          type="checkbox"
                          name={property}
                          value={property}
                          onChange={(e) => checkboxHandler(e, char.title)}
                          checked={
                            !!checkBox.find((e) => e.property === property)
                          }
                        />
                        <span>{property}</span>
                      </label>
                    </div>
                  );
                })}
              </div>
            );
          })
        : null}
    </div>
  );
};

export default Characteristics;
