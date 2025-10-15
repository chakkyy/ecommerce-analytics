import { useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import Button from '@ui/button';
import Input from '@ui/input';
import Modal from '@ui/modal';
import Spinner from '@ui/spinner';
import TextArea from '@ui/textarea';
import InviteToDashboardModal from '@ui/modals/invite-users-dashboard-modal';
import { Theme } from '../../../theme/theme';

const StyledTitle = styled.h4`
  color: ${({ theme }: { theme: Theme }) => theme.colors.blue};
`;

const StyledForm = styled.form``;

const StyledButtonsWrapper = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 48px;
  justify-content: flex-end;
`;

type NewDashboardData = {
  title: string;
  description: string;
};

const NewDashboardModal = NiceModal.create(() => {
  const { remove } = useModal();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation('dashboards');
  const { show: showInviteUsersModal } = useModal(InviteToDashboardModal);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm<NewDashboardData>({
    mode: 'all',
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const onSubmit = handleSubmit(data => {
    setLoading(true);
    setTimeout(() => {
      // TODO push the data to the backend
      setLoading(false);
      remove();
      // ? We can't use await here because of temporary Timeout to simulate fetch
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      showInviteUsersModal({ isCreatingDashboard: true });
    }, 500);
  });

  const isSubmitButtonDisabled = loading || !dirtyFields.title;

  return (
    <Modal isOpen onClose={remove}>
      <StyledTitle>{t('NEW_DASHBOARD')}</StyledTitle>
      <StyledForm onSubmit={onSubmit}>
        <Input
          type='text'
          placeholder={t('NEW_DASHBOARD')}
          label={t('NAME')}
          isValid={!errors.title}
          touched={!!touchedFields.title}
          error={errors.title?.message}
          {...register('title', {
            required: String(t('REQUIRED.TITLE')),
          })}
        />
        <TextArea placeholder={t('PLACEHOLDER.MARKETING_INFO')} label={t('DESC')} {...register('description')} />
      </StyledForm>
      <StyledButtonsWrapper>
        <Button onClick={remove} variant='secondary'>
          {t('CANCEL')}
        </Button>
        <Button onClick={onSubmit} icon={loading ? <Spinner /> : null} disabled={isSubmitButtonDisabled}>
          {loading ? t('CREATING') : t('CREATE')}
        </Button>
      </StyledButtonsWrapper>
    </Modal>
  );
});

export default NewDashboardModal;
