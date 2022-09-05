import React from 'react';
import { useLocation } from 'react-router-dom';
import { validate as isValidUUID } from 'uuid';
import ImageDeck from './ImageDeck';
import AvatarMenu from '../../common/menu/AvatarMenu';
import { useAppDispatch, useAppSelector } from '../../store/store-hooks';

export default function GalleryView() {
  const dispatch = useAppDispatch();

  const albumPath = useLocation().pathname.slice(1);

  if (!isValidUUID(albumPath)) return null;

  const { isLoggedIn } = useAppSelector((state) => state.auth);

  return (
    <div className="deck-container">
      <div className="deck-backdrop">
        {isLoggedIn ? <AvatarMenu /> : null}
        <ImageDeck />
      </div>
    </div>
  );
}
