import styles from './Characteristics.module.css';
import React, { FC, useEffect, useState } from 'react';
import cn from 'classnames';
import { CharacteristicsProps } from './Characteristics.props';
import { sortingPropertis } from '../utility'; // сортирова значений в массиве характеристик

const Characteristics: FC<CharacteristicsProps> = ({
  characteristics, // массив характеристик из типа товара
  checkBox, // состояние,массив характеристк
  setCheckBox, //изменение состояния
}): JSX.Element => {
  console.log('characteristics:', characteristics);
  console.log('checkbox:', checkBox);
  //костылёк для поддержания  заголовков характеристик открытыми при перезагрузке
  //если есть выбраное свойство фильтра этого заголовка
  useEffect(() => {
    const selectedTitles = checkBox.map((el) => el.title);
    setTitles(selectedTitles);
  }, [checkBox]);

  // костылёк для открытия и закрытия заголовков для фильтров
  const [titles, setTitles] = useState<string[]>([]);
  console.log('titles:', titles);
  const checkTitles = (title: string) => {
    let arrayTitle: string[] = [...titles];
    if (titles.includes(title)) {
      arrayTitle.splice(titles.indexOf(title), 1);
    } else {
      arrayTitle = [...arrayTitle, title];
    }
    return setTitles(arrayTitle);
  };

  // изменяем массив характеристик в стейте взависимости от активности чекбокса
  const checkboxHandler = (e: any) => {
    let propertyList = [...checkBox];

    if (e.target.checked) {
      propertyList = [
        ...checkBox,
        { title: e.target.name, property: e.target.value },
      ];
    } else {
      propertyList = checkBox.filter((item) => {
        return item.property !== e.target.value;
      });
    }
    return setCheckBox(propertyList);
  };

  return (
    <div className={styles.container}>
      <h1>Характеристики</h1>
      {characteristics?.length !== 0
        ? characteristics?.map((char) => {
            return (
              <div key={char.title}>
                <h2
                  onClick={() => {
                    checkTitles(char.title);
                  }}
                >
                  {char.title}
                </h2>
                {sortingPropertis(char.property).map((property) => {
                  return (
                    <label
                      key={property}
                      className={cn(styles.openProperty, {
                        [styles.closeProperty]: !titles.includes(char.title),
                      })}
                    >
                      <input
                        type="checkbox"
                        name={char.title}
                        value={String(property)}
                        onChange={checkboxHandler}
                        checked={
                          !!checkBox.find((e) => e.property === property)
                        }
                      />
                      <span>{property}</span>
                    </label>
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
