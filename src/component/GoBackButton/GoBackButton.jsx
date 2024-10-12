import React from 'react';
import './GoBackButton.css';
import { useNavigate, useNavigation } from 'react-router-dom';

const GoBackButton = () => {
    const navigation = useNavigate()
  return (
      <div className="button-goback" onClick={()=> navigation(-1)}>
        {'<'}
      </div>
  );
};

export default GoBackButton;
