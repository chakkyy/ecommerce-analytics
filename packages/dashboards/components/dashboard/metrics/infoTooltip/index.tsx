import { memo } from 'react';
import styled from 'styled-components';
import InfoIcon from '@icons/info-icon';
import { Theme } from '../../../../theme/theme';

const StyledContainer = styled.span`
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;

  &:hover {
    b.tooltipText {
      display: block;
    }
  }

  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    &:hover {
      b.tooltipText {
        display: block;
        bottom: auto;
        left: -400%;
        white-space: normal;
      }
    }
  }

  b.tooltipText {
    > span {
      font-size: 14px;
      color: ${({ theme }: { theme: Theme }) => theme.colors.black};
    }
  }
`;

const ToolTipWrapper = styled.div`
  width: 0px;
  height: 0px;
  position: relative;
  left: -35px;
  top: 20px;
`;

export type Position = 'top' | 'bottom' | 'left' | 'right';
interface TooltipProps {
  position: Position;
  alternativeWrapper: boolean;
}

type Props = {
  text: string;
  position?: Position;
  alternativeWrapper?: boolean;
};

const StyledTooltip = styled.b<TooltipProps>`
  position: absolute;
  color: ${({ theme }: { theme: Theme }) => theme.colors.black};
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  color: transparent;
  padding: 4px 8px;
  z-index: 1;
  display: none;
  white-space: normal;
  min-width: 200px;
  pointer-events: none;
  user-select: none;
  box-shadow: ${({ theme }: { theme: Theme }) => `1px 1px 1px 0px ${theme.colors.sand}`};
  border-radius: 10px;

  &::before {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0.3rem;
  }

  ${({ theme, position, alternativeWrapper }: { theme: Theme; position: Position; alternativeWrapper: boolean }) => {
    switch (position) {
      case 'top':
        return `
          bottom: calc(100% + 8px);
          left: ${alternativeWrapper ? '47' : '50'}%;
          transform: translateX(-${alternativeWrapper ? '47' : '50'}%);
          &::before {
            top: 100%;
            left: 50% ;
            margin-left: -0.25rem;
            border-top-color: ${theme.colors.sand};
          }
        `;
      case 'bottom':
        return `
          top: calc(100% + 8px);
          left: ${alternativeWrapper ? '47' : '50'}%;
          transform: translateX(-${alternativeWrapper ? '47' : '50'}%);
          &::before {
            bottom: 100%;
            left: 55% ;
            margin-left: -0.5rem;
            border-bottom-color: ${theme.colors.sand};
          }
        `;
      case 'left':
        return `
          right: calc(100% + 8px);
          top: 50%;
          transform: translateY(-50%);
          &::before {
            left: 100%;
            top: 50%;
            margin-top: -0.3rem;
            border-left-color: ${theme.colors.sand};
          }
        `;
      case 'right':
        return `
          left: calc(100% + 8px);
          top: 50%;
          transform: translateY(-50%);
          &::before {
            right: 100%;

            top: 50%;
            margin-top: -0.3rem;
            border-right-color: ${theme.colors.sand};
          }
        `;
      default:
        return '';
    }
  }}
`;

const StyledTooltipContainer = styled.div`
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    position: relative;
    right: 10vw;
  }
`;

const InfoTooltip = memo(({ text, position = 'top', alternativeWrapper = false }: Props) => {
  return (
    <StyledContainer>
      {alternativeWrapper ? (
        <ToolTipWrapper>
          <InfoIcon onClick={(e: React.MouseEvent<HTMLElement>) => e.preventDefault()} />
          <StyledTooltipContainer>
            <StyledTooltip alternativeWrapper={alternativeWrapper} className='tooltipText' position={position}>
              <span>{text}</span>
            </StyledTooltip>
          </StyledTooltipContainer>
        </ToolTipWrapper>
      ) : (
        <>
          <InfoIcon />
          <StyledTooltip alternativeWrapper={alternativeWrapper} className='tooltipText' position={position}>
            <span>{text}</span>
          </StyledTooltip>
        </>
      )}
    </StyledContainer>
  );
});

export default InfoTooltip;
