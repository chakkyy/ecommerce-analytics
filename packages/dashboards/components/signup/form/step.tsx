import styled from 'styled-components';
import LeftArrow from '@icons/left-arrow';

import { useRouter } from 'next/router';
import { useState } from 'react';
import { CompanyDataStep, InviteUsersStep, PersonalDataStep, StoreTypeStep, SectorDataStep } from './formStep';
import { Theme } from '../../../theme/theme';

const StyledBackArrow = styled.button`
  all: unset;
  cursor: pointer;
  color: ${({ theme }: { theme: Theme }) => theme.colors.blue};
  width: max-content;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    width: 100%;
    text-align: start;
  }
`;

type StepProps = {
  handleStepChange: (action: 'next' | 'prev' | 'skip') => void;
  activeStep: 'personalDataStep' | 'companyDataStep' | 'storeTypeDataStep' | 'syncEcommerceStep' | 'inviteUsersStep';
  activeInvitationStep: 'personalDataStep' | 'sectorDataStep';
  withInvitation: boolean;
  invitationToken?: string;
};

const Step = ({ handleStepChange, activeStep, activeInvitationStep, withInvitation, invitationToken }: StepProps) => {
  const router = useRouter();
  const isFirstStep = activeStep === 'personalDataStep';
  const [substep, setSubstep] = useState('');

  const goBack = () => {
    router.back();
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (isFirstStep || !activeStep) {
      goBack();
    } else {
      handleStepChange('prev');
    }
    setSubstep('');
  };

  const handleSubstepChange = (subStep: string) => {
    setSubstep(subStep);
  };

  const renderStep = (step: string) => {
    switch (step) {
      case 'personalDataStep':
        return <PersonalDataStep handleStepChange={handleStepChange} withInvitation={withInvitation} />;
      case 'companyDataStep':
        return <CompanyDataStep handleStepChange={handleStepChange} />;
      case 'storeTypeDataStep':
        return <StoreTypeStep handleStepChange={handleStepChange} handleSubstepChange={handleSubstepChange} />;
      case 'inviteUsersStep':
        return <InviteUsersStep />;
      default:
        return null;
    }
  };

  const renderStepInvitation = (step: string) => {
    switch (step) {
      case 'personalDataStep':
        return (
          <PersonalDataStep
            handleStepChange={handleStepChange}
            withInvitation={withInvitation}
            invitationToken={invitationToken}
          />
        );
      case 'sectorDataStep':
        return <SectorDataStep />;
      default:
        return null;
    }
  };
  const isSyncEcommerceOrCompanyStep =
    activeStep === 'syncEcommerceStep' || activeStep === 'companyDataStep' || activeStep === 'inviteUsersStep';
  const isStoreTypeDataStep = activeStep === 'storeTypeDataStep' && substep === '';
  return (
    <>
      {!withInvitation && !isSyncEcommerceOrCompanyStep && !isStoreTypeDataStep && (
        <StyledBackArrow onClick={handleClick}>
          <LeftArrow />
        </StyledBackArrow>
      )}

      {withInvitation ? <>{renderStepInvitation(activeInvitationStep)}</> : <> {renderStep(activeStep)}</>}
    </>
  );
};

export default Step;
