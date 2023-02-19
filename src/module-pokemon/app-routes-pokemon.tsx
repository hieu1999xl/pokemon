import React from 'react';
import { RouteObject} from 'react-router';
import { LazyLoad } from '../components';
import { ROUTES } from './constants';

const PokemonList = React.lazy(() => import('./pages/index'));
const PokemonDetail = React.lazy(() => import('./pages/detail'));
const MyPokemon = React.lazy(() => import('./pages/my-pokemon'));

export const getPokemonModuleRoutes = (): RouteObject[] => {
  return [
    {
      children: [
        {
          index: true,
          element: LazyLoad(<PokemonList />),
        },
        {
          path: `${ROUTES.DETAIL}/:name`,
          element: LazyLoad(<PokemonDetail />),
        },
        {
          path: `${ROUTES.MY_POKEMON}`,
          element: LazyLoad(<MyPokemon />),
        },
      ],
    },
  ];
};
