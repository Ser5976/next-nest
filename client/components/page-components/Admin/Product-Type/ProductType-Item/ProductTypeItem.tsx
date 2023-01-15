import styles from './ProductTypeItem.module.css';
import { FC } from 'react';
import { ProductTypeItemProps } from './ProductTypeItem.props';
import { TiDeleteOutline } from 'react-icons/ti';
import { useMutation, useQueryClient } from 'react-query';
import { AdminService } from '../../admin.service';
import { toast } from 'react-toastify';
import { ITypes } from '../../../../../header-service/header.service';


const ProductTypeItem: FC<ProductTypeItemProps> = ({ type,setTypes }): JSX.Element => {
  // //хук useQueryClient, из react-query,используется чтобы сделать повторый запрос при успешном  запросе
  const queryClient = useQueryClient();

  // удаление типа
  // подключаем хук useMutation(), из react-query,он посылает post,put,delete запросы
  const { mutateAsync: deleteType } = useMutation(AdminService.deleteType, {
    onSuccess:   (data) => {
      const cach = queryClient.getQueryData<ITypes>('product type');
   // работа с кэшем, что бы не делать новый запрос(кастылёк)  
 queryClient.setQueriesData('product type',(oldQueryData:any)=>{
 const newCount = oldQueryData.count-1
 const newType=oldQueryData?.productsTypes.filter((f:any)=>f._id!==data.data._id)
 const newCach={...oldQueryData,count:newCount,productsTypes:newType}
 console.log('Новый Кэш:', newCach);
 return newCach
 })
      toast.success('Тип продукта удалён');
      console.log('Кэш:', cach);
      
    
    },
    onError: (error: any) => {
      toast.error(error.response?.data.message);
    },
  });

  const removeType = async () => {
    await deleteType(type._id);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.name}>{type.name}</div>

        <TiDeleteOutline
          className={styles.icon2}
          onClick={() => {
            if (window.confirm(`Вы действительно хотите удалить категорию`)) {
              removeType();
            }
          }}
        />
      </div>
    </>
  );
};

export default ProductTypeItem;
