import NiceModal, { useModal } from '@ebay/nice-modal-react';
import Popup from '@ui/popup';
import { useTranslation } from 'next-i18next';
import styled, { keyframes } from 'styled-components';
import LoaderIcon from '@icons/loader-icon';
import CircleCheckIcon from '@icons/circle-check-icon';
import CircleErrorIcon from '@icons/error-icon';
import { Theme } from '../../../theme/theme';

type Props = {
  status: 'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR';
  handleStepChange: (action: 'next' | 'prev' | 'skip') => void;
};

enum SyncEcommerceStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

const animateDash = keyframes`
from {
  transform: rotate(0deg)
}
to{
  transform: rotate(360deg)
}
`;

const StyledLoaderIcon = styled.div`
  padding: 10px 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }: { theme: Theme }) => theme.colors.blue};

  animation: ${animateDash} 1s linear infinite;
`;

const SyncEcommerceStatusModal = NiceModal.create(({ status, handleStepChange }: Props) => {
  const { remove } = useModal();
  const { t } = useTranslation('signup');

  const handleSuccessfulSync = () => {
    handleStepChange('next');
    remove();
  };

  const renderModal = () => {
    switch (status) {
      case SyncEcommerceStatus.LOADING:
        return (
          <Popup
            isOpen={status === SyncEcommerceStatus.LOADING}
            onClose={remove}
            title={t('SYNC_ECOMMERCE_ALT')}
            subtitleIcon={
              <StyledLoaderIcon>
                <LoaderIcon />
              </StyledLoaderIcon>
            }
            subtitle={t('SYNC_LOADING_LABEL')}
            description={t('SYNC_LOADING_SUBTITLE')}
            confirmText={t('CANCEL')}
            onConfirm={remove}
            hideCancelButton
            hideConfirmButton
            showClose={false}
          />
        );
      case SyncEcommerceStatus.SUCCESS:
        return (
          <Popup
            isOpen={status === SyncEcommerceStatus.SUCCESS}
            onClose={handleSuccessfulSync}
            title={t('SYNC_ECOMMERCE_ALT')}
            subtitleIcon={<CircleCheckIcon width={53} height={53} fill='#339F00' />}
            subtitle={t('SYNC_SUCCESS_LABEL')}
            description={t('SYNC_SUCCESS_SUBTITLE')}
            confirmText={t('NEXT')}
            onConfirm={handleSuccessfulSync}
            hideCancelButton
          />
        );
      case SyncEcommerceStatus.ERROR:
        return (
          <Popup
            isOpen={status === SyncEcommerceStatus.ERROR}
            onClose={remove}
            title={t('SYNC_ECOMMERCE_ALT')}
            subtitleIcon={<CircleErrorIcon width={53} height={53} fill='#FF0000' />}
            subtitle={t('SYNC_ERROR_LABEL')}
            description={t('SYNC_ERROR_SUBTITLE')}
            confirmText={t('TRY_AGAIN')}
            onConfirm={remove}
            hideCancelButton
          />
        );
      default:
        return null;
    }
  };

  return renderModal();
});

export default SyncEcommerceStatusModal;
