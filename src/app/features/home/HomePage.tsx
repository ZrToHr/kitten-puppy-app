import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Snackbar } from '@mui/material';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import ModalContainer from '../../common/modals/ModalContainer';
import { useStore } from '../../stores/store';
import Login from '../auth/Login';
import bgimg from '../../assets/auth_background.jpg';

export default observer(() => {
  const { authStore, modalStore } = useStore();
  const navigate = useNavigate();

  const StyledHomePage = styled.div`
    height: 100%;
    background: url(${bgimg});
    background-repeat: no-repeat;
    background-size: cover;
  `;

  useEffect(() => {
    if (authStore.isLoggedIn) {
      navigate('/manage');
    } else {
      modalStore.openModal(<Login />);
    }
  }, [authStore, modalStore]);

  return (
    <StyledHomePage>
      <ModalContainer />
    </StyledHomePage>
  );
});
