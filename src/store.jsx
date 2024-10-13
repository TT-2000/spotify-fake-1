import { configureStore } from '@reduxjs/toolkit';
import playReducer from '@/redux/playReducer';
import optionReducer from "@/redux/optionReducer";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // sử dụng localStorage

import { combineReducers } from 'redux';

// Cấu hình persist
const persistConfig = {
    key: "music",
    storage,
    whitelist: ['actionOption'],
};


const rootReducer = combineReducers({
    actionPlaying: playReducer,
    actionOption: optionReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
// Tạo persist reducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

// Tạo persist store
export const persistor = persistStore(store);
export default store;


