import NiceModal, { useModal } from '@ebay/nice-modal-react';
import Popup from '@ui/popup';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const QuitSettingsModal = NiceModal.create(() => {
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
      title={t('CONFIRM_QUIT')}
      description={t('QUIT_SETTINGS_DESCRIPTION')}
      confirmText={t('QUIT')}
      cancelText={t('KEEP_FILLING')}
    />
  );
});

export default QuitSettingsModal;
