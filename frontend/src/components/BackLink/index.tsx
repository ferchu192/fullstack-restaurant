import React from 'react';

// Hooks
import { useNavigate } from 'react-router-dom';

// Icons
import { IoChevronBackOutline } from "react-icons/io5";

const BackLink = () => {

  const navigate = useNavigate();

  const onClick = () => {
    navigate(-1);
  };

  return (
    <IoChevronBackOutline
      id="back-arrow"
      style={{
        color: '#e4e3de',
        fontSize: '2.5rem',
        marginTop: 'auto',
        cursor: 'pointer',
      }}
      onClick={onClick}
    />
  )
};

export default BackLink;