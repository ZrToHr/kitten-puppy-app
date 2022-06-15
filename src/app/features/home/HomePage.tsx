import React, { useEffect } from 'react';
import { Snackbar } from '@mui/material';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import ModalContainer from '../../common/modal/ModalContainer';
import Login from '../auth/Login';
import bgimg from '../../assets/auth_background.jpg';
import { useAppDispatch } from '../../store/store-hooks';
import { openModal } from '../../common/modal/modal-slice';

export default function HomePage() {
  const navigate = useNavigate();
  const isLoggedIn = false;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      navigate('asdfasdf', { replace: true });
    } else {
      dispatch(openModal(<Login />));
    }
  }, [isLoggedIn]);

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
