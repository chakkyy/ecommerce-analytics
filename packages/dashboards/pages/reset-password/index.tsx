import { useEffect, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styled from 'styled-components';
import { checkAuthLogin } from '@utils/checkAuth';
import Input from '@ui/input';
import ResetPasswordHeader from '@components/reset-password/reset-password-header';
import ChatBase from '@components/head/chatbase';
import Button from '@ui/button';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { Theme } from '../../theme/theme';

const StyledForm = styled.form`
  width: 604px;
  margin: 0 auto;
  padding: 72px 0 40px 0;
  display: flex;
  flex-direction: column;
  gap: 34px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    width: auto;
    padding: 56px 24px 40px;
  }
`;

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    margin-bottom: 10px;
  }
`;

const StyledButtonWrapper = styled.div`
  max-width: 229px;
  margin: 0 auto;
  margin-top: 6px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    max-width: 100%;
    width: 100%;
    margin-top: 0px;
  }

  button {
    @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
      width: 100%;
    }
  }
`;

type ResetPasswordData = {
  password: string;
  confirm_password: string;
};

const ResetPasswordScreen = () => {
  const { t } = useTranslation('reset-password');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    reset,
    handleSubmit,
    setError,
    getValues,
    formState: { errors, touchedFields, isDirty },
  } = useForm<ResetPasswordData>({
    mode: 'all',
    defaultValues: {
      password: '',
      confirm_password: '',
    },
  });

  useEffect(() => {
    setError('password', { type: 'manual', message: String(t('REQUIRED_PASS')) });
    setError('confirm_password', { type: 'manual', message: String(t('REQUIRED_CONFIRM_PASS')) });
  }, [setError, t]);

  const onSubmit = handleSubmit((/* data */) => {
    setIsLoading(true);

    // TODO: Remove the setTimeout and implement the password change correctly
    setTimeout(() => {
      reset();
      router.push('/login');
    }, 500);
  });

  const validData = Object.keys(errors).length === 0 && isDirty;
  const isSubmitButtonDisabled = isLoading || Object.keys(touchedFields).length === 0 || !validData;
  return (
    <>
      <Head>
        <title>ecommerce | Reset contraseña</title>
        <meta name='description' content='ecommerce Reset Contraseña' />
        <ChatBase />
      </Head>
      <ResetPasswordHeader />
      <StyledForm onSubmit={onSubmit}>
        <StyledInputWrapper>
          <Input
            type='password'
            label={t('NEW_PASS')}
            placeholder={t('PASS_PLACEHOLDER')}
            bottomMessage={String(t('PASS_BOTTOM_MESSAGE'))}
            bottomMessageAlingLeft
            marginTop={0}
            isValid={!errors.password}
            touched={!!touchedFields.password}
            error={errors.password?.message}
            {...register('password', {
              required: String(t('PASS_REQUIRED')),
            })}
          />
          <Input
            type='password'
            label={t('REPEAT_PASS')}
            placeholder={t('PASS_PLACEHOLDER')}
            marginTop={32}
            isValid={!errors.confirm_password}
            touched={!!touchedFields.confirm_password}
            error={errors.confirm_password?.message}
            {...register('confirm_password', {
              required: String(t('PASS_REQUIRED')),
              validate: (val: string) => {
                const { password } = getValues();
                return password === val || String(t('PASS_DONT_MATCH'));
              },
            })}
          />
        </StyledInputWrapper>
        <StyledButtonWrapper>
          <Button width='229px' disabled={isSubmitButtonDisabled} type='submit'>
            {isLoading ? t('PROCESSING') : t('CONFIRM_PASS')}
          </Button>
        </StyledButtonWrapper>
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
      ...(await serverSideTranslations(locale, ['reset-password', 'common'], null, ['es', 'en', 'pt'])),
    },
  };
}

export default ResetPasswordScreen;
