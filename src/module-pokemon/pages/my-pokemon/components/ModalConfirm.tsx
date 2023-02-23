import { Modal } from '../../../../components';
import { Dialog } from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { formatUpperCaseFirstLetter } from '../../../../helpers/utils';

interface ModalConfirmProps {
  openModal: boolean;
  setModal: (open: boolean) => void;
  pokemonRelease?: string;
  handleReleasePokemon: (isAll: boolean, name: string) => void;
}

const ModalConfirm = ({ openModal, setModal, pokemonRelease = '', handleReleasePokemon }: ModalConfirmProps) => {
  return (
    <Modal openModal={openModal} onClose={() => setModal(false)}>
      <div className="">
        <div className="modal-delete">
          <div className="modal-delete--content">
            <Dialog.Title as="h3" className="modal-delete--text">
              Delete {formatUpperCaseFirstLetter(pokemonRelease)}
            </Dialog.Title>
            <div className="mt2">
              <p className="modal-delete--subtext">
                {pokemonRelease ? (
                  <>Are you sure you want to delete this pokemon? It will be lost in the My pokemon</>
                ) : (
                  <>Are you sure you want to delete ALL the pokemon? It will be lost in the My pokemon</>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-delete--btn">
        <button
          type="button"
          className="waves-effect waves-light btn-small"
          onClick={() => handleReleasePokemon(!pokemonRelease ? true : false, pokemonRelease)}
        >
          OK
        </button>
        <button
          type="button"
          className="waves-effect waves-light btn-small  grey  mr2"
          onClick={() => setModal(false)}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default ModalConfirm;
