import { useTypedSelector } from '../useTypedSelector';

// кастомный хук помогает проще получать данные из стора(use Selector находится в типизированном хуке useTypedSelector )
export const useData = () => useTypedSelector((state) => state);
