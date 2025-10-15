import styled from 'styled-components';
import { Trans } from 'next-i18next';
import { DefaultTFuncReturn } from 'i18next';
import Modal from '@ui/modal';
import TextBody from './text-body';
import Button from './button';
import { Theme } from '../../theme/theme';

const StyledButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 24px;
  margin-top: 0;
  flex-wrap: wrap;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    width: 100%;
  }
  button {
    @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
      width: 100%;
    }
  }
`;

const StyledModalContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 432px;
  margin: 0 auto;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    width: 100%;
  }
`;

const StyledTitleIconWrapper = styled.div``;

const StyledModalTitle = styled.h4`
  color: ${({ theme }: { theme: Theme }) => theme.colors.blue};
  font-weight: bold;
  padding: 15px 0 25px;
  font-weight: 700;
  font-size: 32px;
  line-height: 135%;
  width: max-content;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    max-width: 279px;
    text-align: center;
    font-size: 24px;
    padding: 16px 0 0;
  }
`;

const StyledSubtitleIcon = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    margin-top: 32px;
  }
`;

const StyledSubtitle = styled(TextBody)`
  padding: 21px 0 16px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    padding: 32px 0 16px;
    font-size: 18px;
  }
`;

const StyledDescription = styled(TextBody)`
  text-align: center;
  padding: 0 0 40px;
  width: max-content;
  max-width: 500px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    max-width: 279px;
    padding: 0 0 32px;
  }
`;

type PopupProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: DefaultTFuncReturn;
  titleIcon?: React.ReactNode;
  subtitleIcon?: React.ReactNode;
  subtitle?: DefaultTFuncReturn;
  description?: DefaultTFuncReturn;
  hideCancelButton?: boolean;
  hideConfirmButton?: boolean;
  cancelText?: DefaultTFuncReturn;
  onCancel?: () => void;
  confirmText?: DefaultTFuncReturn;
  onConfirm?: () => void;
  showClose?: boolean;
  isDangerButton?: boolean;
};

const Popup = ({
  isOpen,
  onClose,
  title,
  titleIcon,
  subtitleIcon,
  subtitle,
  description,
  hideCancelButton,
  hideConfirmButton,
  cancelText,
  onCancel,
  confirmText,
  onConfirm,
  showClose = true,
  isDangerButton,
}: PopupProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} showClose={showClose}>
      <StyledModalContent>
        {titleIcon && <StyledTitleIconWrapper>{titleIcon}</StyledTitleIconWrapper>}
        {title && <StyledModalTitle>{title}</StyledModalTitle>}
        {subtitleIcon && <StyledSubtitleIcon>{subtitleIcon}</StyledSubtitleIcon>}
        {subtitle && <StyledSubtitle variant='subtitle'>{subtitle}</StyledSubtitle>}
        {description && (
          <StyledDescription variant='light'>
            <Trans
              components={{
                bold: <TextBody as='span' variant='bold' color='#004DBC' />,
              }}>
              {description}
            </Trans>
          </StyledDescription>
        )}
        <StyledButtons>
          {!hideCancelButton && (
            <Button variant='secondary' onClick={onCancel ?? onClose}>
              {cancelText}
            </Button>
          )}
          {!hideConfirmButton && (
            <Button variant={isDangerButton ? 'danger' : undefined} onClick={onConfirm ?? onClose}>
              {confirmText}
            </Button>
          )}
        </StyledButtons>
      </StyledModalContent>
    </Modal>
  );
};

export default Popup;
