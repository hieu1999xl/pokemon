import { RouteObject } from 'react-router';
import { AppLayout } from './components';
import { getPokemonModuleRoutes } from './module-pokemon/app-routes-pokemon';

export const initRoutes = (): RouteObject[] => {
  return [
    {
      path: '/',
      element: <AppLayout />,
      children: [...getPokemonModuleRoutes()],
    },
  ];
};
                                                                                                                                                                                                                                                                                                                                                                                               