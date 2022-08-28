//получает значение из localStorage, если нет,возвращает null
export const getStoreLocalStorage = (name: string) => {
  //первая проверка из-за Next
  if (typeof localStorage !== 'undefined') {
    const storage = localStorage.getItem(name);
    return storage ? JSON.parse(storage) : null;
  }
  return null;
};
