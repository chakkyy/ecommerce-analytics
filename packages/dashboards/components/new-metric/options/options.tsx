import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import RightChevron from '@icons/right-chevron';
import { useLayout } from '@hooks/useContext';
import { Theme } from '../../../theme/theme';

const StyledWrapperContainer = styled.div``;

const StyledWrapperContent = styled.div<{ isSidebarOpen: boolean }>`
  min-width: 278px;
  margin-bottom: 40px;
  transition: all 0.3s ease-in-out;

  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.xl}) {
    min-width: ${p => (p.isSidebarOpen ? ' 249px' : '244px')};
  }
`;

const StyledTitle = styled.h1`
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.blue};
  margin-bottom: 16px;
  line-height: 150%;
`;

const StyledLabel = styled.h1<{ isSelected: boolean }>`
  font-family: 'Roboto', sans-serif;
  font-weight: ${p => (p.isSelected ? '600' : '300')};
  color: ${({ theme }: { theme: Theme }) => theme.colors.black};
  font-size: 16px;
  transition: all 0.2s ease-out;
  line-height: 150%;
`;
const StyledWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
  cursor: pointer;

  &:hover {
    ${StyledLabel} {
      font-weight: 600;
    }
  }
`;
const Options = () => {
  const { t } = useTranslation('new-metric');
  const { isSidebarOpen } = useLayout();

  const AllOptions = [
    { id: 1, label: `${t('PRODUCTS')}`, isSelected: true },
    { id: 2, label: `${t('SALES')}`, isSelected: false },
    { id: 3, label: `${t('CATEGORIES')}`, isSelected: false },
    { id: 4, label: `${t('PURCHASES')}`, isSelected: false },
    { id: 5, label: `${t('CUSTOMERS')}`, isSelected: false },
  ];

  const SuggestedOptions = [
    { id: 1, label: `${t('BEST_PRODUCTS')}`, isSelected: false },
    { id: 2, label: `${t('TOP_SELLERS')}`, isSelected: false },
    { id: 3, label: `${t('MAIN_CATEGORIES')}`, isSelected: false },
    { id: 4, label: `${t('NEW_CUSTOMERS')}`, isSelected: false },
  ];

  return (
    <StyledWrapperContainer>
      <StyledWrapperContent isSidebarOpen={isSidebarOpen}>
        <StyledTitle>{t('TITLE_ALL')}</StyledTitle>
        {AllOptions.map(option => (
          <StyledWrapper key={option.id}>
            <StyledLabel isSelected={option.isSelected}>{option.label}</StyledLabel>
            <RightChevron height={16} width={16} />
          </StyledWrapper>
        ))}
      </StyledWrapperContent>

      <StyledWrapperContent isSidebarOpen={isSidebarOpen}>
        <StyledTitle>{t('TITLE_SUGGESTED')}</StyledTitle>
        {SuggestedOptions.map(option => (
          <StyledWrapper key={option.id}>
            <StyledLabel isSelected={option.isSelected}> {option.label}</StyledLabel>
            <RightChevron height={16} width={16} />
          </StyledWrapper>
        ))}
      </StyledWrapperContent>
    </StyledWrapperContainer>
  );
};

export default Options;
