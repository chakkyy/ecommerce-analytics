import { useForm } from 'react-hook-form';
import { GoogleUserDataType, PersonalDataForm } from '@interfaces/index';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useModal } from '@ebay/nice-modal-react';
import useGetMe from '@hooks/api/common/useGetMe';
import { toast, Slide } from 'react-toastify';
import styled from 'styled-components';
import Input from '@ui/input';
import PhoneInputComponent from '@ui/phone-input';
import {
  internationalNamesRegex,
  passwordLetterDigitRegex,
  passwordNoSpecialRegex,
  sameEmailRegex,
} from '@utils/regex';
import Button from '@ui/button';
import Spinner from '@ui/spinner';
import GoogleIcon from '@icons/google-icon';
import ValidateEmailPopup from '@ui/modals/validate-email-popup';
import { Theme } from '../../../theme/theme';

const StyledInputsContainer = styled.div``;

export const StyledForm = styled.form<{ settingsStyles?: boolean }>`
  margin-top: 16px;
  max-width: 604px;
  width: ${p => p.settingsStyles && '100%'};
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    margin-top: 8px;
    max-width: 604px;
    width: 100%;
  }
`;

export const StyledTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
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

const PersonalData = ({
  isLoading,
  withInvitation,
  invitationToken,
  handleStepChange,
  onCancel,
  onSave,
  onSubmit,
  settingsStyles,
}: {
  isLoading: boolean;
  withInvitation?: boolean;
  invitationToken?: string;
  settingsStyles?: boolean;
  handleStepChange: (action: 'next' | 'prev' | 'skip') => void;
  onCancel: () => void;
  onSave: () => void;
  onSubmit: (data: PersonalDataForm & { googleId: string; invitationToken?: string }) => Promise<any>;
}) => {
  useGetMe(userData => {
    if (userData?.firstName) {
      handleStepChange('next');
    }
  });
  const { t, i18n } = useTranslation('signup');
  const router = useRouter();
  const { pathname } = router;
  const settingsForm = '/personal_data';
  const [isGoogleLogin, setIsGoogleLogin] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    watch,
    getValues,
    setValue,
    setError,
    trigger,
    setFocus,
    control,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm<PersonalDataForm & { googleId: string; invitationToken?: string }>({
    mode: 'all',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      confirm_email: '',
      phoneNumber: '',
      password: '',
      confirm_password: '',
      googleId: '',
    },
  });

  const { show: showValidateEmail } = useModal(ValidateEmailPopup, { handleStepChange, email: getValues('email') });

  // validations
  const validData = Object.keys(errors).length === 0;
  const allFieldsNotDirty = Object.keys(dirtyFields).length !== 6;
  const allFieldsInvitationNotDirty = Object.keys(dirtyFields).length !== 7;

  const isSubmitButtonDisabled = allFieldsNotDirty || !validData;
  const isSubmitButtonInvitationDisabled = allFieldsInvitationNotDirty || !validData;

  const password = watch('password');
  const confirmPassword = watch('confirm_password');
  const passwordsMatch = password === confirmPassword;

  const email = watch('email');
  const confirmEmail = watch('confirm_email');
  const emailMatch = email === confirmEmail;

  const onSubmitForm = handleSubmit(async data => {
    try {
      if (!passwordsMatch) {
        return;
      }
      const payload = { ...data };
      payload.locale = i18n.language;
      if (withInvitation) {
        payload.invitationToken = invitationToken;
      }
      await onSubmit(data);
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      showValidateEmail({ handleStepChange });
      reset();
    } catch (error: any) {
      const { message, field } = error.response.data;
      const errorMessage = t(`ERRORS.${message as string}`);

      // the compiler throws an error when passing a string variable to setError
      // so switch is used and a string literal is passed

      switch (field) {
        case 'firstName':
          setError('firstName', { type: 'custom', message: errorMessage });
          break;
        case 'lastName':
          setError('lastName', { type: 'custom', message: errorMessage });
          break;
        case 'password':
          setError('password', { type: 'custom', message: errorMessage });
          break;
        case 'email':
          setError('email', { type: 'custom', message: errorMessage });
          break;
        default:
          break;
      }
    }
  });

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleSave = () => {
    onSave();
  };

  const googleSignup = () => {
    router.push('/api/auth/google/signup');
  };

  useEffect(() => {
    (async () => {
      try {
        const params = new URLSearchParams(window.location.search);
        const userDataUrl = params.get('userData');
        const error = params.get('error');
        if (userDataUrl) {
          setIsGoogleLogin(true);
          const json = Buffer.from(userDataUrl, 'base64').toString();
          const userData: GoogleUserDataType = JSON.parse(json);

          setValue('firstName', userData.firstName, { shouldDirty: true, shouldValidate: true });
          setValue('lastName', userData.lastName, { shouldDirty: true, shouldValidate: true });
          setValue('email', userData.email, { shouldDirty: true, shouldValidate: false });
          setValue('googleId', userData.googleId);
          setValue('password', userData.password, { shouldDirty: true, shouldValidate: false });
          setValue('confirm_password', userData.password, { shouldDirty: true, shouldValidate: false });
          setFocus('firstName');
          setFocus('lastName');
          if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
          }
          await trigger(['firstName', 'lastName']);
        } else if (error) {
          toast.error(t(`ERRORS.EMAIL_ALREADY_REGISTERED_ERROR`), {
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
        router.push('/');
      }
    })();
  }, [router, setValue, trigger, setFocus, t]);

  return (
    <StyledForm data-aos='fade-left' data-aos-duration='500' settingsStyles={settingsStyles}>
      <StyledTitleContainer>
        <StyledFormTitle>{t('PERSONAL_DATA')}</StyledFormTitle>
      </StyledTitleContainer>

      <StyledInputsContainer>
        <Input
          label={t('FIRST_NAME')}
          placeholder='Matías'
          marginTop={0}
          isValid={!errors.firstName}
          touched={!!touchedFields.firstName}
          error={errors.firstName?.message}
          {...register('firstName', {
            required: String(t('REQUIRED.NAME')),
            pattern: {
              value: internationalNamesRegex,
              message: String(t('PATTERN.NAME')),
            },
          })}
        />
        <Input
          label={t('LAST_NAME')}
          placeholder='Martínez'
          isValid={!errors.lastName}
          touched={!!touchedFields.lastName}
          error={errors.lastName?.message}
          {...register('lastName', {
            required: String(t('REQUIRED.LAST_NAME')),
            pattern: {
              value: internationalNamesRegex,
              message: String(t('PATTERN.LAST_NAME')),
            },
          })}
        />
        <Input
          isDisabled={isGoogleLogin}
          label={t('EMAIL')}
          type='email'
          placeholder='matias@gmail.com'
          isValid={!errors.email}
          touched={!!touchedFields.email}
          error={errors.email?.message}
          {...register('email', {
            required: String(t('REQUIRED.EMAIL')),
            pattern: {
              value: sameEmailRegex,
              message: String(t('PATTERN.EMAIL')),
            },
          })}
        />

        {withInvitation && (
          <Input
            label={t('CONFIRM_EMAIL')}
            type='email'
            onPaste={handlePaste}
            placeholder='matias@gmail.com'
            isValid={!errors.confirm_email && !errors.email}
            touched={!!touchedFields.confirm_email}
            error={errors.confirm_email?.message}
            emailMatch={emailMatch && dirtyFields.confirm_email && !errors.email}
            {...register('confirm_email', {
              required: String(t('REQUIRED.EMAIL')),
              pattern: {
                value: sameEmailRegex,
                message: String(t('PATTERN.CONFIRM_EMAIL')),
              },
              validate: value => value === email || String(t('REQUIRED.EMAIL_MATCH')),
            })}
          />
        )}

        <PhoneInputComponent label={t('PHONE')} control={control} />

        {pathname !== settingsForm && !isGoogleLogin && (
          <>
            <Input
              label={t('PASSWORD')}
              type='password'
              placeholder={String(t('PLACEHOLDER_PASSWORD'))}
              bottomMessageAlingLeft
              bottomMessage={String(t('PASSWORD_PATTERN'))}
              isValid={!errors.password}
              touched={!!touchedFields.password}
              error={errors.password?.message}
              {...register('password', {
                required: String(t('REQUIRED.PASSWORD')),
                validate: value => {
                  if (!value) return String(t('REQUIRED.PASSWORD'));
                  if (!passwordNoSpecialRegex.test(value)) return String(t('PATTERN.PASSWORD'));
                  if (value.length < 6) return String(t('PATTERN.PASSWORD_MIN'));
                  if (!passwordLetterDigitRegex.test(value)) return String(t('PATTERN.LETTER_DIGIT'));
                  if (value.length > 12) return String(t('PATTERN.PASSWORD_MAX'));
                  return true;
                },
              })}
            />
            <Input
              label={t('CONFIRM_PASSWORD')}
              type='password'
              onPaste={handlePaste}
              placeholder={String(t('PLACEHOLDER_PASSWORD'))}
              marginTop={34}
              passwordsMatch={passwordsMatch && dirtyFields.confirm_password && !errors.password}
              isValid={!errors.confirm_password && !errors.password}
              touched={!!touchedFields.confirm_password}
              error={errors.confirm_password?.message}
              {...register('confirm_password', {
                required: String(t('REQUIRED.CONFIRM_PASSWORD')),
                validate: value => value === password || String(t('REQUIRED.PASSWORD_MATCH')),
              })}
            />
          </>
        )}

        {pathname === settingsForm && (
          <>
            {' '}
            <Input
              label={t('CURRENT_PASSWORD')}
              type='password'
              placeholder={String(t('PLACEHOLDER_PASSWORD'))}
              bottomMessage={t('login:FORGOT_PASSWORD')}
              isValid={!errors.password}
              touched={!!touchedFields.password}
              error={errors.password?.message}
              {...register('password', {
                required: String(t('REQUIRED.PASSWORD')),
                validate: value => {
                  if (!value) return String(t('REQUIRED.PASSWORD'));
                  if (!passwordNoSpecialRegex.test(value)) return String(t('PATTERN.PASSWORD'));
                  if (value.length < 6) return String(t('PATTERN.PASSWORD_MIN'));
                  if (!passwordLetterDigitRegex.test(value)) return String(t('PATTERN.LETTER_DIGIT'));
                  if (value.length > 12) return String(t('PATTERN.PASSWORD_MAX'));
                  return true;
                },
              })}
            />
            <Input
              label={t('NEW_PASSWORD')}
              type='password'
              bottomMessage={String(t('PASSWORD_PATTERN'))}
              placeholder={String(t('PLACEHOLDER_PASSWORD'))}
              marginTop={34}
              isValid={!errors.confirm_password && !errors.password}
              touched={!!touchedFields.confirm_password}
              error={errors.confirm_password?.message}
              {...register('confirm_password', {
                required: String(t('REQUIRED.CONFIRM_PASSWORD')),
              })}
            />{' '}
          </>
        )}
      </StyledInputsContainer>

      <StyledButtonsContainer>
        {pathname !== settingsForm ? (
          <>
            <Button variant='secondary' onClick={handleCancel} type='button'>
              {t('CANCEL')}
            </Button>
            <Button
              onClick={onSubmitForm}
              disabled={withInvitation ? isSubmitButtonInvitationDisabled : isSubmitButtonDisabled}
              icon={isLoading ? <Spinner /> : null}>
              {t('NEXT')}
            </Button>
          </>
        ) : (
          <>
            <Button variant='secondary' onClick={handleCancel} type='button'>
              {t('CANCEL')}
            </Button>
            <Button icon={isLoading ? <Spinner /> : null} onClick={handleSave}>
              {t('SAVE')}
            </Button>
          </>
        )}
      </StyledButtonsContainer>
    </StyledForm>
  );
};

export default PersonalData;
