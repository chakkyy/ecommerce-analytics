import CustomSelect from '@ui/select';
import { useTranslation } from 'next-i18next';

const FilterDropdown = ({ handleChange }: { handleChange: (option: { value: string; label: string }) => void }) => {
  const { t } = useTranslation(['recipe-conversions', 'new-metric', 'common']);

  const dropdownFilter = [
    { value: 'RANK_OF_TIME', label: `${t('FILTER_DROPDOWN.RANK_OF_TIME')}` },
    { value: 'COST_RANGE', label: `${t('FILTER_DROPDOWN.COST_RANGE')}` },
  ];

  return (
    <CustomSelect
      label={String(t('FILTER'))}
      options={dropdownFilter}
      isSearchable={false}
      onChange={handleChange}
      placeholder={String(t('common:SELECT_PLACEHOLDER'))}
    />
  );
};

export default FilterDropdown;
