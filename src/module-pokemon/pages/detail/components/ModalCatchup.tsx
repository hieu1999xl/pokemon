import { IMAGE_URL } from '../../../constants';
import imgPokeThrow from '../../../images/poke-throw.gif';
import imgPokeCatchSuccess from '../../../images/poke-catch-success.gif';
import imgPokeCatchFail from '../../../images/poke-catch-fail.gif';
import { PokemonResponse } from '../../../types';
import { Modal } from '../../../../components';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface ModalCatchupProps {
  pokemonData: PokemonResponse;
  openModal: boolean;
  setOpenModal: (open: boolean) => void;
  pokeAdmin: any;
  setPokeAdmin: (value: any) => void;
  canCatchUp: boolean;
  resetState: () => void;
}

const ModalCatchup = ({
  pokemonData,
  openModal,
  setOpenModal,
  canCatchUp,
  pokeAdmin,
  resetState,
}: ModalCatchupProps) => {
  const onCloseCatchUp = () => {
    if ([imgPokeThrow, imgPokeCatchSuccess].includes(pokeAdmin)) return;
    if (!canCatchUp) {
      setOpenModal(false);
      resetState();
    }
  };

  return (
    <Modal openModal={openModal} onClose={onCloseCatchUp}>
      <div className="bg-white">
        <div className="sm:flex sm:items-start relative flex">
          <LazyLoadImage src={pokeAdmin} width="100%" className="smS:w-[500px]" />

          <LazyLoadImage
            src={`${IMAGE_URL}/${pokemonData.id}.png`}
            style={{
              display: canCatchUp && pokeAdmin == imgPokeCatchSuccess ? 'block' : 'none',
            }}
            className="absolute bottom-[20%] left-[40%] w-[30%] smS:w-[150px]"
          />
          {[imgPokeCatchSuccess, imgPokeCatchFail].includes(pokeAdmin) && (
            <div className="absolute text-center w-full bottom-0">
              <h2 className="text-3xl font-bold tracking-tight text-rose-600 sm:text-4xl">
                {canCatchUp ? 'Caught' : "Can't catch"}
              </h2>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModalCatchup;
