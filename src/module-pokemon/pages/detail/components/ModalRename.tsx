import { useState } from 'react';
import { PokemonResponse } from '../../../types';
import { Modal } from '../../../../components';

import { IMAGE_URL } from '../../../constants';

interface ModalRenameProps {
  pokemonData: PokemonResponse;
  openModal: boolean;
  savePokemon: (name: string) => void;
}

const ModalRename = ({ openModal, savePokemon, pokemonData }: ModalRenameProps) => {
  const [nameOwner, setNameOwner] = useState<string>(pokemonData?.generalInformation.name);

  const handleSavePokemon = () => {
    savePokemon(nameOwner);
  };

  return (
    <Modal openModal={openModal} onClose={() => {}}>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div className="flex flex-col items-center">
          <div className="lazyload-wrapper flex justify-center">
            <img src={`${IMAGE_URL}/${pokemonData.id}.png`} width="20%" />
          </div>
          <div className="flex justify-center mt-6">
            <input
              type="text"
              defaultValue={nameOwner}
              onChange={event => setNameOwner(event.target.value)}
              id="nameOwner"
              className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5  ${
                !nameOwner ? 'border-red-500' : ''
              }`}
              placeholder="Nick name"
              required
            />
          </div>
          {!nameOwner && (
            <div className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
              This field is required
            </div>
          )}
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          disabled={!nameOwner}
          onClick={handleSavePokemon}
          className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm enabled:hover:bg-red-700 focus:outline-none focus:ring-2 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-75 smS:flex smS:m-auto smS:w-2/4"
        >
          OK
        </button>
      </div>
    </Modal>
  );
};

export default ModalRename;
