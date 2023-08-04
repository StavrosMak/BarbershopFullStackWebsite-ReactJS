import React, { createContext, useState } from "react";

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
  const [openModal, setModal] = useState(false);

  return (
    <ModalContext.Provider value={{ openModal, setModal }}>
      {children}
    </ModalContext.Provider>
  );
};
