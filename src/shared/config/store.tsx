import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // импорт корневого редюсера

const store = configureStore({
  reducer: rootReducer,
  // middleware и другие параметры могут быть добавлены здесь
});

export default store;