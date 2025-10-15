import { useMemo, useState } from 'react';
import { GetServerSidePropsContext } from 'next';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Header from '@ui/header';
import Sidebar from '@ui/sidebar';
import Head from 'next/head';
import RecipesProducts from '@components/segment-detail/recipes-products/recipes-products';
import SegmentDetailComponent from '@components/segment-detail/segment-detail/segment-detail';
import ChatBase from '@components/head/chatbase';
import { checkAuth } from '@utils/checkAuth';
import LeftArrow from '@icons/left-arrow';
import { useRouter } from 'next/router';
import TextBody from '@ui/text-body';
import useGetSegmentsDetail from '@hooks/api/segments/useGetSegmentDetail';
import { getTranslationFromLabel } from '@utils/formatMetricWithSymbol';
import { Theme } from '../../theme/theme';

const StyledDashboardLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding-right: 100px;
  transition: all 0.3s ease-in-out;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
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
    margin-top: 8px;
  }
`;

const StyledLeftHeader = styled.div``;

const StyledTitle = styled.h3`
  color: ${({ theme }: { theme: Theme }) => theme.colors.blue};
  font-size: 32px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    font-size: 24px;
    line-height: 135%;
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
const StyledContentWrapper = styled.div`
  width: 100%;
  display: flex;
  margin-top: 40px;
  margin-bottom: 64px;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  gap: 60px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    margin-top: 24px;
    gap: 44px;
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

export default function SegmentDetail({ segmentId }: { segmentId: number }) {
  const { t, i18n } = useTranslation(['dashboards', 'segments', 'common']);
  const router = useRouter();
  const [page, setPage] = useState(1);
  const { data } = useGetSegmentsDetail({ segmentId, page });
  const language = useMemo(() => i18n?.language || 'en', [i18n?.language]);
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
              <StyledTitle>{getTranslationFromLabel(data?.segment?.name, language)}</StyledTitle>
              <StyledSubTitle>{getTranslationFromLabel(data?.segment?.description, language)}</StyledSubTitle>
            </StyledLeftHeader>
          </StyledTitleAndActions>
          <StyledContainer>
            <StyledContentWrapper>
              {process.env.NEXT_PUBLIC_FEATURE_FLAG_PRODUCT_RECIPES === 'true' && <RecipesProducts />}
              <SegmentDetailComponent segmentId={segmentId} page={page} setPage={setPage} users={data} />
            </StyledContentWrapper>
          </StyledContainer>
        </StyledDashboardLayout>
      </>
    </>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const destination = await checkAuth(ctx);

  if (destination) {
    return {
      redirect: {
        destination,
        permanent: false,
      },
    };
  }
  if (!ctx.params || !('id' in ctx.params)) {
    return {
      notFound: true,
    };
  }
  const { id } = ctx.params;
  const locale = ctx.locale || 'en';
  return {
    props: {
      segmentId: Number(id),
      ...(await serverSideTranslations(locale, ['dashboards', 'segments', 'common'], null, ['es', 'en', 'pt'])),
    },
  };
}
