import { useTranslation } from 'next-i18next';
import styled from 'styled-components';
import { Theme } from '../../theme/theme';

const Wrapper = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 242px;
  border-radius: 4px;
  padding: 6px 8px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  background: ${({ theme }: { theme: Theme }) => theme.colors.lightOrange};
  color: ${({ theme }: { theme: Theme }) => theme.colors.orange};
`;

const WrapperPending = styled(Wrapper)`
  background: ${({ theme }: { theme: Theme }) => theme.colors.lightBlue};
  color: ${({ theme }: { theme: Theme }) => theme.colors.blue};
`;

const WrapperError = styled(Wrapper)`
  background: ${({ theme }: { theme: Theme }) => theme.colors.lightRed};
  color: ${({ theme }: { theme: Theme }) => theme.colors.redError};
`;

const WrapperComplete = styled(Wrapper)`
  background: ${({ theme }: { theme: Theme }) => theme.colors.lightGreen};
  color: ${({ theme }: { theme: Theme }) => theme.colors.greenSuccess};
`;

const WrapperProcessing = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  max-width: 242px;
  border-radius: 4px;
  padding: 6px 8px;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  background: ${({ theme }: { theme: Theme }) => theme.colors.lightBlue};

  &::before {
    content: '';
    display: block;
    background: ${({ theme }: { theme: Theme }) => theme.colors.cloudBlue};
    position: absolute;
    top: 0;
    left: 0;
    right: 62%;
    bottom: 0;
    z-index: 1;
    border-radius: 4px;
  }

  &::after {
    position: relative;
    content: attr(data-before);
    display: block;
    z-index: 2;
    color: ${({ theme }: { theme: Theme }) => theme.colors.blue};
  }
`;

// eslint-disable-next-line import/prefer-default-export
export const CompleteWithErrors = () => {
  const { t } = useTranslation('store');

  return <Wrapper>{t('STATUS.COMPLETE_WITH_ERRORS')}</Wrapper>;
};

export const PendingStatus = () => {
  const { t } = useTranslation('store');
  return <WrapperPending>{t('STATUS.PENDING')}</WrapperPending>;
};

export const ErrorStatus = () => {
  const { t } = useTranslation('store');
  return <WrapperError>{t('STATUS.ERROR')}</WrapperError>;
};

export const CompleteStatus = () => {
  const { t } = useTranslation('store');
  return <WrapperComplete>{t('STATUS.COMPLETE')}</WrapperComplete>;
};

export const ProcessingStatus = () => {
  const { t } = useTranslation('store');
  return <WrapperProcessing data-before={t('STATUS.PROCESSING')} />;
};
