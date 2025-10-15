import CustomSelect from '@ui/select';
import { useTranslation } from 'next-i18next';

const SeriesDropdown = ({ handleChange }: { handleChange: (option: { value: string; label: string }) => void }) => {
  const { t } = useTranslation(['recipe-conversions', 'new-metric']);

  const dropdownSeries = [
    { value: 'TOP', label: `${t('SERIES_DROPDOWN.TOP')}` },
    { value: 'BOTTOM', label: `${t('SERIES_DROPDOWN.BOTTOM')}` },
    { value: 'LEFT', label: `${t('SERIES_DROPDOWN.LEFT')}` },
    { value: 'RIGHT', label: `${t('SERIES_DROPDOWN.RIGHT')}` },
  ];

  return (
    <CustomSelect
      label={String(t('SERIES'))}
      options={dropdownSeries}
      isSearchable={false}
      onChange={handleChange}
      placeholder={String(t('common:SELECT_PLACEHOLDER'))}
    />
  );
};

export default SeriesDropdown;
