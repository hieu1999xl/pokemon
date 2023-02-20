import {
  ApiPokemonListRequest,
  ApiPokemonListResponse,
  ApiPokemonMoveModel,
  ApiPokemonTypeModel,
  PaginableData,
  PokemonListRequest,
  PokemonListResponse,
  PokemonResponse,
} from '../types';
import { cleanObject } from '../../helpers/utils';
import { API_URL, DEFAULT_PAGE_SIZE } from '../constants';

export const transformPokemonListRequest = (payload: PokemonListRequest) => {
  const { pageNumber, pageSize, search } = payload;

  let pageS = pageSize || DEFAULT_PAGE_SIZE;

  let requestModel = {
    offset: pageNumber * pageS,
    limit: pageS,
    search,
  } as ApiPokemonListRequest;

  return cleanObject(requestModel);
};

export const transformPokemonListResponse = (resp: string) => {
  const parseData: ApiPokemonListResponse = JSON.parse(resp);

  const { results, count } = parseData;

  const totalPage = count === 0 ? 0 : Math.trunc((count - 1) / DEFAULT_PAGE_SIZE) + 1;

  let listData: PaginableData<PokemonListResponse> = {
    data: results.map(i => {
      return {
        id: Number(i.url.split(`${API_URL}/pokemon/`)[1].split('/')[0]) || 1,
        name: i.name,
      } as PokemonListResponse;
    }),
    totalRecords: count,
    totalPage: totalPage,
  };

  return listData;
};

export const transformPokemonDetailResponse = (resp: string) => {
  const parseData = JSON.parse(resp);

  let pokemonDetailData: PokemonResponse = {
    id: parseData.id,
    generalInformation: {
      name: parseData.name,
      image: parseData.sprites.front_default,
      types: parseData.types.map((i: ApiPokemonTypeModel) => i?.type.name),
      weight: String(parseData.weight),
      height: String(parseData.height),
      baseExp: parseData.base_experience,
    },
    moves: parseData.moves.map((i: ApiPokemonMoveModel) => i.move.name).slice(0, 10),
  };

  return pokemonDetailData;
};
