import { FC, ReactNode } from 'react';
import ReactModal from 'react-modal';
import styled, { css } from 'styled-components';

import CloseIcon from '@icons/close-icon';
import { useScrollModal } from '../../hooks';
import { Theme } from '../../theme/theme';

const StyledModalOverlay = styled.div<{ isFullScreen: boolean }>`
  background: #38383866 !important;
  z-index: 2 !important;
  ${p =>
    p.isFullScreen &&
    css`
      background: none !important;
      pointer-events: none !important;
    `}
`;

const StyledModalContent = styled.div<{ isFullScreen: boolean }>`
  pointer-events: initial !important;
  top: 50% !important;
  left: 50% !important;
  right: auto !important;
  bottom: auto !important;
  transform: translate(-50%, -50%) !important;
  padding: 0 !important;
  margin: 0 !important;
  border: none !important;
  box-shadow: 0px 30px 86px rgba(17, 24, 39, 0.1) !important;
  border-radius: 16px !important;
  overflow: visible !important;
  ${p =>
    p.isFullScreen &&
    css`
      transform: none !important;
      transform: translateX(-50%) !important;
      top: 0px !important;
      margin-top: var(--header-mobile) !important;
      height: calc(100vh - var(--header-mobile)) !important;
      width: 100vw !important;
    `}
`;

const StyledContainer = styled.div<{ isFullScreen: boolean; showClose: boolean }>`
  position: relative;
  padding: ${p => (p.showClose ? '0 48px 48px' : '48px')};
  z-index: 999;
  box-sizing: border-box;
  min-width: 327px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    padding: 0 24px 24px;
  }
  @media (min-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    min-width: 690px;
  }
  ${p =>
    p.isFullScreen &&
    css`
      margin: 0 auto;
      min-width: unset;
      width: 100%;
      max-width: 876px;
      padding: 56px 54px;
      border: none;
    `}
`;

const StyledCloseButtonWrapper = styled.div`
  justify-content: end;
  padding: 24px 24px 0 0;
  z-index: 999;
  display: -webkit-box;
  & > svg {
    cursor: pointer;
  }
`;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  showClose?: boolean;
  children?: ReactNode;
  isFullScreen?: boolean;
}

const Modal: FC<Props> = ({ isOpen, onClose, children, isFullScreen = false, showClose = true }) => {
  useScrollModal({ isOpen });

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      ariaHideApp={false}
      contentElement={(props, contentChildren) => (
        <StyledModalContent isFullScreen={isFullScreen} {...props}>
          {showClose && (
            <StyledCloseButtonWrapper onClick={onClose}>
              <CloseIcon />
            </StyledCloseButtonWrapper>
          )}
          {contentChildren}
        </StyledModalContent>
      )}
      overlayElement={(props, contentElement) => (
        <StyledModalOverlay isFullScreen={isFullScreen} {...props}>
          {contentElement}
        </StyledModalOverlay>
      )}>
      <StyledContainer showClose={showClose} isFullScreen={isFullScreen}>
        {children}
      </StyledContainer>
    </ReactModal>
  );
};

export default Modal;
