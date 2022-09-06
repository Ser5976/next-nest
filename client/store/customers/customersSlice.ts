import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { fetchForCustomers } from './customersActoins';
import { IInitialState, IArticle } from './interface.customers';

const initialState: IInitialState = {
  forCustomers: [],
  isLoading: false,
};

export const forCustomersSlice = createSlice({
  name: 'customers',
  initialState,

  reducers: {
    getForCustomers: (state, action: PayloadAction<IArticle[]>) => {
      state.forCustomers = action.payload;
    },
  },
  extraReducers: {
    //когда данные поступают в редакс через серверные функции они не могут напрямую поступить в стор
    //  HYDRATE  срабатывает,когда мы через серверные функции получаем данные и передаём их в экшены
    //  когда сработает HYDRATE, мы   записываем данные в стор
    [HYDRATE]: (state, action) => {
      // console.log('HYDRATE', action.payload);

      if (!action.payload.forCustomersReducer.forCustomers) {
        return state;
      }

      state.forCustomers = action.payload.forCustomersReducer.forCustomers;
    },
    //---запись  данных в стор, вызов экшена делаем с клиента---
    //период загрузки
    [fetchForCustomers.pending.type]: (state) => {
      state.isLoading = true;
    },
    //загружено
    [fetchForCustomers.fulfilled.type]: (
      state,
      action: PayloadAction<IArticle[]>
    ) => {
      state.isLoading = false;
      state.forCustomers = action.payload;
    },
    //ошибка
    [fetchForCustomers.rejected.type]: (state) => {
      state.isLoading = false;
    },
  },
});
export const { getForCustomers } = forCustomersSlice.actions;
export default forCustomersSlice.reducer;
