import { memo } from 'react';
import styled from 'styled-components';
import TextBody from '@components/common/text-body';
import PercentageUpIcon from '@icons/percentage-up';
import VTEXIcon from '@icons/vtex-icon';
import AnalyticsIcon from '@icons/analytics-icon';
import PercentageDownIcon from '@icons/percentage-down';
import EditIcon from '@icons/edit-icon';
import TrashIcon from '@icons/trash-icon';
import { useModal } from '@ebay/nice-modal-react';
import RemoveMetricPopup from '@ui/modals/remove-metric-popup';
import formatMetricWithSymbol from '@utils/formatMetricWithSymbol';
import SkeletonKPI from '@misc/skeleton-1';
import useGetMetric from '@hooks/api/dashboard/useGetMetric';
import Numeral from 'numeral';
import useDebounce from '@hooks/useDebounce';
import InfoTooltip from '../infoTooltip';
import { Theme } from '../../../../theme/theme';

const StyledContainer = styled.div<{ isSelected?: boolean }>`
  width: 100%;
  height: 100%;
  background: ${({ theme }: { theme: Theme }) => theme.colors.lightBlue};
  padding: 24px;
  border-radius: 8px;
  user-select: ${({ isSelected }) => (isSelected ? 'none' : 'auto')};
  position: relative;
  border: 1px solid
    ${({ theme, isSelected }: { isSelected?: boolean; theme: Theme }) =>
      isSelected ? theme.colors.blueSelection : theme.colors.lightBlue};
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    padding: 16px;
  }
`;

const StyledEditTooltip = styled.div`
  padding: 8px 10px;
  display: flex;
  gap: 12px;
  background: white;
  box-shadow: 0px 16px 40px rgba(17, 24, 39, 0.1);
  border-radius: 8px;
  position: absolute;
  top: -15px;
  left: 60%;
  cursor: default;

  svg {
    cursor: pointer;
  }
`;

const StyledBottomWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
  gap: 27px;
`;

const StyledMetricNumber = styled.h4`
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    font-size: 40px;
  }
`;

const StyledPercentageBadge = styled.div<{ isProfit: boolean }>`
  background: ${({ theme, isProfit }: { isProfit: boolean; theme: Theme }) =>
    isProfit ? theme.colors.lightGreen : theme.colors.lightRed};
  display: flex;
  padding: 4px 8px;
  gap: 3px;
  border-radius: 4px;
`;

const StyledSquare = styled.div<{ top?: boolean; bottom?: boolean; left?: boolean; right?: boolean }>`
  position: absolute;
  top: ${({ top }) => (top ? '-4px' : 'auto')};
  bottom: ${({ bottom }) => (bottom ? '-4px' : 'auto')};
  left: ${({ left }) => (left ? '-4px' : 'auto')};
  right: ${({ right }) => (right ? '-4px' : 'auto')};
  width: 12px;
  height: 12px;
  background: ${({ theme }: { theme: Theme }) => theme.colors.lightBlue};
  border: 1px solid ${({ theme }: { theme: Theme }) => theme.colors.blueSelection};
  border-radius: 2px;
  cursor: ew-resize;
`;

const StyledDeleteButton = styled.button`
  all: unset;
`;

const StyledIconsWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
`;

const StyledTextBody = styled(TextBody)`
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    font-weight: 300;
  }
`;
type KPIMetricProps = {
  id: number;
  title: string;
  profitPercentage?: string;
  isProfit?: boolean;
  textTooltip: string;
  onDelete: (id: number) => void;
  selectedMetricId?: number | null;
  onMetricSelect?: (id: number | null) => void;
  isFromServer?: boolean;
  recipeName: string;
  selectedStores?: string;
  startDate: Date;
  endDate: Date;
};

const DEFAULT_DEBOUNCE = 700;

const KPIFormatter = (recipeName: string): string => {
  const formatMapping: { [key: string]: string } = {
    NUMBER_OF_UNIQUE_VISITORS: '0',
    NUMBER_OF_PAGE_VIEWED: '0',
    STORE_ORDERS_QUANTITY: '0',
    GA_SESSIONS: '0',
    GA_USERS: '0',
    GA_SESSIONS_PER_REFERRAL: '0',
    GA_SALES_PER_USERS: '0',
    STORE_SQUARE_METER_SALES: '0',
    STORE_CLIENTS_QUANTITY: '0',
    STORE_NEW_CLIENTS_QUANTITY: '0',
    STORE_FREQUENT_CLIENTS_QUANTITY: '0',
    STORE_AVAILABLE_INVENTORY: '0',
  };

  return formatMapping[recipeName] || '0.00a';
};

const ANALYTICS_METRICS = ['GA_SESSIONS', 'GA_USERS', 'GA_SESSIONS_PER_REFERRAL', 'GA_SALES_PER_USERS'];

const KPIMetric = memo(
  ({
    id,
    title,
    profitPercentage,
    isProfit = true,
    textTooltip,
    onDelete,
    selectedMetricId,
    onMetricSelect,
    isFromServer = false,
    recipeName,
    selectedStores,
    startDate,
    endDate,
  }: KPIMetricProps) => {
    const isKpiSelected = id === selectedMetricId;
    const { show } = useModal(RemoveMetricPopup);
    const debouncedStoreList = useDebounce(selectedStores, DEFAULT_DEBOUNCE);
    const debouncedStartDate = useDebounce(startDate, DEFAULT_DEBOUNCE);
    const debouncedEndDate = useDebounce(endDate, DEFAULT_DEBOUNCE);
    const { isLoading, isFetching, data } = useGetMetric({
      metricId: id,
      storeList: debouncedStoreList,
      startDate: debouncedStartDate,
      endDate: debouncedEndDate,
    });

    const showConfirmDeleteModal = async () => {
      const metricId = id;
      await show({ onDelete, metricId });
    };

    const handleKpiClick = () => {
      if (id !== undefined && onMetricSelect) {
        onMetricSelect(isKpiSelected ? null : id);
      }
    };

    if (isLoading || isFetching) {
      return <SkeletonKPI />;
    }

    return (
      <StyledContainer isSelected={isKpiSelected}>
        {isKpiSelected && (
          <>
            <StyledEditTooltip>
              <EditIcon />
              <StyledDeleteButton type='button' onClick={showConfirmDeleteModal}>
                <TrashIcon />
              </StyledDeleteButton>
            </StyledEditTooltip>
            <StyledSquare top left />
            <StyledSquare top right />
            <StyledSquare bottom left />
            <StyledSquare bottom right />
          </>
        )}
        <StyledTextBody variant='small'>{title}</StyledTextBody>
        <InfoTooltip text={textTooltip} />
        <StyledBottomWrapper>
          <StyledMetricNumber>
            {formatMetricWithSymbol(recipeName, Numeral(data?.value).format(KPIFormatter(recipeName)))}
          </StyledMetricNumber>
          {!isFromServer && (
            <StyledPercentageBadge isProfit={isProfit}>
              <TextBody variant='small'>
                {!isProfit && `-`}
                {profitPercentage}
              </TextBody>
              {isProfit ? <PercentageUpIcon /> : <PercentageDownIcon />}
            </StyledPercentageBadge>
          )}
        </StyledBottomWrapper>
        <StyledIconsWrapper>
          {recipeName.search('STORE') === -1 && recipeName.search('GA') === -1 && <VTEXIcon />}
          {ANALYTICS_METRICS.includes(recipeName) && <AnalyticsIcon />}
        </StyledIconsWrapper>
      </StyledContainer>
    );
  }
);

export default KPIMetric;
