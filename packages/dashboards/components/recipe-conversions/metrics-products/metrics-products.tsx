import { useTranslation } from 'next-i18next';
import styled from 'styled-components';
import { useState } from 'react';
import Button from '@ui/button';
import Input from '@ui/input';
import BarraIcon from '@icons/barra-icon';
import LineIcon from '@icons/line-icon';
import GraphicIcon from '@icons/graphic-icon';
import TableIcon from '@icons/table-icon';
import NumbersIcon from '@icons/numbers-icon';
import ColorPaletteIcon from '@icons/color-palette1';
import ColorPaletteIcon2 from '@icons/color-palette2';
import Link from 'next/link';
import RecipesDropdown from '@ui/dropdowns/recipes-dropdown';
import FrequencyDropdown from '@ui/dropdowns/frequency-dropdown';
import FilterDropdown from '@ui/dropdowns/filter-dropdown';
import SeriesDropdown from '@ui/dropdowns/series-dropdown';
import GlobalSegmentDropdown from '@ui/dropdowns/global-segment-dropdown';
import { useRouter } from 'next/router';
import { Theme } from '../../../theme/theme';

const StyledWrapper = styled.div`
  max-width: 828px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.xl}) {
    max-width: 495px;
  }

  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    width: 100%;
  }
`;

const StyledTitle = styled.h1`
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  font-family: 'Roboto', sans-serif;
  color: ${({ theme }: { theme: Theme }) => theme.colors.black};
`;

const StyledCategory = styled.h1`
  font-weight: 700;
  font-size: 20px;
  line-height: 130%;
  font-family: 'Roboto', sans-serif;
  color: ${({ theme }: { theme: Theme }) => theme.colors.black};
`;

const StyledButtons = styled.div`
  margin-top: 72px;
  display: flex;
  justify-content: flex-end;
  gap: 24px;

  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    margin-top: 40px;
    flex-direction: column-reverse;
    button {
      width: 100%;
    }
  }
`;

const StyledLabel = styled(StyledTitle)`
  margin: 23px 0 8px;
`;

const StyledIconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    gap: 14px;
  }
`;

const StyledIconContent = styled.div<{ selected?: boolean }>`
  background-color: ${({ theme }: { theme: Theme }) => theme.colors.almostWhite};
  width: 72px;
  height: 72px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid ${p => (p.selected ? ({ theme }: { theme: Theme }) => theme.colors.blueSelection : 'transparent')};

  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    width: 54px;
    height: 54px;
  }
`;

const StyledInputContainer = styled.div`
  display: flex;
  gap: 50px;
  padding-top: 8px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.xl}) {
    gap: 42px;
  }

  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    gap: 16px;
  }
`;

const StyledInputContent = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) { 
    gap: 8px;}
  svg {
    @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.xl}) {
width: 102px;
  }


 `;
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

const MetricsProducts = () => {
  const { t } = useTranslation(['recipe-conversions', 'new-metric']);
  const router = useRouter();

  const [selected, setSelected] = useState<{ value: string; label: string }>();

  const handleChange = (selectedOption: { value: string; label: string }) => {
    setSelected(selectedOption);
  };

  const handleClick = () => {
    router.push('/dashboards');
  };
  return (
    <StyledWrapper>
      <StyledTitle>{t('METRIC')}</StyledTitle>
      <StyledCategory>{t('PRODUCT')}</StyledCategory>
      <RecipesDropdown handleChange={handleChange} />
      <StyledLabel>{t('GRAPHIC')}</StyledLabel>
      <StyledIconContainer>
        <StyledIconContent>
          <BarraIcon />
        </StyledIconContent>
        <StyledIconContent selected>
          <LineIcon />
        </StyledIconContent>
        <StyledIconContent>
          <GraphicIcon />
        </StyledIconContent>
        <StyledIconContent>
          <TableIcon />
        </StyledIconContent>
        <StyledIconContent>
          <NumbersIcon />
        </StyledIconContent>
      </StyledIconContainer>
      <FrequencyDropdown handleChange={handleChange} />
      <FilterDropdown handleChange={handleChange} />
      <Input label={String(t('TITLE'))} placeholder={String(t('CONVERSIONS'))} />
      <SeriesDropdown handleChange={handleChange} />
      <GlobalSegmentDropdown />

      <StyledLabel>{t('COLOR_PALETTE')}</StyledLabel>

      <StyledInputContainer>
        <StyledInputContent>
          <InputRadio type='radio' id='choice' name='check' />
          <ColorPaletteIcon />
        </StyledInputContent>

        <StyledInputContent>
          <InputRadio type='radio' id='choice' name='check' />
          <ColorPaletteIcon2 />
        </StyledInputContent>
      </StyledInputContainer>

      <StyledButtons>
        <Link href='/new_metric'>
          <Button variant='secondary'>{t('BUTTON.CANCEL')}</Button>
        </Link>
        {selected ? (
          <Button onClick={handleClick}>{t('BUTTON.ADD')}</Button>
        ) : (
          <Button disabled>{t('BUTTON.ADD')}</Button>
        )}
      </StyledButtons>
    </StyledWrapper>
  );
};

export default MetricsProducts;
