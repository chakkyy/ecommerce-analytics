import NiceModal, { useModal } from '@ebay/nice-modal-react';
import UserIcon from '@icons/user-icon';
import Popup from '@ui/popup';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const InviteUserSuccessPopup = NiceModal.create(() => {
  const { remove } = useModal();
  const router = useRouter();
  const { t } = useTranslation('signup');

  const handleRedirect = () => {
    remove();
    router.push('/dashboards');
  };

  return (
    <Popup
      isOpen
      onClose={handleRedirect}
      onConfirm={handleRedirect}
      titleIcon={<UserIcon width={32} height={32} fill='#004DBC' />}
      title={t('FINISH_MODAL.TITLE')}
      description={t('FINISH_MODAL.BODY')}
      confirmText={t('FINISH_MODAL.BUTTON')}
      hideCancelButton
    />
  );
});

export default InviteUserSuccessPopup;
