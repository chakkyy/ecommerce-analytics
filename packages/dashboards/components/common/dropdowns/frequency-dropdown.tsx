import CustomSelect from '@ui/select';
import { useTranslation } from 'next-i18next';

const FrequencyDropdown = ({ handleChange }: { handleChange: (option: { value: string; label: string }) => void }) => {
  const { t } = useTranslation(['recipe-conversions', 'new-metric', 'common']);

  const dropdownDate = [
    { value: 'TODAY', label: `${t('DATE_DROPDOWN.TODAY')}` },
    { value: 'LAST_7_DAYS', label: `${t('DATE_DROPDOWN.LAST_7_DAYS')}` },
    { value: 'LAST_30_DAYS', label: `${t('DATE_DROPDOWN.LAST_30_DAYS')}` },
    { value: 'LAST_6_MONTHS', label: `${t('DATE_DROPDOWN.LAST_6_MONTHS')}` },
    { value: 'LAST_YEAR', label: `${t('DATE_DROPDOWN.LAST_YEAR')}` },
  ];

  return (
    <CustomSelect
      label={String(t('DATE'))}
      options={dropdownDate}
      isSearchable={false}
      onChange={handleChange}
      placeholder={String(t('common:SELECT_PLACEHOLDER'))}
    />
  );
};

export default FrequencyDropdown;
