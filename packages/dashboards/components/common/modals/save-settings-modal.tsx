import NiceModal, { useModal } from '@ebay/nice-modal-react';
import Popup from '@ui/popup';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const SaveSettingsModal = NiceModal.create(() => {
  const { remove } = useModal();
  const router = useRouter();
  const { t } = useTranslation('signup');

  const handleRedirect = () => {
    remove();
    router.push('/');
  };

  return (
    <Popup
      isOpen
      onClose={remove}
      onConfirm={handleRedirect}
      description='&nbsp;'
      title={t('SAVE_CHANGES')}
      confirmText={t('SAVE')}
      cancelText={t('CANCEL')}
    />
  );
});

export default SaveSettingsModal;
