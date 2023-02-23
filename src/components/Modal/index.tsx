import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface ModalProps {
  children: React.ReactNode;
  openModal: boolean;
  onClose: () => void;
}

const Modal = ({ children, openModal, onClose }: ModalProps) => {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={openModal} as={Fragment}>
      <Dialog as="div" className="modal-box" initialFocus={cancelButtonRef} onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="transition"
          enterFrom="opa-0"
          enterTo="opa"
          leave="leave-modal"
          leaveFrom="opa"
          leaveTo="opa-0"
        >
          <div className="modal-bg inset" />
        </Transition.Child>

        <div className="modal-content">
          <div className="modal-content">
            <Transition.Child
              as={Fragment}
              enter="transition"
              enterFrom="opa-0 tranlate "
              enterTo="opa translate-y-0 "
              leave="leave-modal"
              leaveFrom="opa translate-y-0"
              leaveTo="opacity-0 tranlate"
            >
              <Dialog.Panel className="modal-content--block">
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
