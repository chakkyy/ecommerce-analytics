import { useTranslation } from 'next-i18next';
import Button from '@ui/button';
import styled from 'styled-components';
import { useModal } from '@ebay/nice-modal-react';
import QuitSignupPopup from '@ui/modals/quit-signup-popup';
import DownloadButton from '@ui/download-template-button';
import * as SC from './form.style';
import { Theme } from '../../../../theme/theme';

const StyledForm = styled.div`
  margin-top: 16px;
  max-width: 604px;
`;

const StyledTitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 48px;
  gap: 16px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    gap: 8px;
    margin-bottom: 32px;
  }
`;

const StyledSubTitle = styled.p`
  color: ${({ theme }: { theme: Theme }) => theme.colors.black};
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
`;

const StyledCardContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
`;

const StyledCardContent = styled.div`
  background: ${({ theme }: { theme: Theme }) => theme.colors.lightBlue};
  border-radius: 16px;
  min-width: 286px;
  min-height: 180px;
  padding: 32px;

  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    min-width: 0px;
    min-height: 0px;
    padding: 24px;
    width: 100%;
  }
`;
const StyledTextContainer = styled.div`
  gap: 8px;
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    margin-bottom: 16px;
  }
`;
const StyledTitle = styled.h1`
  color: ${({ theme }: { theme: Theme }) => theme.colors.black};
  font-weight: 700;
  font-size: 20px;
  line-height: 130%;
`;

type DownloadTemplateProps = {
  handleStepChange: (action: 'next' | 'prev' | 'skip') => void;
};

const DownloadTemplateStep = ({ handleStepChange }: DownloadTemplateProps) => {
  const { t } = useTranslation('signup');

  const dataCards = [
    { id: 1, label: `${t('DOWNLOAD_TEMPLATE.STORE')}`, fileName: 'Tiendas.xlsx' },
    { id: 2, label: `${t('DOWNLOAD_TEMPLATE.CUSTOMERS')}`, fileName: 'Clientes.xlsx' },
    { id: 3, label: `${t('DOWNLOAD_TEMPLATE.PRODUCTS')}`, fileName: 'Productos.xlsx' },
    { id: 4, label: `${t('DOWNLOAD_TEMPLATE.SALE')}`, fileName: 'Ventas.xlsx' },
  ];
  const { show: showQuitSignupPopup } = useModal(QuitSignupPopup);

  const handleCancel = () => {
    showQuitSignupPopup();
  };

  return (
    <StyledForm data-aos='fade-left' data-aos-duration='500'>
      <StyledTitleContainer>
        <SC.StyledFormTitle>{t('DOWNLOAD_TEMPLATE.DOWNLOAD_TEMPLATE_TITLE')}</SC.StyledFormTitle>
        <StyledSubTitle>{t('DOWNLOAD_TEMPLATE.DOWNLOAD_TEMPLATE_SUBTITLE')}</StyledSubTitle>
      </StyledTitleContainer>
      <StyledCardContainer>
        {dataCards.map(data => (
          <StyledCardContent key={data.id}>
            <StyledTextContainer>
              <StyledTitle>{data.label}</StyledTitle>
            </StyledTextContainer>
            <DownloadButton fileName={data.fileName} />
          </StyledCardContent>
        ))}
      </StyledCardContainer>
      <SC.StyledButtonsContainer>
        <Button variant='secondary' onClick={handleCancel}>
          {t('CANCEL')}
        </Button>
        <Button
          onClick={() => {
            handleStepChange('skip');
          }}>
          {t('SECTOR_BUTTON_CONTINUE')}
        </Button>
      </SC.StyledButtonsContainer>
    </StyledForm>
  );
};

export default DownloadTemplateStep;
