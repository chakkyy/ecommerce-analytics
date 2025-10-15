import { Fragment } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import Button from '@ui/button';
import Spinner from '@ui/spinner';
import { show } from '@ebay/nice-modal-react';
import QuitSettingsModal from '@ui/modals/quit-settings-modal';
import useGetDashboards from '@hooks/api/dashboard/useGetDashboards';
import CardDashboard from '@ui/card-dashboard';
import router from 'next/router';
import TextBody from '@ui/text-body';
import { Theme } from '../../../theme/theme';

const StyledForm = styled.form`
  margin-top: 16px;
  width: 100%;
`;
const StyledGrid = styled.div`
  display: flex;
  gap: 21px;
  flex-wrap: wrap;
  margin-top: 32px;
`;
const StyledTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
`;

const StyledFormTitle = styled.h4`
  color: ${({ theme }: { theme: Theme }) => theme.colors.blue};
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    font-size: 24px;
  }
`;

const StyledButtonsContainer = styled.div`
  margin-top: 40px;
  display: flex;
  gap: 24px;
  justify-content: flex-end;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    justify-content: flex-end;
    flex-direction: column-reverse;
    gap: 0px;
    button {
      margin-top: 16px;
      width: 100%;
    }
  }
`;
const SelectDashboard = () => {
  const { t } = useTranslation(['signup', 'common']);

  const handleCancel = () => {
    show(QuitSettingsModal);
  };

  const handleClick = () => {
    router.push('/invite_users');
  };

  const { data, isError, isLoading } = useGetDashboards();

  return (
    <StyledForm data-aos='fade-left' data-aos-duration='500'>
      <StyledTitleContainer>
        <StyledFormTitle>{t('common:INVITE_USERS_SETTINGS.SELECT_DASHBOARD')}</StyledFormTitle>
      </StyledTitleContainer>
      <TextBody variant='light'>{t('common:INVITE_USERS_SETTINGS.SUB_SELECT_DASHBOARD')}</TextBody>
      <StyledGrid>
        {isLoading && <div>Cargando...</div>}
        {isError && <div>Hubo un error</div>}
        {data?.map(({ name, metrics }: any) => (
          <Fragment key={name}>
            <CardDashboard title={name} metricLenght={metrics?.length ?? 0} />
          </Fragment>
        ))}
      </StyledGrid>
      <StyledButtonsContainer>
        <Button variant='secondary' onClick={handleCancel} type='button'>
          {t('signup:CANCEL')}
        </Button>
        <Button icon={isLoading ? <Spinner /> : null} onClick={handleClick}>
          {t('common:SELECT_PLACEHOLDER')}
        </Button>
      </StyledButtonsContainer>
    </StyledForm>
  );
};

export default SelectDashboard;
