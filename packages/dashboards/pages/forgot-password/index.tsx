import { useEffect, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { show } from '@ebay/nice-modal-react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import Button from '@ui/button';
import Input from '@ui/input';
import SendEmailPopup from '@ui/modals/send-email-popup';
import ForgotPasswordHeader from '@components/forgot-password/forgot-password-header';
import ChatBase from '@components/head/chatbase';
import LeftArrow from '@icons/left-arrow';
import { checkAuthLogin } from '@utils/checkAuth';
import { Theme } from '../../theme/theme';

const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

const StyledForm = styled.form`
  width: 604px;
  margin: 0 auto;
  padding: 72px 0 40px 0;
  display: flex;
  flex-direction: column;
  gap: 32px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    width: auto;
    padding: 48px 24px 40px;
    gap: 32px;
  }
`;

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledButtonWrapper = styled.div`
  max-width: 229px;
  margin: 0 auto;
  margin-top: 8px;
  button {
    margin: 0 auto;
  }
  button {
    @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
      width: 100%;
    }
  }
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    max-width: 100%;
    margin-top: 8px;
    width: 100%;
  }
`;

const StyledPTopMessage = styled.p`
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
`;

const StyledPBottomMessage = styled.p`
  font-family: 'Roboto';
  font-weight: 300;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  margin-top: 20px;
  span {
    color: #1e4bb4;
    font-weight: 700;
    cursor: pointer;
  }
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    text-align: start;
  }
`;

const ClickHereSpan = styled.span`
  color: #1e4bb4;
  font-weight: 700;
`;

const LeftArrowLink = styled.a`
  width: 24px;
  height: 24px;
`;

type ForgotPasswordData = {
  email: string;
};

const ForgotPasswordScreen = () => {
  const { t } = useTranslation('forgot-password');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    formState: { errors, touchedFields, isDirty },
  } = useForm<ForgotPasswordData>({
    mode: 'all',
    defaultValues: {
      email: '',
    },
  });

  useEffect(() => {
    setError('email', { type: 'manual', message: String(t('REQUIRED_EMAIL')) });
  }, [setError, t]);

  const onSubmit = handleSubmit((/* data */) => {
    setIsLoading(true);
    show(SendEmailPopup, { email: getValues('email') });
    // TODO: Add call to api method for validating email and sending recover mail
  });

  const validData = Object.keys(errors).length === 0 && isDirty;
  const isSubmitButtonDisabled = isLoading || Object.keys(touchedFields).length === 0 || !validData;
  return (
    <>
      <Head>
        <title>ecommerce | Recuperar contraseña</title>
        <meta name='description' content='ecommerce Recuperar Contraseña' />
        <ChatBase />
      </Head>
      <ForgotPasswordHeader />
      <StyledForm onSubmit={onSubmit}>
        <LeftArrowLink href='/login'>
          <LeftArrow fill='#004DBC' />
        </LeftArrowLink>
        <StyledPTopMessage>{t('REASSURING_MESSAGE')}</StyledPTopMessage>
        <StyledInputWrapper>
          <Input
            type='email'
            label={t('USER_EMAIL')}
            placeholder={t('EMAIL_PLACEHOLDER')}
            marginTop={0}
            isValid={!errors.email}
            touched={!!touchedFields.email}
            error={errors.email?.message}
            {...register('email', {
              required: String(t('REQUIRED_EMAIL')),
              pattern: {
                value: emailRegex,
                message: String(t('EMAIL_ERROR')),
              },
            })}
          />
        </StyledInputWrapper>
        <StyledButtonWrapper>
          <Button width='240px' disabled={isSubmitButtonDisabled} type='submit'>
            {isLoading ? t('PROCESSING') : t('RESET_PASS')}
          </Button>
        </StyledButtonWrapper>
        <StyledPBottomMessage>
          {t('REPEAT_SEND_EMAIL.PART_1')}
          <ClickHereSpan
            onClick={() => {
              show(SendEmailPopup);
            }}>
            {t('REPEAT_SEND_EMAIL.PART_2')}
          </ClickHereSpan>
          {t('REPEAT_SEND_EMAIL.PART_3')}
        </StyledPBottomMessage>
      </StyledForm>
    </>
  );
};

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const destination = await checkAuthLogin(ctx);
  const locale = ctx.locale || 'en';

  if (destination) {
    return {
      redirect: {
        destination,
        permanent: false,
      },
    };
  }

  return {
    props: {
      ...(await serverSideTranslations(locale, ['forgot-password', 'common'], null, ['es', 'en', 'pt'])),
    },
  };
}

export default ForgotPasswordScreen;
