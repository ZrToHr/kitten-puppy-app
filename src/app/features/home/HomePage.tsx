import React, { useEffect } from 'react';
import { Snackbar } from '@mui/material';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import ModalContainer from '../../common/modal/ModalContainer';
import bgimg from '../../assets/auth_background.jpg';
import { useAppDispatch } from '../../store/store-hooks';
import { openSignIn } from '../../common/modal/modal-slice';
import { CheckAuthentication } from '../auth/auth-slice';

export default function HomePage() {
  const navigate = useNavigate();
  const isLoggedIn = false;

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(CheckAuthentication);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('asdfasdf', { replace: true });
    } else {
      dispatch(openSignIn());
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
