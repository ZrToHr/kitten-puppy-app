import React from 'react';
import ImageDeck from './ImageDeck';
import AvatarMenu from '../../common/menu/AvatarMenu';
import { useAppDispatch, useAppSelector } from '../../store/store-hooks';

export default function GalleryView() {
  const dispatch = useAppDispatch();

  const { isAuthing: isSubmitting } = useAppSelector((state) => state.auth);

  return (
    <div className="deck-container">
      <div className="deck-backdrop">
        <AvatarMenu />
        <ImageDeck />
      </div>
    </div>
  );
}
