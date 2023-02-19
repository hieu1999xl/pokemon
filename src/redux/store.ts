import { persistReducer, persistStore } from 'redux-persist';
import sagaMiddleware, { setupMiddleware } from './middleware';

import { AnyAction, CombinedState, configureStore, Reducer } from '@reduxjs/toolkit';
import { AppReduxState } from './types';
import { persistConfig } from './options';
import rootReducer from './reducers';

const persistedReducer = persistReducer(persistConfig, rootReducer) as Reducer<CombinedState<AppReduxState>, AnyAction>;

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(sagaMiddleware),
});

setupMiddleware();

let persistor = persistStore(store);

export { store, persistor };
export type RootState = ReturnType<typeof rootReducer>;
