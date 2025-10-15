import { SignUpProps } from '@interfaces/index';
import styled from 'styled-components';
import Step from './step';
import { Theme } from '../../../theme/theme';

const StyledStepContainer = styled.div`
  display: flex;
  flex-direction: column;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    align-items: center;
    margin-top: 40px;
  }
`;

const SignupForm = ({ steps, setStep, withInvitation, invitationToken }: SignUpProps) => {
  const activeStep = JSON.stringify(Object.keys(steps).find(key => steps[key].status === 'active'));

  const handleStepChange = (action: 'next' | 'prev' | 'skip') => {
    const keys = Object.keys(steps);
    const updatedSteps = { ...steps };
    let activeStepIndex = -1;

    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < keys.length; i++) {
      if (steps[keys[i]].status === 'active') {
        // eslint-disable-next-line no-nested-ternary
        const newStatus = action === 'next' ? 'completed' : action === 'skip' ? 'skipped' : 'inactive';
        updatedSteps[keys[i]] = { ...steps[keys[i]], status: newStatus };
        activeStepIndex = i;
        break;
      }
    }

    const stepIndex = activeStepIndex + (action === 'prev' ? -1 : 1);
    if (stepIndex < keys.length && stepIndex >= 0) {
      updatedSteps[keys[stepIndex]] = { ...steps[keys[stepIndex]], status: 'active' };
    }

    setStep(updatedSteps);
  };

  return (
    <StyledStepContainer>
      <Step
        activeInvitationStep={activeStep && JSON.parse(activeStep)}
        activeStep={activeStep && JSON.parse(activeStep)}
        withInvitation={withInvitation}
        handleStepChange={handleStepChange}
        invitationToken={invitationToken}
      />
    </StyledStepContainer>
  );
};

export default SignupForm;
