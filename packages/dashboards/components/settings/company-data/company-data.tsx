import { useTranslation } from 'next-i18next';
import { useModal } from '@ebay/nice-modal-react';
import QuitSettingsModal from '@ui/modals/quit-settings-modal';
import CompanyData from '@ui/forms/company-data';
import { useSaveCompanyLogo } from '@hooks/api/company/useSaveCompany';
import SaveSettingsModal from '@ui/modals/save-settings-modal';

const CompanyDataComponent = () => {
  useTranslation(['signup', 'login']);
  const { show: showQuitSettingsModal } = useModal(QuitSettingsModal);
  const { mutateAsync: mutateLogo, isLoading } = useSaveCompanyLogo();
  const { show: showSaveSettingsModal } = useModal(SaveSettingsModal);

  return (
    <CompanyData
      handleStepChange={() => {}}
      onCancel={showQuitSettingsModal}
      onSave={showSaveSettingsModal}
      isLoading={isLoading}
      onSubmit={mutateLogo}
    />
  );
};

export default CompanyDataComponent;
