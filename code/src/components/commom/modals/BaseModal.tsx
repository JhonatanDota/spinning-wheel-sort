import React from "react";
import { IoClose } from "react-icons/io5";

interface BaseModalProps {
  title: string;
  setIsOpen: (isOpen: boolean) => void;
  children: React.ReactNode;
}

export default function BaseModal(props: BaseModalProps) {
  const { title, setIsOpen, children } = props;

  function handleBackgroundClick() {
    setIsOpen(false);
  }

  function handleModalClick(event: React.MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={handleBackgroundClick}
    >
      <div
        className="relative flex flex-col px-3 py-2 bg-[#020436] rounded-md shadow-lg"
        onClick={handleModalClick}
      >
        <button
          className="absolute top-1 right-1 text-red-400"
          onClick={function () {
            setIsOpen(false);
          }}
        >
          <IoClose />
        </button>

        <h2 className="mb-4 text-xl font-semibold text-white">{title}</h2>

        {children}
      </div>
    </div>
  );
}
