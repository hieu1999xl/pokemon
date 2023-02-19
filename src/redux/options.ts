import { AppReducerType } from './types';
import { createTransform } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const Transform = createTransform(
  (inboundState: any) => {
    return inboundState;
  },
  (outBoundState: any) => {
    return outBoundState;
  }
);

export const persistConfig = {
  timeout: process.env.NODE_ENV === 'development' ? 0 : 30000,
  key: 'root',
  storage,
  whitelist: [AppReducerType.POKEMON],
  transforms: [Transform],
};
