import { useTranslation } from 'next-i18next';
import Button from '@ui/button';
import styled from 'styled-components';
import Chip from '@ui/chip';
import useGetSectors from '@hooks/api/common/useGetSectors';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';
import * as SC from './form.style';
import { Theme } from '../../../../theme/theme';

const StyledTitleContainer = styled(SC.StyledTitleContainer)`
  align-items: flex-start;
  flex-direction: column;
  gap: 16px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    gap: 8px;
  }
`;

const StyledSubTitle = styled.p`
  color: ${({ theme }: { theme: Theme }) => theme.colors.black};
  font-style: normal;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
`;

const StyledChipContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 72px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    button {
      width: 100%;
    }
  }
`;

const SectorDataStep = () => {
  const { t } = useTranslation('signup');
  const router = useRouter();
  const sectors = useGetSectors();

  const [selectedButtonId, setSelectedButtonId] = useState<number | null>(null);

  const handleButtonClick = (id: number) => {
    setSelectedButtonId(id);
  };

  const handleNext = () => {
    router.push('/dashboards');
  };
  return (
    <SC.StyledForm data-aos='fade-left' data-aos-duration='500'>
      <StyledTitleContainer>
        <SC.StyledFormTitle>{t('SECTOR')}</SC.StyledFormTitle>
        <StyledSubTitle>{t('SECTOR_SUBTITLE')}</StyledSubTitle>
      </StyledTitleContainer>
      <StyledChipContainer>
        {sectors.data?.map(data => (
          <Fragment key={data.id}>
            <Chip
              label={data.name}
              onClick={() => handleButtonClick(data.id)}
              isSelected={selectedButtonId === data.id && true}
            />
          </Fragment>
        ))}
      </StyledChipContainer>
      <StyledButtonContainer>
        {selectedButtonId ? (
          <Button onClick={handleNext}>{t('SECTOR_BUTTON_CONTINUE')}</Button>
        ) : (
          <Button disabled>{t('SECTOR_BUTTON_CONTINUE')}</Button>
        )}
      </StyledButtonContainer>
    </SC.StyledForm>
  );
};

export default SectorDataStep;
