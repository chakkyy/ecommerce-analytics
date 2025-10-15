import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import Button from '@ui/button';
import { useState } from 'react';
import { useLayout } from '@hooks/useContext';
import Link from 'next/link';
import { Theme } from '../../../theme/theme';

const StyledWrapper = styled.div<{ isSidebarOpen: boolean }>`
  transition: all 0.3s ease-in-out;
  min-width: ${p => (p.isSidebarOpen ? '1024px' : '1112px')};
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.xl}) {
    min-width: ${p => (p.isSidebarOpen ? ' 710px' : '848px')};
  }
`;

const StyledScroll = styled.div`
  height: 50vh;
  overflow-y: auto;
  padding-right: 16px;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }: { theme: Theme }) => theme.colors.grey};
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track-piece {
    background: ${({ theme }: { theme: Theme }) => theme.colors.white};
  }
`;

const StyledTitle = styled.h1`
  color: ${({ theme }: { theme: Theme }) => theme.colors.black};
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 130%;
  margin-bottom: 20px;
`;

const StyledItemTitle = styled.label`
  color: ${({ theme }: { theme: Theme }) => theme.colors.black};
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;
`;

const StyledItemWrapper = styled.div<{ checked: boolean }>`
  display: flex;
  align-items: center;
  gap: 26px;
  padding: 16px 24px;
  margin-bottom: 24px;
  transition: all 0.2s ease-out;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid ${p => (p.checked ? ({ theme }: { theme: Theme }) => theme.colors.blueSelection : 'transparent')};
  background: ${p =>
    p.checked
      ? ({ theme }: { theme: Theme }) => theme.colors.lightBlue
      : ({ theme }: { theme: Theme }) => theme.colors.almostWhite};
  &:hover {
    background: ${({ theme }: { theme: Theme }) => theme.colors.lightBlue};
  }
`;

const InputRadio = styled.input`
  -webkit-appearance: none;
  cursor: pointer;
  appearance: none;
  background-color: transparent;
  margin: 0;
  font: inherit;
  color: currentColor;
  width: 16px;
  height: 16px;
  border: 0.15em solid currentColor;
  border-radius: 50%;
  transform: translateY(-0.075em);
  display: grid;
  place-content: center;
  &:before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    transform: scale(0);
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em ${({ theme }: { theme: Theme }) => theme.colors.black};
  }
  &:checked::before {
    transform: scale(1);
  }
`;

const StyledDescription = styled.p`
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-size: 14px;
  line-height: 130%;
  color: ${({ theme }: { theme: Theme }) => theme.colors.black};
`;

const StyledInputContent = styled.div``;

const StyledTextContent = styled.div``;

const StyledButtons = styled.div`
  margin-top: 72px;
  display: flex;
  justify-content: flex-end;
  gap: 24px;
`;

const Products = () => {
  const { t } = useTranslation('new-metric');
  const { isSidebarOpen } = useLayout();

  const [allOptions, setAllOptions] = useState([
    {
      id: 0,
      title: `${t('PRODUCT_RECIPES.CONVERSIONS')}`,
      description: `${t('PRODUCT_RECIPES.CONVERSIONS_DESCRIPTION')}`,
      isSelected: true,
    },
    {
      id: 1,
      title: `${t('PRODUCT_RECIPES.COSTS_PER_TRANSACTION')}`,
      description: `${t('PRODUCT_RECIPES.COSTS_PER_TRANSACTION_DESCRIPTION')}`,
      isSelected: false,
    },
    {
      id: 2,
      title: `${t('PRODUCT_RECIPES.TOTAL_COSTS')}`,
      description: `${t('PRODUCT_RECIPES.TOTAL_COSTS_DESCRIPTION')}`,
      isSelected: false,
    },
    {
      id: 3,
      title: `${t('PRODUCT_RECIPES.AVERAGE_REVENUE')}`,
      description: `${t('PRODUCT_RECIPES.AVERAGE_REVENUE_DESCRIPTION')}`,
      isSelected: false,
    },
    {
      id: 4,
      title: `${t('PRODUCT_RECIPES.SEGMENT_REVENUE')}`,
      description: `${t('PRODUCT_RECIPES.SEGMENT_REVENUE_DESCRIPTION')}`,
      isSelected: false,
    },
    {
      id: 5,
      title: `${t('PRODUCT_RECIPES.REVENUE_PER_TRANSACTION')}`,
      description: `${t('PRODUCT_RECIPES.REVENUE_PER_TRANSACTION')}`,
      isSelected: false,
    },
    {
      id: 6,
      title: `${t('PRODUCT_RECIPES.TOTAL_REVENUE')}`,
      description: `${t('PRODUCT_RECIPES.TOTAL_REVENUE_DESCRIPTION')}`,
      isSelected: false,
    },
  ]);

  const handleOnSelect = (id: number) => {
    const updatedOptions = allOptions.map(option => {
      if (option.id === id) {
        return { ...option, isSelected: true };
      }
      return { ...option, isSelected: false };
    });
    setAllOptions(updatedOptions);
  };

  return (
    <StyledWrapper isSidebarOpen={isSidebarOpen}>
      <StyledTitle>{t('PRODUCT_RECIPES.TITLE')}</StyledTitle>
      <StyledScroll>
        {allOptions.map(option => (
          <StyledItemWrapper key={option.id} checked={option.isSelected} onClick={() => handleOnSelect(option.id)}>
            <StyledInputContent>
              <InputRadio
                type='radio'
                id='choice'
                name='check'
                value={option.title}
                checked={option.isSelected}
                onClick={() => handleOnSelect(option.id)}
                readOnly
              />
            </StyledInputContent>
            <StyledTextContent>
              <StyledItemTitle htmlFor={option.title}>{option.title}</StyledItemTitle>
              <StyledDescription>{option.description}</StyledDescription>
            </StyledTextContent>
          </StyledItemWrapper>
        ))}
      </StyledScroll>

      <StyledButtons>
        <Link href='/dashboard_empty'>
          <Button variant='secondary' small>
            {t('BUTTON.CANCEL')}
          </Button>
        </Link>
        <Link href='/recipe_conversions'>
          <Button small>{t('BUTTON.ADD')}</Button>
        </Link>
      </StyledButtons>
    </StyledWrapper>
  );
};

export default Products;
