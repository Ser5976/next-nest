import { AiOutlineSearch } from 'react-icons/ai';
import styles from './SearchInputAdmin.module.css';
import { SearhInputAdminProps } from './SearchInputAdmin.props';

export const SearchInputAdmin = ({
  searchTerm,
  handleInput,
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
