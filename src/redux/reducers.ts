import { AppReducerType } from './types';
import pokemonReducer from '../module-pokemon/services/redux';
import { combineReducers } from 'redux';

export default combineReducers({
  [AppReducerType.POKEMON]: pokemonReducer,
});
