import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import Checkbox from '@ui/checkbox';
import Input from '@ui/input';
import Button from '@ui/button';
import GoogleIcon from '@icons/google-icon';
import { emailRegex } from '@utils/regex';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import useLoginUser from '@hooks/api/auth/useLoginUser';
import Loader from '@icons/loader';
import { toast, Slide } from 'react-toastify';
import { Theme } from '../../theme/theme';

const StyledForm = styled.form`
  width: 604px;
  margin: 0 auto;
  padding: 72px 0 40px 0;
  display: flex;
  flex-direction: column;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    width: auto;
    padding: 56px 24px 40px;
  }
`;

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 8px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    margin-bottom: 10px;
  }
`;

const StyledButtonWrapper = styled.div`
  max-width: 123px;
  margin: 0 auto;
  margin-top: 40px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    max-width: 100%;
    width: 100%;
    margin-top: 41px;
  }

  button {
    @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
      width: 100%;
    }
  }
`;

const StyledGoogleLoginWrapper = styled.div`
  max-width: 240px;
  margin: 0 auto;
  padding-top: 40px;
  padding-bottom: 100px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    max-width: 100%;
    width: 100%;
    padding: 40px 24px 80px;
  }
  button {
    @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
      width: 100%;
    }
  }
`;

// a container for loader should take all height of the screen
const StyledLoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  svg {
    width: 50px;
    height: 50px;
  }
`;

type LoginData = {
  email: string;
  password: string;
  remember_account: boolean;
};

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation(['login', 'signup']);
  const router = useRouter();
  const { mutateAsync: mutateAsyncLogin, isLoading: isLoadingLogin } = useLoginUser();

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm<LoginData>({
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
      remember_account: false,
    },
  });

  const onSubmit = handleSubmit(async data => {
    try {
      setIsLoading(true);
      await mutateAsyncLogin({ email: data.email, password: data.password });
      await router.push('/dashboards');
    } catch {
      setError('password', {
        type: 'manual',
        message: String(t('ERRORS.INVALID_CREDENTIALS')),
      });
      setError('email', { type: 'focus' }, { shouldFocus: true });
    } finally {
      setIsLoading(false);
    }
  });

  const googleSignin = () => {
    router.push('/api/auth/google/login');
  };

  useEffect(() => {
    (async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const error = params.get('error');
        if (error && error === 'userNotExists') {
          toast.error(t(`ERRORS.USER_NOT_EXISTS`), {
            position: 'bottom-center',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            transition: Slide,
            // prevent showing the toast twice
            toastId: 1,
          });
        }
      } catch (err) {
        /* eslint no-console: ["error", { allow: ["warn", "error"] }] */
        console.error(err);
        router.push('/');
      }
    })();
  }, [router, setError, t]);

  const validData = Object.keys(errors).length === 0;
  const allRequiredFieldsNotDirty = !dirtyFields.email || !dirtyFields.password;
  const isSubmitButtonDisabled = allRequiredFieldsNotDirty || isLoading || !validData;

  if (isLoading || isLoadingLogin) {
    return (
      <StyledLoaderWrapper>
        <Loader />
      </StyledLoaderWrapper>
    );
  }

  return (
    <StyledForm>
      <StyledInputWrapper>
        <Input
          type='text'
          label={t('EMAIL')}
          placeholder='matias@gmail.com'
          marginTop={0}
          isValid={!errors.email}
          touched={!!touchedFields.email}
          error={errors.email?.message}
          {...register('email', {
            required: String(t('REQUIRED.EMAIL')),
            pattern: {
              value: emailRegex,
              message: String(t('PATTERN.EMAIL')),
            },
          })}
        />
        <Input
          type='password'
          label={t('PASSWORD')}
          placeholder={String(t('signup:PLACEHOLDER_PASSWORD'))}
          bottomMessage={t('FORGOT_PASSWORD')}
          forwardedAs='a'
          bottomHref='/forgot-password'
          marginTop={32}
          isValid={!errors.password}
          touched={!!touchedFields.password}
          error={errors.password?.message}
          {...register('password', {
            required: String(t('REQUIRED.PASSWORD')),
          })}
        />
      </StyledInputWrapper>
      <Checkbox label={String(t('REMEMBER_ACCOUNT'))} {...register('remember_account')} />
      <StyledButtonWrapper>
        <Button onClick={onSubmit} width='123px' disabled={isSubmitButtonDisabled} type='button'>
          {isLoading ? t('SIGNIN_IN') : t('SIGN_IN')}
        </Button>
      </StyledButtonWrapper>
    </StyledForm>
  );
};

export default LoginForm;
