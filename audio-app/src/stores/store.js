import authReducer from '../reducers/index';
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';

const store = configureStore({
    reducer: authReducer,
}, thunk);

export default store;