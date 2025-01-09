import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaRegSquare, FaSquare } from "react-icons/fa";
import "./Checkbox.scss";

export default function Checkbox({ selectAll }) {
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (!selectAll) {
      setSelected(false);
    }
  }, [selectAll]);

  return (
    <>
      {selected || selectAll ? (
        <FaSquare onClick={() => setSelected(false)} className="checkbox" />
      ) : (
        <FaRegSquare
          onClick={() => setSelected(true)}
          className="checkbox-selected"
        />
      )}
    </>
  );
}

Checkbox.propTypes = {
  selectAll: PropTypes.bool.isRequired,
};
