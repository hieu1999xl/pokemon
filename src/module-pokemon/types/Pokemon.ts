export interface BaseRequestModel {
  search?: string;
}

export type PaginableData<T> = {
  data: T[];

  first?: boolean;
  last?: boolean;
  pageSize?: number;
  totalPage: number;
  totalRecords: number;
};

export type PokemonListRequest = BaseRequestModel & {
  pageSize?: number;
  pageNumber: number;
};

export type ApiPokemonListRequest = BaseRequestModel & {
  offset: number;
  limit: number;
};

export interface PokemonListResponse {
  id: number;
  name: string;
  generalInformation: {
    name: string;
    image: string;
    types: Array<string>;
    weight: string;
    height: string;
    baseExp: number;
  };
}

export interface ApiPokemonListResponse {
  count: number;
  next: string;
  previous: string;
  results: Array<{
    name: string;
    url: string;
  }>;
}

export interface PokemonResponse {
  id: number;
  nameOwner?: string;
  generalInformation: {
    name: string;
    image: string;
    types: Array<string>;
    weight: string;
    height: string;
    baseExp: number;
  };
  moves: Array<string>;
}

export interface ApiPokemonTypeModel {
  slot: number;
  type: { name: string; url: string };
}

export interface ApiPokemonMoveModel {
  move: {
    name: string;
    url: string;
  };
  version_group_details: Array<{
    level_learned_at: number;
    move_learn_method: {
      name: string;
      url: string;
    };
  }>;
}
