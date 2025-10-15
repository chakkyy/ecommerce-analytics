import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import useSaveVTEX from '@hooks/api/ecommerce/useSaveVTEX';
import { useModal } from '@ebay/nice-modal-react';
import Button from '@ui/button';
import Input from '@ui/input';
import SyncEcommerceStatusModal from '@ui/modals/sync-ecommerce-status-popup';
import { SyncEcommerceDataForm } from '@interfaces/index';
import TextBody from '@ui/text-body';
import { Theme } from '../../../theme/theme';

export const StyledForm = styled.form`
  margin-top: 16px;
  max-width: 604px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    margin-top: 8px;
    max-width: 604px;
    width: 100%;
  }
`;

const StyledInputsContainer = styled.div``;

export const StyledTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
  align-items: flex-start;
  flex-direction: column;
  gap: 16px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    align-items: flex-start;
    flex-direction: column;
    margin-bottom: 32px;
    gap: 8px;
    button {
      width: 100%;
      margin-top: 16px;
    }
  }
`;

export const StyledFormTitle = styled.h4`
  color: ${({ theme }: { theme: Theme }) => theme.colors.blue};
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    font-size: 24px;
  }
`;

export const StyledButtonsContainer = styled.div`
  margin-top: 40px;
  display: flex;
  gap: 24px;
  max-width: 604px;
  justify-content: flex-end;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    justify-content: flex-end;
    flex-direction: column-reverse;
    gap: 0px;
    button {
      margin-top: 16px;
      width: 100%;
    }
  }
`;

const regExpForUrl =
  /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

const SyncEcommerceStep = ({ handleStepChange }: { handleStepChange: (action: 'next' | 'prev' | 'skip') => void }) => {
  const { t } = useTranslation('signup');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm<SyncEcommerceDataForm>({
    mode: 'all',
    defaultValues: {
      url: '',
      publicKey: '',
      secretKey: '',
    },
  });

  const validData = Object.keys(errors).length === 0;
  const allFieldsNotDirty = Object.keys(dirtyFields).length !== 3;
  const isSubmitButtonDisabled = allFieldsNotDirty || isLoading || !validData;

  const { mutateAsync } = useSaveVTEX();
  const { remove: removeCurrentModal, show } = useModal(SyncEcommerceStatusModal);

  const onSubmit = handleSubmit(async data => {
    try {
      setIsLoading(true);
      show({ status: 'LOADING', handleStepChange });
      const saveVTEXResult = await mutateAsync([
        {
          ecommerceKey: 'VTEX-1',
          keyType: 'public_key',
          keyValue: data.publicKey,
        },
        {
          ecommerceKey: 'VTEX-1',
          keyType: 'secret_key',
          keyValue: data.secretKey,
        },
        {
          ecommerceKey: 'VTEX-1',
          keyType: 'url',
          keyValue: data.url,
        },
      ]);
      if (saveVTEXResult.status === 401) {
        show({ status: 'ERROR', handleStepChange });
      } else {
        removeCurrentModal();
        show({ status: 'SUCCESS', handleStepChange });
      }
    } catch (error) {
      show({ status: 'ERROR', handleStepChange });
    } finally {
      setIsLoading(false);
      reset();
    }
  });

  return (
    <div data-aos='fade-left' data-aos-duration='500'>
      <StyledForm>
        <StyledTitleContainer>
          <StyledFormTitle>{t('SYNC_ECOMMERCE')}</StyledFormTitle>
          <TextBody variant='light'>{t('SUB_SYNC_ECOMMERCE')}</TextBody>
        </StyledTitleContainer>
        <StyledInputsContainer>
          <Input
            label={t('LABEL.URL')}
            placeholder='https://www.vtex.com/business'
            marginTop={0}
            isValid={!errors.url}
            touched={!!touchedFields.url}
            error={errors.url?.message}
            {...register('url', {
              required: String(t('REQUIRED.URL')),
              pattern: {
                value: regExpForUrl,
                message: String(t('PATTERN.URL')),
              },
            })}
          />
          <Input
            label={t('LABEL.PUBLIC_KEY')}
            placeholder='90123019'
            isValid={!errors.publicKey}
            touched={!!touchedFields.publicKey}
            error={errors.publicKey?.message}
            {...register('publicKey', {
              required: String(t('REQUIRED.PUBLIC_KEY')),
            })}
          />
          <Input
            label={t('LABEL.SECRET_KEY')}
            placeholder='9201380192391908'
            isValid={!errors.secretKey}
            touched={!!touchedFields.secretKey}
            error={errors.secretKey?.message}
            {...register('secretKey', {
              required: String(t('REQUIRED.SECRET_KEY')),
            })}
          />
        </StyledInputsContainer>
        <StyledButtonsContainer>
          <Button disabled={isSubmitButtonDisabled} onClick={onSubmit}>
            {t('LINK')}
          </Button>
        </StyledButtonsContainer>
      </StyledForm>
    </div>
  );
};

export default SyncEcommerceStep;
