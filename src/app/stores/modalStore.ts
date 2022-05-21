import { makeAutoObservable } from 'mobx';

interface Modal {
  open: boolean;
  body: JSX.Element | null;
}

interface Snackbar {
  open: boolean;
  type?: string;
  message?: string;
}

export default class ModalStore {
  modal: Modal = {
    open: false,
    body: null,
  };

  snackbar: Snackbar = {
    open: false,
  };

  constructor() {
    makeAutoObservable(this);
  }

  openModal = (content: JSX.Element) => {
    this.modal.open = true;
    this.modal.body = content;
  };

  closeModal = (event: object, reason: string) => {
    if (reason === 'backdropClick') return;
    this.modal.open = false;
    this.modal.body = null;
  };

  updateModalBody = (content: JSX.Element) => {
    this.modal = { ...this.modal, body: content };
  };

  openSnackBar = (message: string) => {
    this.snackbar.open = true;
    this.snackbar.message = message;
  };

  cloesSnackBar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    this.snackbar.open = false;
  };
}
