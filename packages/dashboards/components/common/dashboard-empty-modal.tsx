import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { DefaultTFuncReturn } from 'i18next';
import AddIcon from '@icons/add-icon';
import Button from './button';
import { Theme } from '../../theme/theme';

const StyledContainer = styled.div`
  width: auto;
  height: 254px;
  border: 1px dashed ${({ theme }: { theme: Theme }) => theme.colors.blue};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-shadow: 0px 16px 40px rgba(17, 24, 39, 0.1);
  background: ${({ theme }: { theme: Theme }) => theme.colors.almostWhite};
`;
const StyledTitle = styled.h1`
  color: ${({ theme }: { theme: Theme }) => theme.colors.black};
  font-weight: 400;
  font-size: 16px;
  font-family: 'Roboto', sans-serif;
  max-width: 273px;
  text-align: center;
  margin: 19px 0 24px;
`;

type Empty = {
  title: DefaultTFuncReturn;
  textButton: DefaultTFuncReturn;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const DashboardEmptyModal = ({ title, textButton, onClick }: Empty) => {
  return (
    <StyledContainer>
      <AddIcon />
      <StyledTitle>{title}</StyledTitle>
      <Button onClick={onClick}>{textButton}</Button>
    </StyledContainer>
  );
};

export default DashboardEmptyModal;
