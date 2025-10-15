import { useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import Button from '@ui/button';
import Input from '@ui/input';
import Modal from '@ui/modal';
import Spinner from '@ui/spinner';
import TextArea from '@ui/textarea';
import { Theme } from '../../../theme/theme';

const StyledTitle = styled.h4`
  color: ${({ theme }: { theme: Theme }) => theme.colors.blue};
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    font-size: 24px;
    text-align: center;
  }
`;

const StyledForm = styled.form``;

const StyledButtonsWrapper = styled.div`
  display: flex;
  gap: 24px;
  margin-top: 48px;
  justify-content: flex-end;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    align-items: center;
    gap: 16px;
    button {
      width: 100%;
    }
  }
`;

type NewDashboardData = {
  title: string;
  description: string;
};

const SegmentsNewDashboardModal = NiceModal.create(() => {
  const { remove } = useModal();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation('dashboards');

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

  const onSubmit = handleSubmit(async () => {
    setLoading(true);
    try {
      setLoading(false);
      remove();
      await router.push('/recipe_conversions');
    } catch (err) {
      // show error
    }
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

export default SegmentsNewDashboardModal;
