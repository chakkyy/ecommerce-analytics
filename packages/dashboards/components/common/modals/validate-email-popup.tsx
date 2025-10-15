import NiceModal, { useModal } from '@ebay/nice-modal-react';
import MailIcon from '@icons/mail-icon';
import Popup from '@ui/popup';
import { useTranslation } from 'next-i18next';

type ValidateEmailPopupProps = {
  handleStepChange: (step: 'next') => void;
  email: string;
};

const ValidateEmailPopup = NiceModal.create(({ handleStepChange, email }: ValidateEmailPopupProps) => {
  const { remove } = useModal();
  const { t } = useTranslation('signup');

  const handleNext = () => {
    remove();
    handleStepChange('next');
  };

  return (
    <Popup
      isOpen
      onClose={handleNext}
      titleIcon={<MailIcon width={32} height={32} fill='#004DBC' />}
      title={t('MODAL_SIGN_UP_TITLE')}
      subtitle={t('MODAL_SIGN_UP_SUBTITLE')}
      description={t('SUCCESS_SIGN_UP_BODY', { email })}
      confirmText={t('CONTINUE')}
      onConfirm={handleNext}
      hideCancelButton
    />
  );
});

export default ValidateEmailPopup;
