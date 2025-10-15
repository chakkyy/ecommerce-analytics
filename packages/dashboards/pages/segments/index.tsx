import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Header from '@ui/header';
import Sidebar from '@ui/sidebar';
import Head from 'next/head';
import Segments from '@components/segments/segments';
import ChatBase from '@components/head/chatbase';
import NewUsers from '@components/segments/new-users';
import { GetServerSidePropsContext } from 'next';
import { checkAuth } from '@utils/checkAuth';
import { Theme } from '../../theme/theme';

const StyledContentWrapper = styled.div`
  display: flex;
  margin-top: 40px;
  margin-bottom: 64px;
  align-items: center;
  justify-content: center;
  width: 100%;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    margin-top: 32px;
  }
`;

const StyledDashboardLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding-right: 100px;
  transition: all 0.2s ease-out;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    padding-right: 24px;
  }
`;

const StyledTitleAndActions = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 32px;
  align-items: center;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    margin-top: 16px;
  }
`;

const StyledLeftHeader = styled.div``;

const StyledTitle = styled.h3`
  color: ${({ theme }: { theme: Theme }) => theme.colors.blue};
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    font-size: 24px;
    line-height: 135%;
  }
`;

export default function SegmentsPage() {
  const { t } = useTranslation(['common', 'segments', 'dashboards']);

  return (
    <>
      <Head>
        <title>ecommerce | Segments</title>
        <meta name='description' content='ecommerce Dashboard' />
        <ChatBase />
      </Head>
      <>
        <Header />
        <Sidebar />
        <StyledDashboardLayout>
          <StyledTitleAndActions>
            <StyledLeftHeader>
              <StyledTitle>{t('HERO_TITLE.SEGMENTS')}</StyledTitle>
            </StyledLeftHeader>
          </StyledTitleAndActions>
          <StyledContentWrapper>
            <Segments />
          </StyledContentWrapper>
          <StyledTitleAndActions>
            <StyledLeftHeader>
              <StyledTitle>{t('HERO_TITLE.NEW_USERS')}</StyledTitle>
            </StyledLeftHeader>
          </StyledTitleAndActions>
          <StyledContentWrapper>
            <NewUsers />
          </StyledContentWrapper>
        </StyledDashboardLayout>
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
      ...(await serverSideTranslations(locale, ['common', 'segments', 'dashboards'], null, ['es', 'en', 'pt'])),
    },
  };
}
