import {
  ICategoryProduct,
  ICategoryProductState,
} from './interface.categoryProduct';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState: ICategoryProductState = {
  categoryProduct: [],
};

export const categoryProductSlice = createSlice({
  name: 'categoryProduct',
  initialState,

  reducers: {
    getCategoryProduct: (state, action: PayloadAction<ICategoryProduct[]>) => {
      state.categoryProduct = action.payload;
    },
  },
  extraReducers: {
    //когда данные поступают в редакс через серверные функции они не могут напрямую поступить в стор
    //  HYDRATE  срабатывает,когда мы через серверные функции получаем данные и передаём их в экшены
    //  когда сработает HYDRATE, мы   записываем данные в стор
    [HYDRATE]: (state, action) => {
      // console.log('HYDRATE', action.payload);

      if (!action.payload.categoryProducReducer.categoryProduct) {
        return state;
      }

      state.categoryProduct =
        action.payload.categoryProducReducer.categoryProduct;
    },
  },
});
export const { getCategoryProduct } = categoryProductSlice.actions;
export default categoryProductSlice.reducer;
