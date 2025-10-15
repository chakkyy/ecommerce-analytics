import CustomSelect from '@ui/select';
import { useTranslation } from 'next-i18next';

const RecipesDropdown = ({ handleChange }: { handleChange: (option: { value: string; label: string }) => void }) => {
  const { t } = useTranslation(['recipe-conversions', 'new-metric']);

  const dropdownRecipe = [
    { value: 'CONVERSIONS', label: `${t('new-metric:PRODUCT_RECIPES.CONVERSIONS')}` },
    { value: 'COSTS_PER_TRANSACTION', label: `${t('new-metric:PRODUCT_RECIPES.COSTS_PER_TRANSACTION')}` },
    { value: 'TOTAL_COSTS', label: `${t('new-metric:PRODUCT_RECIPES.TOTAL_COSTS')}` },
    { value: 'AVERAGE_REVENUE', label: `${t('new-metric:PRODUCT_RECIPES.AVERAGE_REVENUE')}` },
    { value: 'SEGMENT_REVENUE', label: `${t('new-metric:PRODUCT_RECIPES.SEGMENT_REVENUE')}` },
    { value: 'REVENUE_PER_TRANSACTION', label: `${t('new-metric:PRODUCT_RECIPES.REVENUE_PER_TRANSACTION')}` },
    { value: 'TOTAL_REVENUE', label: `${t('new-metric:PRODUCT_RECIPES.TOTAL_REVENUE')}` },
  ];

  return (
    <CustomSelect
      label={String(t('RECIPE'))}
      options={dropdownRecipe}
      isSearchable={false}
      onChange={handleChange}
      placeholder={String(t('common:SELECT_PLACEHOLDER'))}
    />
  );
};

export default RecipesDropdown;
