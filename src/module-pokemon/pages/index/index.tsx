import { useDispatch } from 'react-redux';
import { Introduction, PokemonItem } from './components/';
import { useEffect, useState } from 'react';
import { getListPokemon } from '../../services/redux';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { PokemonListResponse } from '../../types';
import { NotFound, DataLoading, Pagination } from '../../../components';
import { getEntitiesPokemonData } from '../../services';
import { ReduxStateType } from '../../../redux/types';
import { useSearchParameters } from '../../../hooks';

const PokemonList = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState<number>(0);
  const { debouncedSearchText, searchText } = useSearchParameters();
  

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(
      getListPokemon({
        pageNumber: page,
        search: debouncedSearchText,
      })
    );
  }, [page, debouncedSearchText]);

  const { listPokemonData, isLoading, pokemonData } = useSelector((state: RootState) => ({
    pokemonData: state.pokemon.data.pokemonData,
    listPokemonData: state.pokemon.data.listPokemonData,
    isLoading: [ReduxStateType.LOADING, ReduxStateType.INIT].includes(state.pokemon.status),
  }))
  

  const pokemonInformation = getEntitiesPokemonData(pokemonData);

  return (
    <>
      <Introduction />
        <div className="container">
          <DataLoading isLoading={isLoading}>
            <div className="row">
              {listPokemonData?.totalRecords ? (
                <>
                  {listPokemonData?.data.map((item: PokemonListResponse) => (
                    <PokemonItem page={page} data={item} dataTag={pokemonInformation} key={JSON.stringify(item)} />
                  ))}
                </>
              ) : (
                <NotFound />
              )}
            </div>
            <Pagination page={page} handleChangePage={setPage} />
          </DataLoading>
        </div>
      
    </>
  );
};

export default PokemonList;
