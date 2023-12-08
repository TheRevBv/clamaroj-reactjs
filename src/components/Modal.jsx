import { useState } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  const [modalOpen, setModalOpen] = useState(isOpen);

  const closeModal = () => {
    setModalOpen(false);
    onClose();
  };

  // if (!modalOpen) return null;

  return (
    <>
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex justify-center items-center ${
          isOpen ? "" : "hidden"
        }`}
      >
        <div className="bg-white rounded-lg shadow-lg w-1/2 flex flex-col align-center justify-center py-4 px-8">
          {children}
        </div>
      </div>
    </>
  );
};

export default Modal;
