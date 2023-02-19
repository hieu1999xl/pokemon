import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReduxData, ReduxStateType } from '../../redux/types';

import { RootState } from '../../redux/store';
import { PaginableData, PokemonListRequest, PokemonListResponse, PokemonResponse } from '../types';
import { stat } from 'fs';

export interface State {
  isAnimate: boolean;
  listPokemonData: PaginableData<PokemonListResponse>;
  pokemonData: PokemonResponse;
  pokemonCaught: Array<PokemonResponse>;
  myBag: any;
}

const initialState: ReduxData<State> = {
  data: {
    isAnimate: false,
    listPokemonData: {
      data: [],
      totalPage: 0,
      totalRecords: 0,
    },
    pokemonData: {
      id: 0,
      generalInformation: {
        name: '',
        image: '',
        height: '',
        weight: '',
        baseExp: 0,
        types: [''],
      },
      moves: [''],
    },
    pokemonCaught: [],

    myBag: [],
  },
  status: ReduxStateType.INIT,
};

const pokemonSlice = createSlice({
  name: 'pokemonSlice',
  initialState,
  reducers: {
    makeAnimate: (state, action: PayloadAction<boolean>) => {
      state.data.isAnimate = action.payload;
    },
    getListPokemon: (state, action: PayloadAction<PokemonListRequest>) => {
      state.status = ReduxStateType.LOADING;
    },
    getListPokemonSuccess: (state, action: PayloadAction<PaginableData<PokemonListResponse>>) => {
      state.status = ReduxStateType.SUCCESS;
      state.data.listPokemonData = action.payload;
    },
    getListPokemonFail: state => {
      state.status = ReduxStateType.ERROR;
    },
    getDetailPokemon: (state, action: PayloadAction<string>) => {
      state.status = ReduxStateType.LOADING;
    },
    getDetailPokemonSuccess: (state, action: PayloadAction<PokemonResponse>) => {
      state.status = ReduxStateType.SUCCESS;
      state.data.pokemonData = action.payload;
    },
    getDetailPokemonFail: state => {
      state.status = ReduxStateType.ERROR;
    },
    catchUpPokemon: (state, action: PayloadAction<PokemonResponse>) => {
      let temp = state.data.pokemonCaught || [];
      if (action.payload) {
        temp.unshift(action.payload);
      }

      state.data.pokemonCaught = temp;
    },
    catchUpPokemonSuccess: (state, action: PayloadAction<Array<PokemonResponse>>) => {
      state.status = ReduxStateType.SUCCESS;
      state.data.pokemonCaught = action.payload;
    },
    catchUpPokemonFail: state => {
      state.status = ReduxStateType.ERROR;
    },
    releasePokemon: (state, action: PayloadAction<{ isAll?: boolean; name: string }>) => {
      const { isAll, name } = action.payload;
      let temp = state.data.pokemonCaught || [];

      state.data.pokemonCaught = isAll ? [] : temp.filter(i => i.generalInformation.name !== name);
    },
  },
});

export const {
  makeAnimate,
  getListPokemonFail,
  getListPokemon,
  getListPokemonSuccess,
  getDetailPokemon,
  getDetailPokemonFail,
  getDetailPokemonSuccess,
  catchUpPokemon,
  releasePokemon,
} = pokemonSlice.actions;

export const selectorPokemonList = (state: RootState) => state.pokemon.data;

export default pokemonSlice.reducer;
