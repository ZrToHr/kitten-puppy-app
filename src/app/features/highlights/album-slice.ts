/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Album, AlbumPhoto, AlbumFile } from '../../models/Album';

interface AlbumState {
  userId: string;
  albumPhotos: AlbumPhoto[];
}

const initialState: AlbumState = {
  userId: '',
  albumPhotos: [],
};

const albumSlice = createSlice({
  name: 'albumStore',
  initialState,
  reducers: {
    RetrieveAlbum(state, action: PayloadAction<string>) {},
    ReceivedAlbum(state, action: PayloadAction<Album>) {
      console.log('test album: ', action.payload);
      state.albumPhotos = action.payload.AlbumPhotos;
      state.userId = action.payload.UserId;
    },
    UploadToAlbum(state, action: PayloadAction<AlbumFile>) {},
  },
});

export const { RetrieveAlbum, ReceivedAlbum, UploadToAlbum } = albumSlice.actions;
export default albumSlice.reducer;
