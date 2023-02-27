import { AiOutlineSearch } from 'react-icons/ai';
import styles from './SearchInputAdmin.module.css';
import { SearhInputAdminProps } from './SearchInputAdmin.props';

// инпут для поиска
export const SearchInputAdmin = ({
  searchTerm, //данные введённые в инпут
  handleInput, //функция обработчик данных из инпута
  placeholderText,
}: SearhInputAdminProps): JSX.Element => {
  return (
    <div className={styles.search}>
      <input
        type="text"
        className={styles.input}
        placeholder={placeholderText}
        value={searchTerm}
        onChange={handleInput}
      />
      <AiOutlineSearch className={styles.icons} />
    </div>
  );
};
