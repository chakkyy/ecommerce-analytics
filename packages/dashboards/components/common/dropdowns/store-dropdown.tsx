import CustomSelect from '@ui/select-multi-store';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'next-i18next';

export const ALL_OPTION_SELECTED = '*';
interface DropdownAction {
  option: {
    label: string;
    value: string;
  };
}

const StoreDropdown = ({
  selectedStores,
  stores,
  isLoading,
  applyItems,
  cancelOptions,
  onUndoSelect,
  onClearFilters,
}: {
  selectedStores: string;
  stores: Array<{ id: number; ecommerceStoreId: number; name: string }>;
  isLoading: boolean;
  applyItems: (items: { label: string; value: string }[]) => void;
  cancelOptions: () => void;
  onUndoSelect: () => void;
  onClearFilters: () => void;
}) => {
  const { t } = useTranslation('store');
  const dropdownAllOption = { value: ALL_OPTION_SELECTED, label: String(t('STORE_DROPDOWN.ALL_STORES')) };
  const [appliedStores, setAppliedStores] = useState<string>('*');
  const [previousSelectedStores, setPreviousSelectedStores] = useState<string>('*');

  const dropdownStore = [dropdownAllOption].concat(
    stores?.map(store => ({
      value: String(store.id),
      label: `${store.name} - ${store.ecommerceStoreId}`,
    })) || []
  );

  const handleSelectedStores = (newOptions: string[]) => {
    setAppliedStores(
      newOptions
        .filter(opt => {
          return !!opt && opt !== ALL_OPTION_SELECTED;
        })
        .join(',')
    );
  };

  const handleChangeSegment = (action: DropdownAction) => {
    const id = action.option.value;
    if (id === ALL_OPTION_SELECTED) {
      setAppliedStores(ALL_OPTION_SELECTED);
      return;
    }

    const parsedStores = appliedStores.split(',');
    const existingOption = parsedStores.find(option => option === id);
    const newOptions = existingOption
      ? parsedStores.filter(option => option !== existingOption)
      : [...parsedStores, id];

    handleSelectedStores(newOptions);
  };

  const parsedSelectedStores = useMemo(() => appliedStores.split(',').filter(opt => !!opt), [appliedStores]);

  const value = useMemo(
    () => dropdownStore.filter(option => parsedSelectedStores.includes(option.value)),
    [parsedSelectedStores, dropdownStore]
  );
  const handleRemoveStore = (id: string) => {
    const parsedStores = appliedStores.split(',');
    const newOptions = parsedStores.filter(option => option !== id);
    handleSelectedStores(newOptions);
  };

  useEffect(() => {
    if (!parsedSelectedStores.length) {
      setAppliedStores(ALL_OPTION_SELECTED);
    }
  }, [parsedSelectedStores, setAppliedStores]);

  const handleOnUndoSelect = () => {
    setAppliedStores('*');
    onUndoSelect();
  };

  const handleCancelOptions = () => {
    setPreviousSelectedStores(selectedStores);
    setAppliedStores(previousSelectedStores);
    cancelOptions();
  };

  const handleClearFilters = () => {
    setAppliedStores('*');
    onClearFilters();
  };

  useEffect(() => {
    if (selectedStores) {
      setPreviousSelectedStores(selectedStores);
      setAppliedStores(selectedStores);
    }
  }, [selectedStores]);

  return (
    <CustomSelect
      options={dropdownStore}
      hideSelectedOptions={false}
      closeMenuOnSelect={false}
      value={value}
      selected={value}
      onChange={(_, action: DropdownAction) => handleChangeSegment(action)}
      isLoading={isLoading}
      onUndoSelect={handleOnUndoSelect}
      onRemoveStore={handleRemoveStore}
      applyItems={applyItems}
      cancelOptions={handleCancelOptions}
      onClearFilters={handleClearFilters}
    />
  );
};

export default StoreDropdown;
