import CustomSelect from '@ui/select';
import { useTranslation } from 'next-i18next';

const TemplateDropdown = ({ handleChange }: { handleChange: (option: { value: string; label: string }) => void }) => {
  const { t } = useTranslation('signup');

  const dropdownSeries = [
    { value: 'STORE', label: `${t('DOWNLOAD_TEMPLATE.STORE')}` },
    { value: 'CUSTOMERS', label: `${t('DOWNLOAD_TEMPLATE.CUSTOMERS')}` },
    { value: 'PRODUCTS', label: `${t('DOWNLOAD_TEMPLATE.PRODUCTS')}` },
    { value: 'SALE', label: `${t('DOWNLOAD_TEMPLATE.SALE')}` },
  ];

  return (
    <CustomSelect
      options={dropdownSeries}
      label='Template'
      isSearchable={false}
      onChange={handleChange}
      placeholder={String(t('DOWNLOAD_TEMPLATE.STORE'))}
      isTemplateDropdown
    />
  );
};

export default TemplateDropdown;
