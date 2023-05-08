import { IType, ITypeState } from './interface.typeProduct';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

const initialState: ITypeState = {
  productType: [],
};

export const productTypeSlice = createSlice({
  name: 'productType',
  initialState,

  reducers: {
    getProductType: (state, action: PayloadAction<IType[]>) => {
      state.productType = action.payload;
    },
  },
  extraReducers: {
    //когда данные поступают в редакс через серверные функции они не могут напрямую поступить в стор
    //  HYDRATE  срабатывает,когда мы через серверные функции получаем данные и передаём их в экшены
    //  когда сработает HYDRATE, мы   записываем данные в стор
    [HYDRATE]: (state, action) => {
      // console.log('HYDRATE', action.payload);

      if (!action.payload.productTypeReducer.productType) {
        return state;
      }

      state.productType = action.payload.productTypeReducer.productType;
    },
  },
});
export const { getProductType } = productTypeSlice.actions;
export default productTypeSlice.reducer;
