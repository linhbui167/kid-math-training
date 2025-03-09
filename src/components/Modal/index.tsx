"use client"

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 flex items-center justify-center"
        onClose={onClose}
      >
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm"></div>

        <Transition.Child
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="relative bg-white  rounded-xl p-6 shadow-lg max-w-md w-full mx-auto">
            {/* Modal Header */}
            <Dialog.Title as="h2" className="text-xl font-semibold">
              {title}
            </Dialog.Title>

            {/* Modal Content */}
            <div className="mt-4">{children}</div>

            {/* Close Button */}
            <button
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};

export default Modal;
