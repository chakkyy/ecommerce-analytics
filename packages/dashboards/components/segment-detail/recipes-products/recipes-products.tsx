import React, { useState } from 'react';
import DownArrow from '@icons/down-arrow';
import UpArrow from '@icons/up-arrow';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import { Theme } from '../../../theme/theme';
import List from './list/list';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const StyledTitleWrapper = styled.div`
  display: flex;
  gap: 8px;
  padding-left: 0;
`;

const StyledTitle = styled.h1<{ isExpandable: boolean }>`
  color: ${({ theme }: { theme: Theme }) => theme.colors.blue};
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 130%;
  cursor: pointer;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    font-size: 16px;
    line-height: 150%;
  }
`;

const StyledIcon = styled.div`
  cursor: pointer;

  svg {
    color: ${({ theme }: { theme: Theme }) => theme.colors.blue};
  }
`;

const RecipesProducts = () => {
  const [isExpandable, setIsExpandable] = useState<boolean>(true);
  const { t } = useTranslation('segments');

  return (
    <StyledWrapper>
      <StyledTitleWrapper>
        <StyledTitle onClick={() => setIsExpandable(!isExpandable)} isExpandable={isExpandable}>
          {t('SEGMENT_DETAIL.TITLE_RECIPE_PRODUCTS')}
        </StyledTitle>
        <StyledIcon onClick={() => setIsExpandable(!isExpandable)}>
          {!isExpandable ? <UpArrow /> : <DownArrow />}
        </StyledIcon>
      </StyledTitleWrapper>
      {isExpandable && <List />}
    </StyledWrapper>
  );
};
export default RecipesProducts;
