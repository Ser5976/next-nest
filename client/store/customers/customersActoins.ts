import { toast } from 'react-toastify';
import { API } from './../../constants/url';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { IArticle } from './interface.customers';

// получение forCustomers(это для Header страниц у которых отключён сервер)
export const fetchForCustomers = createAsyncThunk(
  'for-customers',
  async (_, thunkApp) => {
    try {
      const response = await axios.get<IArticle[]>(API.customers);
      return response.data;
    } catch (error: any) {
      toast.error('Что то пошло не так,данные не получены');
      thunkApp.rejectWithValue(error);
    }
  }
);
