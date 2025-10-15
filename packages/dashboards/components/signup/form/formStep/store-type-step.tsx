/* eslint-disable array-callback-return */
import { useTranslation } from 'next-i18next';
import Button from '@ui/button';
import styled from 'styled-components';
import { useEffect, useState, useMemo } from 'react';
import useSaveStore from '@hooks/api/ecommerce/useSaveStore';
import * as SC from './form.style';
import { Theme } from '../../../../theme/theme';
import SyncEcommerceStep from './sync-ecommerce-step';
import DownloadTemplateStep from './download-template-step';

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

const StyledOptionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    flex-direction: column;
    gap: 24px;
  }
`;

const StyledInputContent = styled.div<{ checked: boolean }>`
  background: ${p =>
    p.checked
      ? ({ theme }: { theme: Theme }) => theme.colors.lightBlue
      : ({ theme }: { theme: Theme }) => theme.colors.almostWhite};
  min-width: 286px;
  height: 74px;
  border-radius: 8px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 25px;
  cursor: pointer;
  transition: all 0.2s ease-out;
  border: 2px solid ${p => (p.checked ? ({ theme }: { theme: Theme }) => theme.colors.blueSelection : 'transparent')};

  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    width: 100%;
  }
`;

const StyledTextContent = styled.div``;

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
const StyledItemTitle = styled.label`
  color: ${({ theme }: { theme: Theme }) => theme.colors.black};
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;
  cursor: pointer;
`;

type StoreTypeProps = {
  handleStepChange: (action: 'next' | 'prev' | 'skip') => void;
  handleSubstepChange: (substep: string) => void;
};

type StoreTypeOptions = {
  id: number;
  title: string;
  isSelected: boolean;
};

const StoreTypeStep = ({ handleStepChange, handleSubstepChange }: StoreTypeProps) => {
  const { t } = useTranslation('store');
  const { mutateAsync } = useSaveStore();
  const [allOptions, setAllOptions] = useState<Array<StoreTypeOptions>>([]);

  const baseOptions: Array<StoreTypeOptions> = useMemo(
    () => [
      {
        id: 0,
        title: `${t('STORE_VTEX_OPTION')}`,
        isSelected: true,
      },
      {
        id: 1,
        title: `${t('STORE_OPTION')}`,
        isSelected: false,
      },
    ],
    [t]
  );

  const [isVtex, setIsVtex] = useState(false);
  const [isStore, setIsStore] = useState(false);

  // @TODO add types
  const onSubmit: any = async () => {
    try {
      return await mutateAsync();
    } catch (error) {
      return error;
    }
  };

  const handleOnSelect = (id: number) => {
    const updatedOptions = allOptions.map((option: StoreTypeOptions) => {
      if (option.id === id) {
        return { ...option, isSelected: true };
      }
      return { ...option, isSelected: false };
    });
    setAllOptions(updatedOptions);
  };

  const handleClick = async () => {
    allOptions.map((option: StoreTypeOptions) => {
      if ((option.id === 0) === option.isSelected) {
        setIsVtex(true);
        setIsStore(false);
      } else {
        setIsVtex(false);
        setIsStore(true);
      }
    });
  };

  useEffect(() => {
    setAllOptions(baseOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  if (isStore) {
    handleSubstepChange('store');
    return (
      <DownloadTemplateStep
        handleStepChange={() => {
          onSubmit();
          handleStepChange('next');
        }}
      />
    );
  }

  if (isVtex) {
    handleSubstepChange('vtex');
    return <SyncEcommerceStep handleStepChange={handleStepChange} />;
  }

  return (
    <SC.StyledForm data-aos='fade-left' data-aos-duration='500'>
      <StyledTitleContainer>
        <SC.StyledFormTitle>{t('STORE_TYPE_TITLE')}</SC.StyledFormTitle>
        <StyledSubTitle>{t('STORE_TYPE_DESCRIPTION')}</StyledSubTitle>
      </StyledTitleContainer>
      <StyledOptionContainer>
        {allOptions.map(option => (
          <StyledInputContent key={option.id} checked={option.isSelected} onClick={() => handleOnSelect(option.id)}>
            <InputRadio
              type='radio'
              id='choice'
              name='check'
              value={option.title}
              checked={option.isSelected}
              onClick={() => handleOnSelect(option.id)}
              readOnly
            />
            <StyledTextContent>
              <StyledItemTitle htmlFor={option.title}>{option.title}</StyledItemTitle>
            </StyledTextContent>
          </StyledInputContent>
        ))}
      </StyledOptionContainer>
      <SC.StyledButtonsContainer>
        <Button onClick={handleClick}>{t('SELECT_BUTTON')}</Button>
      </SC.StyledButtonsContainer>
    </SC.StyledForm>
  );
};

export default StoreTypeStep;
