import { configureStore } from '@reduxjs/toolkit';
import DataSlice from './DataSlice';

const store = configureStore({reducer:{DataFetchSlice:DataSlice.reducer}});

export default store;
