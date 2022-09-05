import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import ModalContainer from '../../common/modal/ModalContainer';
import bgimg from '../../assets/auth_background.jpg';
import { useAppDispatch, useAppSelector } from '../../store/store-hooks';
import { openSignIn } from '../../common/modal/modal-slice';

export default function HomePage() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { isLoggedIn, albumId } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      navigate(albumId, { replace: true });
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
