import { useData } from '../store/useData';

const Abaut = () => {
  const { authReducer } = useData();
  console.log(authReducer.user?._id);

  return (
    <div>
      <div className="text-lg font-bold mx-auto my-10">Проверка </div>
      <div>{'ncmd'}</div>
    </div>
  );
};
export default Abaut;
