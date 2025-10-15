import NiceModal, { useModal } from '@ebay/nice-modal-react';
import MailIcon from '@icons/mail-icon';
import Popup from '@ui/popup';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

type Props = {
  email: string;
};
const SendEmailPopup = NiceModal.create(({ email }: Props) => {
  const { remove } = useModal();
  const router = useRouter();
  const { t } = useTranslation('forgot-password');

  const handleRedirect = () => {
    remove();
    router.push('/reset-password');
  };

  return (
    <Popup
      isOpen
      onClose={remove}
      titleIcon={<MailIcon width={32} height={32} fill='#004DBC' />}
      title={t('MODAL.TITLE')}
      subtitle={t('MODAL.ALMOST_THERE')}
      description={t('MODAL.BODY', { email })}
      confirmText={t('MODAL.CONTINUE')}
      onConfirm={handleRedirect}
      hideCancelButton
    />
  );
});

export default SendEmailPopup;
