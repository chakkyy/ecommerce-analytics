import CustomSelect from '@ui/select';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

const GlobalSegmentDropdown = () => {
  const { t } = useTranslation(['recipe-conversions', 'new-metric']);

  const dropdownSegment = [
    { value: 'USER_ABANDON', label: `${t('SEGMENT_DROPDOWN.USER_ABANDON')}` },
    { value: 'USER_CART', label: `${t('SEGMENT_DROPDOWN.USER_CART')}` },
    { value: 'USER_HOME', label: `${t('SEGMENT_DROPDOWN.USER_HOME')}` },
    { value: 'USER_CANCEL', label: `${t('SEGMENT_DROPDOWN.USER_CANCEL')}` },
    { value: 'USER_QUICKLY', label: `${t('SEGMENT_DROPDOWN.USER_QUICKLY')}` },
  ];

  const [selectedSegment, setSelectedSegment] = useState<Array<{ value: string; label: string }>>([]);
  const [allValues, setAllValues] = useState<Array<{ value: string; label: string }>>([]);

  const dropdownAllOption = [{ value: '*', label: `${t('SEGMENT_DROPDOWN.ALL')}` }];

  const handleChangeSegment = (selectedOption: Array<{ value: string; label: string }>) => {
    const allSelected = selectedOption.find((option: { value: string; label: string }) => option.value === '*');

    if (allSelected) {
      setSelectedSegment(dropdownAllOption);
      setAllValues([...dropdownSegment]);
    } else {
      setSelectedSegment(selectedOption);
      setAllValues(selectedOption);
    }
  };

  return (
    <CustomSelect
      label={String(t('SEGMENT'))}
      options={[...dropdownAllOption, ...dropdownSegment]}
      isSearchable={false}
      hideSelectedOptions={false}
      closeMenuOnSelect={false}
      value={selectedSegment}
      onChange={handleChangeSegment}
      placeholder={String(t('common:SELECT_PLACEHOLDER'))}
      isMulti
      withCheckbox
    />
  );
};

export default GlobalSegmentDropdown;
