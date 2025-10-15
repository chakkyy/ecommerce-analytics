import { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import Button from '@ui/button';
import { useRouter } from 'next/router';
import { useLayout } from '@hooks/useContext';
import CSVDropzone from '@ui/csv-dropzone';
import TemplateDropdown from '@ui/dropdowns/template-dropdown';

import { Theme } from '../../theme/theme';

const StyledWrapper = styled.div<{ isSidebarOpen: boolean }>`
  transition: all 0.3s ease-in-out;
  width: 100%;
`;
const StyledDropdown = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 10px;
  width: 250px;
`;

const StyledButtons = styled.div`
  margin-top: 72px;
  display: flex;
  justify-content: flex-end;
  gap: 24px;
`;

const StyledInputRadioWrapper = styled.div`
  margin-top: 40px;
  gap: 16px;
  display: flex;
  flex-direction: column;
`;
const StyledContent = styled.div``;
const StyledInputContent = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
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

const StyledItemTitle = styled.label`
  color: ${({ theme }: { theme: Theme }) => theme.colors.black};
  font-family: 'Roboto', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  cursor: pointer;
`;

const UploadFileComponent = () => {
  const { t } = useTranslation(['signup', 'store']);
  const { isSidebarOpen } = useLayout();
  const router = useRouter();

  const handleBack = () => {
    router.push('/select_template');
  };

  const handlePreview = () => {
    router.push('/preview');
  };
  const [allOptions, setAllOptions] = useState([
    {
      id: 0,
      title: `${t('store:UPLOAD_FILE.RADIO_BTN_NEW_UPLOAD')}`,
      isSelected: false,
    },
    {
      id: 1,
      title: `${t('store:UPLOAD_FILE.RADIO_BTN_UPLOAD')}`,
      isSelected: false,
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

  const [selected, setSelected] = useState<{ value: string; label: string }>();

  const handleChange = (selectedOption: { value: string; label: string }) => {
    setSelected(selectedOption);
  };

  return (
    <StyledWrapper isSidebarOpen={isSidebarOpen}>
      <StyledDropdown>
        <TemplateDropdown handleChange={handleChange} />
      </StyledDropdown>
      <CSVDropzone onChange={() => {}} isUploadFile />
      <StyledInputRadioWrapper>
        {allOptions.map(option => (
          <StyledContent key={option.id}>
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
              <StyledItemTitle htmlFor={option.title} onClick={() => handleOnSelect(option.id)}>
                {option.title}
              </StyledItemTitle>
            </StyledInputContent>
          </StyledContent>
        ))}
      </StyledInputRadioWrapper>
      <StyledButtons>
        <Button variant='secondary' onClick={handleBack}>
          {t('CANCEL')}
        </Button>

        {!disabledButton ? <Button disabled>{t('NEXT')}</Button> : <Button onClick={handlePreview}>{t('NEXT')}</Button>}
      </StyledButtons>
    </StyledWrapper>
  );
};

export default UploadFileComponent;
