import Button from '@ui/button';
import { useTranslation } from 'next-i18next';
import styled from 'styled-components';
import { useModal } from '@ebay/nice-modal-react';
import SelectDashboardModal from '@ui/modals/select-dashboard-modal';
import { Theme } from '../../../../../theme/theme';

const StyledWrapper = styled.div`
  background: ${({ theme }: { theme: Theme }) => theme.colors.almostWhite};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-radius: 8px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    align-items: flex-start;
    flex-direction: column;
    padding: 16px;
  }
`;

const StyledTag = styled.p`
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-size: 12px;
  line-height: 130%;
  color: ${({ theme }: { theme: Theme }) => theme.colors.black};
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    font-size: 11px;
    line-height: 130%;
  }
`;
const StyledTitleContainer = styled.div`
  min-width: 200px;
`;

const StyledTitle = styled.h1`
  font-family: 'Roboto', sans-serif;
  color: ${({ theme }: { theme: Theme }) => theme.colors.black};
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    font-size: 14px;
    line-height: 130%;
  }
`;

const StyledDescription = styled.h1`
  font-family: 'Roboto', sans-serif;
  color: ${({ theme }: { theme: Theme }) => theme.colors.black};
  font-weight: 300;
  font-size: 14px;
  line-height: 130%;
  width: 480px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    width: auto;
    white-space: initial;
    margin: 8px 0 16px;
  }
`;

interface Props {
  title: string;
  description: string;
}

const ItemList = ({ title, description }: Props) => {
  const { t } = useTranslation('segments');
  const { show: showSelectDashboardModal } = useModal(SelectDashboardModal);

  const handleSelectDashboardModal = async () => {
    await showSelectDashboardModal();
  };

  return (
    <StyledWrapper>
      <StyledTitleContainer>
        <StyledTag>{t('SEGMENT_DETAIL.DATA_RECIPE_PRODUCTS.TITLE_PRODUCTS')}</StyledTag>
        <StyledTitle>{title}</StyledTitle>
      </StyledTitleContainer>
      <StyledDescription title={description}>{description}</StyledDescription>
      <Button small onClick={handleSelectDashboardModal}>
        {t('SEGMENT_DETAIL.DATA_RECIPE_PRODUCTS.DASHBOARD_BUTTON')}
      </Button>
    </StyledWrapper>
  );
};
export default ItemList;
