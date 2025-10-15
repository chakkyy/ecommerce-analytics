import { useTranslation } from 'next-i18next';
import PersonalData from '@ui/forms/personal-data';
import { useModal } from '@ebay/nice-modal-react';
import QuitSettingsModal from '@ui/modals/quit-settings-modal';
import SaveSettingsModal from '@ui/modals/save-settings-modal';

const PersonalDataComponent = () => {
  useTranslation(['signup', 'login']);
  const { show: showQuitSettingsModal } = useModal(QuitSettingsModal);
  const { show: showSaveSettingsModal } = useModal(SaveSettingsModal);

  return (
    <PersonalData
      isLoading={false}
      handleStepChange={() => {}}
      onSubmit={async () => {}}
      onSave={showSaveSettingsModal}
      onCancel={showQuitSettingsModal}
      settingsStyles
    />
  );
};

export default PersonalDataComponent;
