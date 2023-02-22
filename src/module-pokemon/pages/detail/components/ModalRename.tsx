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
      <div className="modal-pokemon">
        <div className="modal-pokemon--flex">
          <div className="lazyload-wrapper modal-pokemon--jus">
            <img src={`${IMAGE_URL}/${pokemonData.id}.png`} width="20%" />
          </div>
          <div className="modal-pokemon--jus mt2">
            <input
              type="text"
              defaultValue={nameOwner}
              onChange={event => setNameOwner(event.target.value)}
              id="nameOwner"
              placeholder="Nick name"
              required
            />
          </div>
          {!nameOwner && (
            <div className="modal-pokemon--owner">
              This field is required
            </div>
          )}
        </div>
      </div>
      <div className="modal-delete--btn">
        <button
          type="button"
          disabled={!nameOwner}
          onClick={handleSavePokemon}
          className="waves-effect waves-light btn-small"
        >
          OK
        </button>
      </div>
    </Modal>
  );
};

export default ModalRename;
