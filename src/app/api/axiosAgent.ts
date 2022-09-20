import { CognitoIdToken } from 'amazon-cognito-identity-js';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { Album, AlbumPhoto, AlbumRetrieve, AlbumUpload } from '../models/Album';
import authAgent from './authAgent';

axios.defaults.baseURL = 'https://x7g9oqlho2.execute-api.ap-southeast-2.amazonaws.com/dev';

axios.interceptors.request.use(
  (config) => {
    const token: CognitoIdToken = authAgent.getIdToken();
    if (token && config.headers) config.headers.Authorization = token.getJwtToken();
    return config;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(undefined, (error) => {
  throw error.response;
});

// intercepting  axios instance used for s3 put
const s3Client = axios.create();

const responseBody = (response: AxiosResponse) => response.data;

const errorResponse = (error: AxiosError) => error.message;

const album = {
  retrieve: (payload: AlbumRetrieve): Promise<Album> => axios.post<Album>('/retrieve', payload).then(responseBody),
  upload: (payload: AlbumUpload): Promise<AlbumPhoto> => axios.post<AlbumPhoto>('/upload', payload).then(responseBody),
  savePhoto: (signedUrl: string, file: File) =>
    s3Client
      .put(signedUrl, file, { headers: { 'Content-Type': file.type } })
      .then(responseBody)
      .catch(errorResponse),
};

export default { album };
