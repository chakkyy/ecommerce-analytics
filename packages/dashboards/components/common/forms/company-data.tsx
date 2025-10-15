import styled from 'styled-components';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Controller, useForm } from 'react-hook-form';
import Input from '@ui/input';
import CustomSelect from '@ui/select';
import Button from '@ui/button';
import { internationalCompanyNamesRegex } from '@utils/regex';
import Spinner from '@ui/spinner';
import { CompanyDataForm, Country, Sector } from '@interfaces/index';
import useGetCountries from '@hooks/api/auth/useGetCountries';
import useGetSectors from '@hooks/api/common/useGetSectors';
import useGetMe from '@hooks/api/common/useGetMe';
import useSaveCompany from '@hooks/api/company/useSaveCompany';
import TextBody from '@ui/text-body';
import LogoDropzone from '../../signup/form/formStep/logo-dropzone';
import { Theme } from '../../../theme/theme';

const StyledInputsContainer = styled.div``;

export const StyledForm = styled.form`
  margin-top: 16px;
  max-width: 604px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    margin-top: 8px;
    max-width: 604px;
    width: 100%;
  }
`;

export const StyledTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 40px;
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

type CompanyDataProps = {
  businessName: string;
  country: string;
  sector: string;
  employeesNumber: string;
  logo: {
    data: string | ArrayBuffer | Blob;
    name: string;
  };
};

const CompanyData = ({
  handleStepChange,
  onCancel,
  isLoading,
  onSubmit,
  onSave,
}: {
  handleStepChange: (action: 'next' | 'prev' | 'skip') => void;
  onCancel: () => void;
  isLoading?: boolean;
  onSubmit: any;
  onSave: () => void;
}) => {
  useGetMe(userData => {
    if (userData?.selectedCompany?.id) {
      handleStepChange('next');
    }
  });
  const { t } = useTranslation('signup');
  const { mutateAsync, isLoading: isSaving } = useSaveCompany();
  const { data: languages } = useGetCountries();
  const { data: sectors } = useGetSectors();

  const router = useRouter();
  const { pathname } = router;
  const settingsForm = '/company_data';

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, touchedFields, dirtyFields },
  } = useForm<CompanyDataProps>({
    mode: 'all',
    defaultValues: {
      businessName: '',
      country: '',
      sector: '',
      employeesNumber: '',
      logo: {
        data: '',
        name: '',
      },
    },
  });

  const validData = Object.keys(errors).length === 0;
  const allRequiredFieldsNotDirty =
    !dirtyFields.businessName || !dirtyFields.country || !dirtyFields.sector || !dirtyFields.employeesNumber;
  const isSubmitButtonDisabled = isSaving || allRequiredFieldsNotDirty || isLoading || !validData;

  const onSubmitForm = handleSubmit(async data => {
    try {
      const payload = JSON.parse(JSON.stringify(data));
      payload.employeesNumber = payload.employeesNumber.value;
      payload.sectorId = payload.sector.id;
      payload.countryId = payload.country.id;

      delete payload.logo;
      delete payload.sector;
      delete payload.country;

      const companyData: CompanyDataForm = payload;
      const company = await mutateAsync(companyData);

      if (data.logo && data.logo.data) {
        const logoName = data.logo.name;
        const logoImage = data.logo.data as Blob;
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        const base64Response = await fetch(`${logoImage}`);
        const blob = await base64Response.blob();
        const logoFile = new File([blob], logoName);
        const payloadLogo = new FormData();
        payloadLogo.append('file', logoFile);
        // upload logo image should be optional so we don't need to wait for it
        onSubmit({ payload: payloadLogo, companyId: company.id });
      }
      handleStepChange('next');
    } catch (err) {
      // TODO: Show error
      // eslint-disable-next-line no-console
      console.error(err);
    }
  });

  const handleCancel = () => {
    onCancel();
  };
  const handleSave = () => {
    onSave();
  };

  return (
    <StyledForm data-aos='fade-left' data-aos-duration='500'>
      <StyledTitleContainer>
        <StyledFormTitle>{t('COMPANY')}</StyledFormTitle>
        {pathname !== settingsForm ? (
          <TextBody variant='light'>{t('SUB_COMPANY')}</TextBody>
        ) : (
          <TextBody variant='light'>{t('SUB_SETTINGS_COMPANY')}</TextBody>
        )}
      </StyledTitleContainer>
      <StyledInputsContainer>
        <Input
          label={t('COMPANY_NAME')}
          placeholder={String(t('COMPANY_NAME_PLACHEHOLDER'))}
          marginTop={0}
          isValid={!errors.businessName}
          touched={!!touchedFields.businessName}
          error={errors.businessName?.message}
          {...register('businessName', {
            required: String(t('REQUIRED.COMPANY_NAME')),
            pattern: {
              value: internationalCompanyNamesRegex,
              message: String(t('PATTERN.COMPANY_NAME')),
            },
          })}
        />
        <Controller
          control={control}
          name='country'
          rules={{ required: String(t('REQUIRED.COUNTRY')) }}
          render={({ field }) => {
            const { onChange, onBlur, value, name } = field;
            return (
              <CustomSelect
                placeholder={String(t('common:SELECT_PLACEHOLDER'))}
                {...{ onChange, onBlur, value, name }}
                name='country'
                label={String(t('COUNTRY'))}
                isValid={!errors.country}
                error={errors.country?.message}
                touched={!!touchedFields.country}
                options={languages?.map((language: Country) => ({
                  id: language.id,
                  value: language.name,
                  label: language.name,
                }))}
              />
            );
          }}
        />
        <Controller
          control={control}
          name='sector'
          rules={{ required: String(t('REQUIRED.SECTOR')) }}
          render={({ field }) => {
            const { onChange, onBlur, value, name } = field;
            return (
              <CustomSelect
                {...{ onChange, onBlur, value, name }}
                name='sector'
                label={String(t('SECTOR'))}
                placeholder='Marketing'
                isValid={!errors.sector}
                error={errors.sector?.message}
                touched={!!touchedFields.sector}
                options={sectors?.map((sector: Sector) => ({ id: sector.id, value: sector.name, label: sector.name }))}
              />
            );
          }}
        />
        <Controller
          control={control}
          name='employeesNumber'
          rules={{ required: String(t('REQUIRED.EMPLOYEES')) }}
          render={({ field }) => {
            const { onChange, onBlur, value, name } = field;
            return (
              <CustomSelect
                {...{ onChange, onBlur, value, name }}
                name='employees'
                label={String(t('EMPLOYEES'))}
                placeholder='0-50'
                isValid={!errors.employeesNumber}
                error={errors.employeesNumber?.message}
                touched={!!touchedFields.employeesNumber}
                options={[
                  { id: 1, value: '0-50', label: '0-50' },
                  { id: 2, value: '51-100', label: '51-100' },
                  { id: 3, value: '101-500', label: '101-500' },
                  { id: 4, value: '501-1000', label: '501-1000' },
                  { id: 5, value: '+1000', label: '+1000' },
                ]}
              />
            );
          }}
        />
        <Controller
          control={control}
          name='logo'
          render={({ field: { onChange } }) => {
            return <LogoDropzone onChange={onChange} />;
          }}
        />
      </StyledInputsContainer>
      <StyledButtonsContainer>
        {pathname !== settingsForm ? (
          <>
            {' '}
            <Button variant='secondary' onClick={handleCancel} type='button'>
              {t('CANCEL')}
            </Button>
            <Button onClick={onSubmitForm} disabled={isSubmitButtonDisabled} icon={isLoading ? <Spinner /> : null}>
              {t('NEXT')}
            </Button>
          </>
        ) : (
          <>
            {' '}
            <Button variant='secondary' onClick={handleCancel} type='button'>
              {t('CANCEL')}
            </Button>
            <Button disabled={isSubmitButtonDisabled} icon={isLoading ? <Spinner /> : null} onClick={handleSave}>
              {t('SAVE')}
            </Button>
          </>
        )}
      </StyledButtonsContainer>
    </StyledForm>
  );
};

export default CompanyData;
