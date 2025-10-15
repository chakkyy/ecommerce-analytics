import { useModal } from '@ebay/nice-modal-react';
import QuitSignupPopup from '@ui/modals/quit-signup-popup';

import CompanyData from '@ui/forms/company-data';
import { useSaveCompanyLogo } from '@hooks/api/company/useSaveCompany';

type CompanyDataStepProps = {
  handleStepChange: (action: 'next' | 'prev' | 'skip') => void;
};

const CompanyDataStep = ({ handleStepChange }: CompanyDataStepProps) => {
  const { show: showQuitSignup } = useModal(QuitSignupPopup);
  const { mutateAsync: mutateLogo, isLoading } = useSaveCompanyLogo();

  return (
    <CompanyData
      handleStepChange={() => handleStepChange('next')}
      onCancel={showQuitSignup}
      isLoading={isLoading}
      onSubmit={mutateLogo}
      onSave={() => {}}
    />
  );
};

export default CompanyDataStep;
