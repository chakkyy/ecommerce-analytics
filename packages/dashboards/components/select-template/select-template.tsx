import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import Button from '@ui/button';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useLayout } from '@hooks/useContext';
import DownloadButton from '@ui/download-template-button';
import { Theme } from '../../theme/theme';

const StyledWrapper = styled.div<{ isSidebarOpen: boolean }>`
  transition: all 0.3s ease-in-out;
  width: 100%;
`;

const StyledItemTitle = styled.label`
  color: ${({ theme }: { theme: Theme }) => theme.colors.black};
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;
`;

const StyledItemWrapper = styled.div<{ checked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 26px;
  padding: 24px;
  margin-bottom: 24px;
  transition: all 0.2s ease-out;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid ${p => (p.checked ? ({ theme }: { theme: Theme }) => theme.colors.blueSelection : 'transparent')};
  background: ${p =>
    p.checked
      ? ({ theme }: { theme: Theme }) => theme.colors.lightBlue
      : ({ theme }: { theme: Theme }) => theme.colors.almostWhite};
  &:hover {
    background: ${({ theme }: { theme: Theme }) => theme.colors.lightBlue};
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

const StyledInputContent = styled.div``;

const StyledContent = styled.div`
  display: flex;
  align-items: center;
  gap: 25px;
`;

const StyledButtons = styled.div`
  margin-top: 72px;
  display: flex;
  justify-content: flex-end;
  gap: 24px;
`;

const SelectTemplateComponent = () => {
  const { t } = useTranslation(['signup', 'store']);
  const { isSidebarOpen } = useLayout();
  const router = useRouter();

  const [allOptions, setAllOptions] = useState([
    {
      id: 0,
      title: `${t('DOWNLOAD_TEMPLATE.SALE')}`,
      isSelected: false,
      fileName: 'Ventas.xlsx',
    },
    {
      id: 1,
      title: `${t('DOWNLOAD_TEMPLATE.CUSTOMERS')}`,
      isSelected: false,
      fileName: 'Clientes.xlsx',
    },
    {
      id: 2,
      title: `${t('DOWNLOAD_TEMPLATE.PRODUCTS')}`,
      isSelected: false,
      fileName: 'Productos.xlsx',
    },
    {
      id: 3,
      title: `${t('DOWNLOAD_TEMPLATE.STORE')}`,
      isSelected: false,
      fileName: 'Tiendas.xlsx',
    },
  ]);

  const handleOnSelect = (id: number) => {
    const updatedOptions = allOptions.map(option => {
      if (option.id === id) {
        return { ...option, isSelected: true };
      }
      return { ...option, isSelected: false };
    });
    setAllOptions(updatedOptions);
  };

  const disabledButton = allOptions.filter(option => option.isSelected).length;

  const handleBack = () => {
    router.push('/store');
  };

  const handleClick = () => {
    router.push('upload_file');
  };
  return (
    <StyledWrapper isSidebarOpen={isSidebarOpen}>
      {allOptions.map(option => (
        <StyledItemWrapper key={option.id} checked={option.isSelected} onClick={() => handleOnSelect(option.id)}>
          <StyledContent>
            <StyledInputContent>
              <InputRadio
                type='radio'
                id='choice'
                name='check'
                value={option.title}
                checked={option.isSelected}
                onClick={() => handleOnSelect(option.id)}
                readOnly
              />
            </StyledInputContent>
            <StyledItemTitle htmlFor={option.title}>{option.title}</StyledItemTitle>
          </StyledContent>
          <DownloadButton fileName={option.fileName} />
        </StyledItemWrapper>
      ))}
      <StyledButtons>
        <Button variant='secondary' onClick={handleBack}>
          {t('CANCEL')}
        </Button>
        {!disabledButton ? (
          <Button disabled>{t('store:SELECT_BUTTON')}</Button>
        ) : (
          <Button onClick={handleClick}>{t('store:SELECT_BUTTON')}</Button>
        )}
      </StyledButtons>
    </StyledWrapper>
  );
};

export default SelectTemplateComponent;
