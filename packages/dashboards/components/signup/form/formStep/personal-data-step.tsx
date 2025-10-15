import { useTranslation } from 'next-i18next';
import useSaveUser from '@hooks/api/user/useSaveUser';
import PersonalDataForm from '@ui/forms/personal-data';
import { useModal } from '@ebay/nice-modal-react';
import QuitSignupPopup from '@ui/modals/quit-signup-popup';

type PersonalDataStepProps = {
  handleStepChange: (action: 'next' | 'prev' | 'skip') => void;
  withInvitation: boolean;
  invitationToken?: string;
};

const PersonalDataInvitationStep = ({ handleStepChange, withInvitation, invitationToken }: PersonalDataStepProps) => {
  useTranslation('signup');

  const { mutateAsync: mutateAsyncSave, isLoading } = useSaveUser();
  const { show: showQuitSignup } = useModal(QuitSignupPopup);
  return (
    <PersonalDataForm
      handleStepChange={() => handleStepChange('next')}
      withInvitation={withInvitation}
      invitationToken={invitationToken}
      onSubmit={mutateAsyncSave}
      onCancel={showQuitSignup}
      isLoading={isLoading}
      onSave={() => {}}
    />
  );
};

export default PersonalDataInvitationStep;
