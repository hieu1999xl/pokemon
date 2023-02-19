import { State as PokemonState } from '../module-pokemon/services/redux';

export enum AppReducerType {
  POKEMON = 'pokemon',
}

export enum ReduxStateType {
  INIT = 'init',
  LOADING = 'loading',
  LOADED = 'loaded',
  ERROR = 'error',
  CANCELLED = 'cancelled',
  SUCCESS = 'success',
}

export interface ReduxData<T> {
  data: T;
  status: ReduxStateType;
  error?: Error;
}

export type AppReduxState = {
  pokemon: PokemonState;
};
