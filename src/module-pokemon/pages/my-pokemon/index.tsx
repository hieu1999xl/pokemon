import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { IMAGE_URL, ROUTES } from '../../constants';
import { useNavigate, useParams } from 'react-router';
import { NotFound } from '../../../components';
import { releasePokemon } from '../../services/redux';
import { useState } from 'react';
import ModalConfirm from './components/ModalConfirm';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useSearchParams } from 'react-router-dom';
import { PokemonResponse } from '../../types';

const MyPokemon = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();

  const releasePokemonAllParam = searchParams.get('releaseAll');

  const [openModal, setOpenModal] = useState(false);
  const [pokemonRelease, setPokemonRelease] = useState<string>();

  const { pokemonCaught } = useSelector((state: RootState) => ({
    pokemonCaught: state?.pokemon?.data.pokemonCaught,
  }));

  const navigateDetail = (name: string) => {
    navigate(`/${ROUTES.DETAIL}/${name}`);
  };

  const handleReleasePokemon = (isAll = false, pokeName: string) => {
    dispatch(releasePokemon({ isAll: isAll, name: pokeName }));
    setOpenModal(false);
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col s12 offset-l2 m12 l6">
          <div className="">
            <div className="">
              <div className="">
                {pokemonCaught && pokemonCaught.length > 0 ? (
                  <table className="min-w-full">
                    <thead className="border-b">
                      <tr>
                        <th scope="col" className="">
                          My Pokemon
                        </th>
                        <th scope="col" className=""></th>
                        <th scope="col" className=""></th>
                        {releasePokemonAllParam && (
                          <th scope="col" className="">
                            <button
                              onClick={() => {
                                setOpenModal(true);
                              }}
                              className=""
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </button>
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {pokemonCaught.map((item: PokemonResponse, idx: number) => (
                        <tr className="tr-pokemon" key={JSON.stringify(item)}>
                          <td className="">{idx + 1}</td>
                          <td
                            className=""
                            onClick={() => navigateDetail(item.generalInformation.name)}
                          >
                            <div className="">
                              <LazyLoadImage width={90}
                                src={`${IMAGE_URL}/${item.id}.png`}
                                alt={`${item.generalInformation.name}`}
                              />
                            </div>
                          </td>
                          <td className="">
                            <div>
                              <div style={{fontWeight: 900}}>{item.generalInformation.name}</div>
                              <div className="">{item.nameOwner}</div>
                            </div>
                          </td>
                          <td className="">
                            <button
                              onClick={() => {
                                setOpenModal(true);
                                setPokemonRelease(item.generalInformation.name);
                              }}
                              className="waves-effect waves-light btn button-mypokemon"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                color='#fff'
                                width="1.5rem"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-6 h-6"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <NotFound />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalConfirm
        openModal={openModal}
        setModal={setOpenModal}
        pokemonRelease={pokemonRelease}
        handleReleasePokemon={handleReleasePokemon}
      />
    </div>
  );
};

export default MyPokemon;
