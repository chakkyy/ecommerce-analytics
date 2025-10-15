import React, { MouseEventHandler } from 'react';
import styled from 'styled-components';
import { Theme } from '../../theme/theme';

interface Props {
  label: string;
  isSelected: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

const StyledTab = styled.button<{ isSelected: boolean }>`
  background: ${({ theme }: { theme: Theme }) => theme.colors.lightBlue};
  color: ${({ theme }: { theme: Theme }) => theme.colors.black};
  font-weight: 700;
  font-size: 20px;
  border: 2px solid ${p => (p.isSelected ? ({ theme }: { theme: Theme }) => theme.colors.blueSelection : '#CCDBF2')};
  border-radius: 61px;
  cursor: pointer;
  padding: 16px 40px;
  transition: all 0.3s ease-in-out;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    padding: 0px;
    min-height: 58px;
  }
`;

const Chip = ({ label, isSelected, onClick }: Props) => {
  return (
    <StyledTab isSelected={isSelected} onClick={onClick}>
      {label}
    </StyledTab>
  );
};
export default Chip;
