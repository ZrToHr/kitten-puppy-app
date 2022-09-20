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

  const cards = [
    'https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/3/3a/TheLovers.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/RWS_Tarot_02_High_Priestess.jpg/690px-RWS_Tarot_02_High_Priestess.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg',
  ];

  return (
    <div className="deck-container">
      <div className="deck-backdrop">
        {isLoggedIn ? <AvatarMenu /> : null}
        <ImageDeck cards={photoUrls} />
      </div>
    </div>
  );
}
