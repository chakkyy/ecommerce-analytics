import CustomSelect from '@ui/select';
import { useTranslation } from 'next-i18next';

const SelectDashboardDropdown = ({
  handleChange,
}: {
  handleChange: (option: { value: string; label: string }) => void;
}) => {
  const { t } = useTranslation(['segments']);

  const dropdownRecipe = [{ value: 'DASHBOARD', label: `${t('segments:SEGMENT_DETAIL.DATA_MODAL.ITEM_DROPDOWN')}` }];

  return (
    <CustomSelect
      label={String(t('SEGMENT_DETAIL.DATA_MODAL.TITLE_DROPDOWN'))}
      options={dropdownRecipe}
      isSearchable={false}
      onChange={handleChange}
      placeholder={String(t('SEGMENT_DETAIL.DATA_MODAL.SELECT_PLACEHOLDER'))}
      withButton
    />
  );
};

export default SelectDashboardDropdown;
