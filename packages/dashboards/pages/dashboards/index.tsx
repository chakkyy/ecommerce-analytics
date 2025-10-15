import styled from 'styled-components';
import Head from 'next/head';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSidePropsContext } from 'next';

import { useModal } from '@ebay/nice-modal-react';
import { checkAuth } from '@utils/checkAuth';
import useGetMe from '@hooks/api/common/useGetMe';
import useGetDashboards from '@hooks/api/dashboard/useGetDashboards';
import ChatBase from '@components/head/chatbase';

import InviteIcon from '@icons/invite-icon';
import ExampleDashboardComponent from '@misc/example-dashboard-component';

import InviteToDashboardModal from '@ui/modals/invite-users-dashboard-modal';
import NewDashboardModal from '@ui/modals/new-dashboard-modal';
import Button from '@ui/button';
import Header from '@ui/header';
import Sidebar from '@ui/sidebar';
import TextBody from '@ui/text-body';
import CardDashboard from '@ui/card-dashboard';

import { FIXED_METRIC_WIDTH } from '../../utils/constants';
import { Theme } from '../../theme/theme';

const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding-right: 100px;
  transition: all 0.3s ease-in-out;

  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    padding: 24px;
  }
`;

const StyledTitleAndActions = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 32px;
  align-items: center;
`;

const StyledActions = styled.div`
  display: flex;
  gap: 24px;
`;

const StyledTitle = styled.h3`
  color: ${({ theme }: { theme: Theme }) => theme.colors.blue};
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    font-size: 32px;
  }
`;

const StyledContentWrapper = styled.div`
  display: flex;
  margin-top: 56px;
  margin-bottom: 64px;
  align-items: center;
  justify-content: center;
  width: ${FIXED_METRIC_WIDTH}px;
  width: 100%;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    margin-top: 32px;
    flex-direction: column;
    gap: 16px;
  }
`;

const StyledEmptyState = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  background: ${({ theme }: { theme: Theme }) => theme.colors.lightBlue};
  border-radius: 24px;
  padding: 104px 0px;

  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    padding: 64px 24px;
    svg {
      width: 210px;
      height: 137px;
    }
  }
`;

const StyledCopy = styled(TextBody)`
  width: 560px;
  text-align: center;
  padding: 44px 0;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    width: 100%;
    font-weight: 300;
  }
`;

const StyledGrid = styled.div`
  display: flex;
  max-width: ${FIXED_METRIC_WIDTH}px;
  flex-wrap: wrap;
  gap: 32px;

  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    width: 100%;
    max-width: 100%;
    flex-direction: column;
    gap: 16px;
  }
`;

function DashboardHome() {
  const { data, isError, isLoading } = useGetDashboards();

  return (
    <StyledGrid>
      {isLoading && <div>Cargando...</div>}
      {isError && <div>Hubo un error</div>}
      {data?.map(({ id, name, metrics }: any) => (
        <Link href={`/dashboards/${id as string}`} key={id as string}>
          <CardDashboard title={name} metricLenght={metrics?.length ?? 0} />
        </Link>
      ))}
    </StyledGrid>
  );
}

export default function DashboardLayout() {
  const { t } = useTranslation('dashboards');
  const isEmptyState = false;
  const ecommerceLinked = true;
  const { show: showNewDashboardModal } = useModal(NewDashboardModal);
  const { show: showInviteUsersModal } = useModal(InviteToDashboardModal);
  const userData = useGetMe();

  const handleNewDashboard = async () => {
    await showNewDashboardModal();
  };

  const handleInviteUsers = async () => {
    await showInviteUsersModal();
  };

  return (
    <>
      <Head>
        <title>ecommerce | Dashboard</title>
        <meta name='description' content='ecommerce Dashboard' />
        <ChatBase />
      </Head>
      <>
        <Header />
        <Sidebar />
        <StyledLayout>
          <StyledTitleAndActions>
            <StyledTitle> {userData?.data?.selectedCompany?.businessName}</StyledTitle>
            {process.env.NEXT_PUBLIC_FEATURE_FLAG_HOTFIXES === 'true' && (
              <StyledActions>
                {!isEmptyState && (
                  <Button small onClick={handleNewDashboard}>
                    Crear Dashboard
                  </Button>
                )}
                <Button
                  small
                  variant='secondary'
                  onClick={handleInviteUsers}
                  icon={<InviteIcon height={16} width={16} />}>
                  {t('INVITE_USERS')}
                </Button>
              </StyledActions>
            )}
          </StyledTitleAndActions>
          <StyledContentWrapper>
            {isEmptyState ? (
              <StyledEmptyState>
                <ExampleDashboardComponent />
                <StyledCopy>{ecommerceLinked ? t('CREATE_DASHBOARD_DESC') : t('EMPTY_STATE_DESCRIPTION')}</StyledCopy>
                <Button onClick={handleNewDashboard}>
                  {ecommerceLinked ? t('CREATE_NEW_DASHBOARD') : t('SYNC_ECOMMERCE')}
                </Button>
              </StyledEmptyState>
            ) : (
              <DashboardHome />
            )}
          </StyledContentWrapper>
          {/* this below is fixed */}
        </StyledLayout>
      </>
    </>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const destination = await checkAuth(ctx);
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
      ...(await serverSideTranslations(locale, ['dashboards', 'common'], null, ['es', 'en', 'pt'])),
    },
  };
}
