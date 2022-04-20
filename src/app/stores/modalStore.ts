import { makeAutoObservable } from 'mobx';

interface Modal {
  open: boolean;
  body: JSX.Element | null;
}

export default class ModalStore {
  modal: Modal = {
    open: false,
    body: null,
  };

  msgBar = false;

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

  updateModalBoday = (content: JSX.Element) => {
    this.modal = { ...this.modal, body: content };
  };

  openMsgBar = () => {
    this.msgBar = true;
  };

  closeMsgBar = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    this.msgBar = false;
  };
}
