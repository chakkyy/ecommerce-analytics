import { useEffect, useState, useCallback } from 'react';
import useGetMe from '@hooks/api/common/useGetMe';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useRouter } from 'next/router';
import MetricsGrid from '@components/dashboard/metrics-grid';
import ChatBase from '@components/head/chatbase';
import { show } from '@ebay/nice-modal-react';
import useGetDashboard from '@hooks/api/dashboard/useGetDashboard';
import useGetStores from '@hooks/api/dashboard/useGetStores';
import MetricsGridEmpty from '@components/dashboard/metrics-grid-empty';
import { GetServerSidePropsContext } from 'next';
import DatePickerContainer from '@components/dashboard/datepicker-container/datepicker-container';
import { checkAuth } from '@utils/checkAuth';

import { useForm } from 'react-hook-form';

// icons
import InviteIcon from '@icons/invite-icon';
import Loader from '@icons/loader';
import FilterIcon from '@icons/filter-icon';
import LeftArrow from '@icons/left-arrow';
import FilterBlueIcon from '@icons/filter-icon-blue';

// ui
import Button from '@ui/button';
import Header from '@ui/header';
import Sidebar from '@ui/sidebar';
import TextBody from '@ui/text-body';
import InviteToDashboardModal from '@ui/modals/invite-users-dashboard-modal';
import StoreDropdown from '@ui/dropdowns/store-dropdown';

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
    padding: 32px 24px 24px;
  }
`;

const StyledTitleAndActions = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 32px;
  align-items: center;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    margin-top: 0px;
  }
`;

const StyledActions = styled.div`
  display: flex;
  gap: 24px;
`;

const StyledLeftHeader = styled.div`
  width: 100%;
`;

const StyledButtonsMobile = styled.div<{ $active: boolean }>`
  display: none;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    display: flex;
    align-items: flex-end;
    justify-content: ${({ $active }) => ($active ? 'space-around' : 'flex-start')};
    width: 100%;
  }
`;
const StyledDashboardActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 32px;
  width: 100%;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    margin-top: 16px;
  }
`;

const StyledPickContainer = styled.div<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: 32px;
  width: 100%;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    display: ${({ $active }) => ($active ? 'flex' : 'none')};
    gap: 16px;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
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
    p {
      font-size: 14px;
    }

    svg {
      width: 16px;
      height: 16px;
    }
  }
`;

const StyledTitle = styled.h3`
  color: ${({ theme }: { theme: Theme }) => theme.colors.blue};
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    font-size: 24px;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const StyledContentWrapper = styled.div<{ $active: boolean }>`
  margin-top: 40px;
  margin-bottom: 64px;
  transition: all 0.3s ease-in-out;
  width: 90%;
  margin-left: -125px;
  @media (min-width: 1920px) {
    width: 95%;
    margin-left: -100px;
  }
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    margin-left: 0px;
    width: 100%;
  }
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    margin-top: ${({ $active }) => ($active ? '24px' : '16px')};
  }
`;

const StyledCleanFilters = styled.button`
  background: transparent;
  cursor: pointer;
  p {
    width: -webkit-fill-available;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    display: none;
    width: 100%;
    text-align: end;
  }
`;

const StyledCleanFiltersMobile = styled(StyledCleanFilters)<{ $active: boolean }>`
  display: none;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    display: ${({ $active }) => ($active ? 'flex' : 'none')};
    width: 100%;
    text-align: end;
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

const StyledFilterButton = styled.button<{ active: boolean }>`
  display: none;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    transition: all 0.1s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }: { theme: Theme }) => theme.colors.lightBlue};
    border: ${({ active, theme }) => (!active ? `1px solid ${theme.colors.cloudBlue}` : '3px solid #0D99FF')};
    color: ${p =>
      p.active
        ? ({ theme }: { theme: Theme }) => theme.colors.blueSelection
        : ({ theme }: { theme: Theme }) => theme.colors.black};
    font-size: 16px;
    font-weight: 400;
    line-height: 150%;
    cursor: pointer;
    gap: 8px;
    padding: 6px 16px;
    border-radius: 8px;
  }
`;
declare global {
  interface Window {
    countMetrics: { [key: number]: boolean };
  }
}

interface DashboardByIdProps {
  dashboardId: number;
  locale: string;
}

// TODO make a layout component that can be used in all dashboard pages
// must support: sidebar, header, dashboard title, onBack, button primary, button secondary and content with children inside
export default function DashboardById({ dashboardId, locale }: DashboardByIdProps) {
  const { t } = useTranslation(['dashboards', 'dashboard-store', 'store']);
  const router = useRouter();
  const userData = useGetMe();
  const [selectedStores, setSelectedStores] = useState<string>('*');

  const [showFilters, setShowFilters] = useState<boolean>(false);
  const { control, setValue, getValues, watch, reset } = useForm({
    defaultValues: {
      endDate: new Date(),
      startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
    },
  });
  const [title, setTitle] = useState<string>('Dashboard');
  const [ecommerceConnectId, setEcommerceConnectId] = useState<number>(0);
  const [dashboardType, setDashboardType] = useState<string>();
  const [startDate, endDate] = watch(['startDate', 'endDate']);

  const {
    data: dashboard,
    isLoading,
    isError,
  } = useGetDashboard({
    dashboardId,
  });

  const setIsLoading = (id: number, b: boolean) => {
    if (!window.countMetrics) window.countMetrics = {};
    if (!b) window.countMetrics[id] = b;
    if (Object.keys(window.countMetrics).length === dashboard?.metrics.length) {
      window.countMetrics = {};
    }
  };

  const { data: stores, isLoading: isLoadingStores } = useGetStores(ecommerceConnectId);

  const handleBack = async () => {
    await router.push('/dashboards');
  };

  const handleInviteUsers = async () => {
    await show(InviteToDashboardModal);
  };

  const handleClick = async () => {
    await router.push('/new_metric');
  };

  const handleRemoveItem = useCallback(() => {}, []);

  useEffect(() => {
    if (dashboard) {
      setTitle(dashboard.name);
      setEcommerceConnectId(dashboard.ecommerceConnectId);
      setDashboardType(dashboard?.ecommerceConnect?.strategy);
    }
  }, [dashboard]);

  const handleApplyItems = (items: { label: string; value: string }[]) => {
    const selectedStoreValues = items?.map(item => item.value).join(',');
    setSelectedStores(selectedStoreValues);
  };

  const handleCancelOptions = () => {};

  const handleOnUndoSelect = () => {
    setSelectedStores('*');
  };

  const handleCleanFilters = () => {
    setSelectedStores('*');
    reset();
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
        <StyledDashboardLayout>
          <StyledTitleAndActions>
            <StyledLeftHeader>
              <StyledBreadcrumb onClick={handleBack}>
                <LeftArrow />
                <TextBody>{userData?.data?.selectedCompany?.businessName}</TextBody>
              </StyledBreadcrumb>
              <StyledTitle title={title}>{title}</StyledTitle>
              <StyledDashboardActions>
                <StyledButtonsMobile $active={showFilters}>
                  <StyledFilterButton onClick={() => setShowFilters(!showFilters)} active={showFilters}>
                    Filtros {showFilters ? <FilterBlueIcon /> : <FilterIcon />}
                  </StyledFilterButton>

                  <StyledCleanFiltersMobile type='button' onClick={handleCleanFilters} $active={showFilters}>
                    <TextBody color='#004DBC' variant='small'>
                      {t('CLEAN_FILTERS')}
                    </TextBody>
                  </StyledCleanFiltersMobile>
                </StyledButtonsMobile>
                <StyledPickContainer $active={showFilters}>
                  {dashboardType === 'store' && (
                    <StoreDropdown
                      selectedStores={selectedStores}
                      stores={stores}
                      isLoading={isLoadingStores}
                      applyItems={handleApplyItems}
                      cancelOptions={handleCancelOptions}
                      onUndoSelect={handleOnUndoSelect}
                      onClearFilters={handleCleanFilters}
                    />
                  )}
                  <DatePickerContainer
                    isEcommerceLayout={dashboard?.ecommerceConnect.strategy === 'vtex'}
                    locale={locale}
                    control={control}
                    setValue={setValue}
                    getValues={getValues}
                  />
                  <StyledCleanFilters type='button' onClick={handleCleanFilters}>
                    <TextBody color='#004DBC' variant='small'>
                      {t('CLEAN_FILTERS')}
                    </TextBody>
                  </StyledCleanFilters>
                </StyledPickContainer>
              </StyledDashboardActions>
            </StyledLeftHeader>
            <StyledActions>
              {process.env.NEXT_PUBLIC_FEATURE_FLAG_HOTFIXES === 'true' && (
                <>
                  {dashboard?.name !== 'Tienda física' && (
                    <Button small onClick={handleClick}>
                      {t('ADD_METRIC')}
                    </Button>
                  )}
                  <Button
                    small
                    variant='secondary'
                    icon={<InviteIcon height={16} width={16} />}
                    onClick={handleInviteUsers}>
                    {t('INVITE_USERS')}
                  </Button>
                </>
              )}
            </StyledActions>
          </StyledTitleAndActions>
          <StyledContentWrapper $active={showFilters}>
            {isLoading && <MetricsGridEmpty />}
            {isError && <span>Hubo un error</span>}
            {!isLoading && (
              <MetricsGrid
                childItems={dashboard?.metrics || []}
                onItemDelete={handleRemoveItem}
                selectedStores={selectedStores}
                startDate={startDate}
                endDate={endDate}
                setIsLoading={setIsLoading}
              />
            )}
          </StyledContentWrapper>
        </StyledDashboardLayout>
        <LoaderContainer showLoader={isLoadingStores || isLoading}>
          <Loader />
        </LoaderContainer>
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

  // Comprobar que el ID es un número de hasta 5 dígitos
  if (!/^[0-9]{1,5}$/.test(id as string)) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      dashboardId: Number(id),
      locale,
      ...(await serverSideTranslations(locale, ['dashboards', 'common', 'segments', 'dashboard-store', 'store'], null, [
        'es',
        'en',
        'pt',
      ])),
    },
  };
}
