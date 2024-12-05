import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const ModalContext = createContext(undefined);

const ModalProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState(null);

  return (
    <ModalContext.Provider value={{ activeModal, setActiveModal }}>
      {children}
    </ModalContext.Provider>
  );
};

ModalProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useModal = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  return context;
};

export { ModalProvider, useModal };
