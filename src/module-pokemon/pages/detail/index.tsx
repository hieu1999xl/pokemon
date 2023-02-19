import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { catchUpPokemon, getDetailPokemon } from '../../services/redux';
import { RootState } from '../../../redux/store';
import { ReduxStateType } from '../../../redux/types';
import { formatUpperCaseFirstLetter } from '../../../helpers/utils';
import { getEntitiesPokemonData } from '../../services';
import { IMAGE_URL, ROUTES } from '../../constants';
import ModalCatchup from './components/ModalCatchup';
import imgPokeThrow from '../../images/poke-throw.gif';
import imgPokeCatchSuccess from '../../images/poke-catch-success.gif';
import imgPokeCatchFail from '../../images/poke-catch-fail.gif';
import ModalRename from './components/ModalRename';
import { DataLoading } from '../../../components';
import { NavLink } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { PokemonResponse } from '../../types';


const PokemonDetail = () => {
  const { name: namePokemonParam } = useParams();

  const dispatch = useDispatch();

  const [openModal, setOpenModal] = useState(false);
  const [pokeAdmin, setPokeAdmin] = useState(imgPokeThrow);
  const [canCatchUp, setCanCatchUp] = useState(false);

  const { pokemonData, isLoading, pokemonCaught } = useSelector((state: RootState) => ({
    pokemonData: state.pokemon.data.pokemonData,
    isLoading: [ReduxStateType.LOADING, ReduxStateType.INIT].includes(state.pokemon.status),
    pokemonCaught: state.pokemon.data.pokemonCaught,
  }));

  
  const isOwner = useMemo(() => {
    if (canCatchUp) {
      return true;
    }
    if (pokemonCaught.length > 0) {
      return pokemonCaught.some(
        (i: PokemonResponse) => i.generalInformation.name === pokemonData.generalInformation.name
      );
    }
  }, [canCatchUp, pokemonCaught, pokemonData]);

  const [openModalRename, setOpenModalRename] = useState<boolean>(false);

  useEffect(() => {
    if (namePokemonParam) {
      dispatch(getDetailPokemon(namePokemonParam));
    }
  }, [namePokemonParam]);

  const pokemonInformation = getEntitiesPokemonData(pokemonData);

  const savePokemon = (name: string) => {
    const payload = {
      ...pokemonData,
      nameOwner: name,
    };
    dispatch(catchUpPokemon(payload));
    setOpenModalRename(false);
  };

  const handleCatchUp = () => {
    setOpenModal(true);
    setCanCatchUp(false);
    setTimeout(() => {
      const catchUp = Math.random() < 0.5;
      console.log('catchUp', catchUp);
      setPokeAdmin(catchUp ? imgPokeCatchSuccess : imgPokeCatchFail);
      setCanCatchUp(catchUp);
    }, 4000);
  };

  useEffect(() => {
    if (canCatchUp) {
      setTimeout(() => {
        setOpenModal(false);
        setOpenModalRename(true);
      }, 2000);
    }
  }, [canCatchUp]);

  const resetState = () => {
    setCanCatchUp(false);
    setPokeAdmin(imgPokeThrow);
  };

  const valuesType = pokemonInformation.map((feature:any) => {
    return feature.tags
})

    
  return (
    <div className='container'>
     <div id={`pokemon-info`} className={valuesType[0] ? valuesType[0] : valuesType[1] }>
        <div className="row">
          <div className="col s12 m5 l4 info-block-1">
            <h5>Information</h5>
            <div className="pills">
            {pokemonInformation.map(feature => (
                  <>
                    {feature.tags && (
                      <>
                        {feature.tags.map((i, idx) => (
                          <span>
                            {i}
                          </span>
                        ))}
                      </>
                    )}
                  </>
                ))}
            </div>
          </div>
          <div className="col s12 m7 l8 info-block-2">
            <span>1</span>
            <LazyLoadImage
                        src={`${IMAGE_URL}/${pokemonData.id}.png`}
                        alt={`${pokemonData.generalInformation.name}`}
                      />
            <div className="pokebola">
              <svg width={256} height={256} viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M189.714 140.516C185.061 170.342 159.184 193.178 127.918 193.178C96.6531 193.178 70.7755 170.342 66.1224 140.516H0C6.28571 205.288 61.2245 256 128 256C194.776 256 249.633 205.288 256 140.516H189.714Z" fill="white" fillOpacity="0.4" />
                <path d="M128 175.787C154.51 175.787 176 154.392 176 128C176 101.608 154.51 80.2133 128 80.2133C101.49 80.2133 80 101.608 80 128C80 154.392 101.49 175.787 128 175.787Z" fill="white" fillOpacity="0.4" />
                <path d="M67.3469 115.484C74.2857 88.5841 98.7755 68.673 128 68.673C157.224 68.673 181.714 88.5841 188.571 115.484H255.918C249.633 50.7124 194.694 0 128 0C61.2245 0 6.28571 50.7124 0 115.484H67.3469Z" fill="white" fillOpacity="0.4" />
              </svg>
            </div>
          </div>
        </div>
        {/* <div className="row details">
          <div className="col s12">
            <div className="details-tabs">
              <ul id="tabs-swipe-demo" className="tabs">
                <li className="tab col s3"><a className="active" href="#tab-1">About</a></li>
                <li className="tab col s3"><a href="#tab-2">Base stats</a></li>
                <li className="tab col s3"><a href="#tab-3">Moves</a></li>
              </ul>
              <div id="tab-1" className="col s12">
                <table>
                  <tbody><tr>
                      <td>Height</td>
                      <td className="height">111</td>
                    </tr>
                    <tr>
                      <td>Weight</td>
                      <td className="weight">111</td>
                    </tr>
                    <tr>
                      <td>Abilities</td>
                      <td className="abilities">1111</td>
                    </tr>
                  </tbody></table>
              </div>
              <div id="tab-2" className="col s12">
                <table>
                  <tbody><tr>
                      <td>HP</td>
                      <td className="hp">111</td>
                    </tr>
                    <tr>
                      <td>Speed</td>
                      <td className="speed">111</td>
                    </tr>
                    <tr>
                      <td>Special Defense</td>
                      <td className="special-defense">111</td>
                    </tr>
                    <tr>
                      <td>Special Attack</td>
                      <td className="special-attack">1111</td>
                    </tr>
                    <tr>
                      <td>Defense</td>
                      <td className="defense">1111</td>
                    </tr>
                    <tr>
                      <td>Attack</td>
                      <td className="attack">1111</td>
                    </tr>
                  </tbody></table>
              </div>
              <div id="tab-3" className="col s12">
                <table>
                </table>
              </div>
            </div>
          </div>
        </div> */}
      </div>
      {/* <div className="bg-white py-24">
        <DataLoading isLoading={isLoading}>
          <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-y-16 gap-x-8 px-4 sm:px-6 lg:max-w-7xl lg:grid-cols-2 lg:px-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl relative">
                {formatUpperCaseFirstLetter(pokemonData.generalInformation.name)}
                {isOwner && (
                  <NavLink to={`/${ROUTES.MY_POKEMON}`}>
                    <span className="bg-yellow-100 text-white-800 text-sm font-medium mr-2 ml-2 px-2.5 py-0.5 rounded dark:bg-red-300 dark:text-white-900 absolute cursor-pointer">
                      Owned
                    </span>
                  </NavLink>
                )}
              </h2>

              <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                {pokemonInformation.map(feature => (
                  <div key={feature.name} className="border-t border-gray-200 pt-4">
                    <div className="font-medium text-gray-900">{feature.name}</div>
                    {feature.description && <div className="mt-2 text-lg text-gray-500">{feature.description}</div>}
                    {feature.tags && (
                      <div className={feature.name === 'Moves' ? '' : 'flex'}>
                        {feature.tags.map((i, idx) => (
                          <div key={idx} className="mt-2 text-lg rounded-md bg-blue-2 text-white px-4 py-1 mr-3">
                            {i}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </dl>
            </div>
            <div className="flex flex-col items-center">
              <div className="grid flex justify-items-center">
                <div className="p-2 border rounded-lg shadow-xl cursor-pointer bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-green-500 hover:to-yellow-400 group">
                  <div className="h-full group-hover:scale-110 ease-in-out duration-200 flex items-center">
                    <div className="lazyload-wrapper flex">
                      <LazyLoadImage
                        src={`${IMAGE_URL}/${pokemonData.id}.png`}
                        alt={`${pokemonData.generalInformation.name}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {!isOwner && (
                <button
                  onClick={handleCatchUp}
                  className="mt-10 w-2/4 flex items-center justify-center border border-transparent rounded-md bg-blue-2 py-3 px-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Catch Pokemon
                </button>
              )}
            </div>
          </div>
        </DataLoading>
      </div> */}

      {openModal && (
        <ModalCatchup
          key={JSON.stringify(pokemonData)}
          openModal={openModal}
          setOpenModal={setOpenModal}
          pokeAdmin={pokeAdmin}
          setPokeAdmin={setPokeAdmin}
          canCatchUp={canCatchUp}
          pokemonData={pokemonData}
          resetState={resetState}
        />
      )}
      {openModalRename && (
        <ModalRename
          key={JSON.stringify(pokemonData)}
          openModal={openModalRename}
          savePokemon={savePokemon}
          pokemonData={pokemonData}
        />
      )}
    </div>
  );
};

export default PokemonDetail;
