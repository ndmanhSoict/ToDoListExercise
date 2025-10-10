import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import storage from 'redux-persist/lib/storage'; // mặc định là localStorage cho web
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from 'redux';

// 1️⃣ Cấu hình persist
const persistConfig = {
  key: 'root', // tên key trong localStorage
  storage, // nơi lưu (có thể đổi sang sessionStorage nếu muốn)
  whitelist: ['counter'], // chỉ định reducer nào được lưu
};

// 2️⃣ Gộp reducer (trường hợp sau này có nhiều slice)
const rootReducer = combineReducers({
  counter: counterReducer,
});

// 3️⃣ Áp dụng persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4️⃣ Tạo store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // tránh cảnh báo do redux-persist
    }),
});

// 5️⃣ Tạo persistor để dùng với PersistGate
export const persistor = persistStore(store);

// 6️⃣ Xuất type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
