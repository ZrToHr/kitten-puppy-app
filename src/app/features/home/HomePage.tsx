import React, { useEffect } from 'react';
import { Snackbar } from '@mui/material';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import ModalContainer from '../../common/modal/ModalContainer';
import Login from '../auth/Login';
import bgimg from '../../assets/auth_background.jpg';

export default function HomePage() {
  const navigate = useNavigate();

  const StyledHomePage = styled.div`
    height: 100%;
    background: url(${bgimg});
    background-repeat: no-repeat;
    background-size: cover;
  `;

  return (
    <StyledHomePage>
      <ModalContainer />
    </StyledHomePage>
  );
}
