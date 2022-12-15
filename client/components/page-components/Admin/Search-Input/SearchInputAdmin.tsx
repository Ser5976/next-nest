import { AiOutlineSearch } from 'react-icons/ai';
import styles from './SearchInputAdmin.module.css';
import { SearhInputAdminProps } from './SearchInputAdmin.props';

export const SearchInputAdmin = ({
  searchTerm,
  handleInput,
}: SearhInputAdminProps): JSX.Element => {
  return (
    <div className={styles.search}>
      <input
        type="text"
        className={styles.input}
        placeholder="введите email . . ."
        value={searchTerm}
        onChange={handleInput}
      />
      <AiOutlineSearch className={styles.icons} />
    </div>
  );
};
