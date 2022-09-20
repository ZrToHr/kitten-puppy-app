export interface Album {
  UserId: string;
  AlbumOwner: string;
  UserEmail: string;
  AlbumPhotos: AlbumPhoto[];
}

export interface AlbumPhoto {
  PhotoName: string;
  PhotoId: string;
  PhotoType: string;
  PhotoSignedUrl?: string;
}

export interface AlbumRetrieve {
  UserId: string;
}

export interface AlbumUpload {
  UserId: string;
  PhotoName: string;
  PhotoType: string;
}

export interface AlbumFile {
  UserId: string;
  PhotoFile: File;
}
