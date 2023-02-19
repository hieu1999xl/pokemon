import { PokemonResponse } from '../types';

export const getEntitiesPokemonData = (pokemonData?: PokemonResponse) => {
  let features: Array<{ name: string; description: string | number; tags?: Array<string> }> = [];

  if (!pokemonData) return features;

  if (pokemonData.generalInformation.types) {
    features.push({
      name: 'Types',
      description: '',
      tags: pokemonData.generalInformation.types,
    });
  }
  if (pokemonData.generalInformation.weight) {
    features.push({
      name: 'Weight',
      description: `${pokemonData.generalInformation.weight} kg`,
    });
  }
  if (pokemonData.generalInformation.baseExp) {
    features.push({
      name: 'Height',
      description: `${pokemonData.generalInformation.height} m`,
    });
  }
  if (pokemonData.generalInformation.baseExp) {
    features.push({
      name: 'Base Exp',
      description: pokemonData.generalInformation.baseExp,
    });
  }
  if (pokemonData.moves) {
    features.push({
      name: 'Moves',
      description: pokemonData.moves.join(', '),
    });
  }
  return features;
};
