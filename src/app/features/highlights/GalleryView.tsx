import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { validate as isValidUUID } from 'uuid';
import ImageDeck from './ImageDeck';
import AvatarMenu from '../../common/menu/AvatarMenu';
import { useAppDispatch, useAppSelector } from '../../store/store-hooks';
import { RetrieveAlbum } from './album-slice';

export default function GalleryView() {
  const dispatch = useAppDispatch();

  const albumPath = useLocation().pathname.slice(1);

  if (!isValidUUID(albumPath)) return null;

  const { isLoggedIn } = useAppSelector((state) => state.auth);

  const { albumPhotos } = useAppSelector((state) => state.album);

  const photoUrls = albumPhotos.map((i) => i.PhotoSignedUrl!).reverse();

  useEffect(() => {
    dispatch(RetrieveAlbum(albumPath));
  }, []);

  return (
    <div className="deck-container">
      <div className="deck-backdrop">
        {isLoggedIn ? <AvatarMenu /> : null}
        <ImageDeck cards={photoUrls} />
      </div>
    </div>
  );
}
