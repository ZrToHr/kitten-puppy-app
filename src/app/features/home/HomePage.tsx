import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Snackbar } from '@mui/material';
import styled from '@emotion/styled';
import ModalContainer from '../../common/modals/ModalContainer';
import { useStore } from '../../stores/store';
import { history } from '../../../index';
import Login from '../auth/Login';
import bgimg from '../../assets/auth_background.jpg';
import { CsmAlert } from '../../common/modals/CsmAlert';

export default observer(() => {
  const { authStore, modalStore } = useStore();

  const AuthWrapper = styled.div`
    height: 100%;
    background: url(${bgimg});
    background-repeat: no-repeat;
    background-size: cover;
  `;

  useEffect(() => {
    if (authStore.isLoggedIn) {
      history.push('/manage');
    } else {
      modalStore.openModal(<Login />);
    }
  }, [authStore, modalStore]);

  return (
    <AuthWrapper>
      <Snackbar
        open={modalStore.msgBar}
        onClose={modalStore.closeMsgBar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <CsmAlert
          onClose={modalStore.closeMsgBar}
          severity="error"
          sx={{ width: '100%' }}
        >
          This is a success message!
        </CsmAlert>
      </Snackbar>
      <ModalContainer />
    </AuthWrapper>
  );
});
