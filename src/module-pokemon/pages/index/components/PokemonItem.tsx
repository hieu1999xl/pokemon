import { NavLink } from 'react-router-dom';
import { IMAGE_URL, ROUTES } from '../../../constants';
import { PokemonListResponse } from '../../../types';
import { useMemo, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import axios from 'axios';

interface PokemonItemProps {
  data: PokemonListResponse;
  dataTag: any;
  page: number;
}


const PokemonItem = ({ data, dataTag, page }: PokemonItemProps) => {

  const [datatab, setData] = useState<any>([]);
  const { pokemonCaught } = useSelector((state: RootState) => ({
    pokemonCaught: state.pokemon.data.pokemonCaught,
  }));

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${data.id}/`)
  .then(res => {
    const persons = res.data.types;
   const data =  persons.map((i:any) => i.type.name)
    setData(data)
  })
  .catch(error => console.log(error));
  }, [page]);


  const isOwner = useMemo(() => {
    if (pokemonCaught.length > 0) {
      return pokemonCaught.some((i: any) => i.generalInformation.name === data.name);
    }
    return false;
  }, [pokemonCaught, data.name]);


  

  return (
    <>
      <div className="col s12 m6 l3">
        <div className={`pokemon-card ${datatab[0] ? datatab[0] : datatab[1] }`}>
          <div className="row right-align number ">
            <span className="text-white--bs">{`#${data.id}`}</span>
          </div>
          <div className="row avatar">
            <div className="col s7 left">
              <h5>{data.name}</h5>
              {datatab.map((i: any) => (
                <span key={i}>{i}</span>
              ))}
            </div>
            <div className="col right-align right">
              <NavLink to={`/${ROUTES.DETAIL}/${data.name}`}>
                <LazyLoadImage width={80} src={`${IMAGE_URL}/${data.id}.png`} alt={`${data.name}`} />
              </NavLink>
              <div className="pokebola-fondo">
                <svg width="104" height="104" viewBox="0 0 104 104" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M94.8571 70.2578C92.5306 85.1708 79.5918 96.5892 63.9592 96.5892C48.3265 96.5892 35.3878 85.1708 33.0612 70.2578H0C3.14286 102.644 30.6122 128 64 128C97.3878 128 124.816 102.644 128 70.2578H94.8571Z"
                    fill="white"
                    fill-opacity="0.4"
                  />
                  <path
                    d="M64 87.8933C77.2548 87.8933 88 77.1959 88 64C88 50.8041 77.2548 40.1066 64 40.1066C50.7452 40.1066 40 50.8041 40 64C40 77.1959 50.7452 87.8933 64 87.8933Z"
                    fill="white"
                    fill-opacity="0.4"
                  />
                  <path
                    d="M33.6735 57.7422C37.1429 44.2921 49.3878 34.3365 64 34.3365C78.6122 34.3365 90.8571 44.2921 94.2857 57.7422H127.959C124.816 25.3562 97.3469 0 64 0C30.6122 0 3.14286 25.3562 0 57.7422H33.6735Z"
                    fill="white"
                    fill-opacity="0.4"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PokemonItem;
