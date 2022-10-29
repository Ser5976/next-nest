import { useRouter } from 'next/router';
import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import styles from './SearchInput.module.css';
import cn from 'classnames';
import { SearhInputProps } from './SearchInput.props';

export const SearchInput = ({}: SearhInputProps): JSX.Element => {
  const { push } = useRouter();
  const [search, setSearch] = useState('');
  // посылаем данные после нажатия на кнопку поиска
  const handlerSubmit = () => {
    push(`/products/search?text=${search}`);
    setSearch('');
  };
  // посылаем данные после нажатия на кнопку энтер
  const pressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && search !== '') {
      push(`/products/search?text=${search}`);
      setSearch('');
    }
  };
  return (
    <div className={styles.search}>
      <input
        type="text"
        className={styles.input}
        placeholder="Поиск товаров . . ."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyPress={pressEnter} //событие на нажатия клавиатуры
      />
      <button
        className={cn(styles.searchButton, {
          [styles.activ]: search,
        })}
        onClick={handlerSubmit}
        disabled={!search}
      >
        <AiOutlineSearch />
      </button>
    </div>
  );
};
