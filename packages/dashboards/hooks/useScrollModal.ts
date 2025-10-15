import { use } from 'i18next';
import { useEffect } from 'react';
import ReactModal from 'react-modal';

interface Props {
  isOpen: boolean;
}

export const useScrollModal = ({ isOpen }: Props) => {
  useEffect(() => {
    ReactModal.setAppElement('body');
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
};

export default useScrollModal;
