import { all } from 'redux-saga/effects';
import pokemonSaga from '../module-pokemon/services/saga';

export default function* rootSaga() {
  yield all([pokemonSaga()]);
}
