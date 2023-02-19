import { all, call, put, takeLatest } from 'redux-saga/effects';
import { PokemonListRequest, PokemonListResponse } from '../types';
import {
  getListPokemonSuccess,
  getListPokemon,
  getListPokemonFail,
  getDetailPokemon,
  getDetailPokemonSuccess,
  getDetailPokemonFail,
} from './redux';
import axios from 'axios';
import { API_URL } from '../constants';
import { transformPokemonDetailResponse, transformPokemonListRequest, transformPokemonListResponse } from './transform';

/**list pokemon */

function* getWatchListPokemonSaga(action: ReturnType<typeof getListPokemon>) {
  try {
    const reps: PokemonListResponse = yield call(listPokemonRequest, action.payload);
    yield put({ type: getListPokemonSuccess, payload: reps });
  } catch (error) {
    yield put({ type: getListPokemonFail });
  } finally {
  }
}

const listPokemonRequest = async (params: PokemonListRequest): Promise<any> => {
  return axios
    .get(`${API_URL}/pokemon`, {
      params: transformPokemonListRequest(params),
      transformResponse: transformPokemonListResponse,
    })
    .then(resp => resp.data);
};

function* watchGetPokemonListSaga() {
  yield takeLatest(getListPokemon.toString(), getWatchListPokemonSaga);
}

/**detail pokemon */

function* getWatchDetailPokemonSaga(action: ReturnType<typeof getDetailPokemon>) {
  try {
    const reps: PokemonListResponse = yield call(detailPokemonRequest, action.payload);
    yield put({ type: getDetailPokemonSuccess, payload: reps });
  } catch (error) {
    yield put({ type: getDetailPokemonFail });
  } finally {
  }
}

const detailPokemonRequest = async (name: string): Promise<any> => {
  return axios
    .get(`${API_URL}/pokemon/${name}`, {
      transformResponse: transformPokemonDetailResponse,
    })
    .then(resp => resp.data);
};

function* watchGetPokemonDetailSaga() {
  yield takeLatest(getDetailPokemon.toString(), getWatchDetailPokemonSaga);
}

export default function* pokemonSaga() {
  yield all([watchGetPokemonListSaga(), watchGetPokemonDetailSaga()]);
}
