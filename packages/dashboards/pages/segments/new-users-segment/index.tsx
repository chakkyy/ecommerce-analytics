import { useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Header from '@ui/header';
import Sidebar from '@ui/sidebar';
import { useRouter } from 'next/router';
import Head from 'next/head';
import LeftArrow from '@icons/left-arrow';
import TextBody from '@ui/text-body';
import useGetNewUsersSegment from '@hooks/api/segments/useGetNewUsersSegment';
import NewUsersDetailComponent from '@components/new-users/new-users';
import ChatBase from '@components/head/chatbase';
import { checkAuth } from '@utils/checkAuth';
import { Theme } from '../../../theme/theme';

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

const StyledBreadcrumb = styled.div`
  display: flex;
  gap: 16px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.blue};
  margin-bottom: 4px;
  cursor: pointer;
  width: max-content;
  align-items: center;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    gap: 8px;
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const StyledCustomText = styled(TextBody)`
  display: flex;
  align-items: center;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    font-size: 14px;
    line-height: 130%;
  }
`;

const StyledSubTitle = styled.p`
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: ${({ theme }: { theme: Theme }) => theme.colors.black};
  max-width: 605px;
  margin-top: 16px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    max-width: initial;
    margin-top: 8px;
  }
`;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: flex-start;
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

const LoaderContainer = styled.div<{ showLoader: boolean }>`
  position: fixed;
  bottom: 10px;
  right: 10px;
  pointer-events: none;
  opacity: ${props => (props.showLoader ? 1 : 0)};
  svg {
    width: 50px;
    height: 50px;
  }
`;

export default function NewUsersPage() {
  const router = useRouter();
  const { t } = useTranslation(['common', 'segments']);
  const [page, setPage] = useState(1);
  const newUsers = useGetNewUsersSegment({ ecommerceConnectId: 0, page });

  return (
    <>
      <Head>
        <title>ecommerce | Segment Detail</title>
        <meta name='description' content='ecommerce Dashboard' />
        <ChatBase />
      </Head>
      <>
        <Header />
        <Sidebar />
        <StyledDashboardLayout>
          <StyledTitleAndActions>
            <StyledLeftHeader>
              <StyledBreadcrumb onClick={() => router.push('/segments')}>
                <LeftArrow />
                <StyledCustomText>{t(`segments:SEGMENTS`)}</StyledCustomText>
              </StyledBreadcrumb>
              <StyledTitle>{t('HERO_TITLE.NEW_USERS')}</StyledTitle>
              <StyledSubTitle>{t('HERO_SUBTITLE.NEW_USERS')}</StyledSubTitle>
            </StyledLeftHeader>
          </StyledTitleAndActions>
          <StyledContainer>
            <StyledContentWrapper>
              <NewUsersDetailComponent users={newUsers.data} page={page} setPage={setPage} />
            </StyledContentWrapper>
          </StyledContainer>
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
