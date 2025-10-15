import { Step, Steps, StepStatus } from '@interfaces/index';
import styled, { css } from 'styled-components';
import TextBody from '@ui/text-body';

import { useTranslation } from 'next-i18next';
import { Theme } from '../../theme/theme';

const StyledStepperContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 72px;
  gap: 54px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    flex-direction: row;
    gap: 85px;
    justify-content: center;
    margin-top: 42px;
  }
`;

const StyledVerticalLine = styled.div<{ isActive?: boolean }>`
  position: absolute;
  top: 10px;
  left: 5px;
  width: 1px;
  height: 80px;
  background: ${props =>
    props.isActive
      ? ({ theme }: { theme: Theme }) => theme.colors.grey
      : ({ theme }: { theme: Theme }) => theme.colors.lightGrey};

  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    top: auto;
    width: 100px;
    height: 1px;
  }
`;

const StyledStep = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  position: relative;
`;

const StyledStepCircle = styled.div<{ status: StepStatus }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  z-index: 2;

  ${props => {
    switch (props.status) {
      case 'active':
        return css`
          background: ${({ theme }: { theme: Theme }) => theme.colors.skyBlue};
          border: 2px solid ${({ theme }: { theme: Theme }) => theme.colors.blue};
        `;
      case 'inactive':
        return css`
          background: ${({ theme }: { theme: Theme }) => theme.colors.white};
          border: 1px solid ${({ theme }: { theme: Theme }) => theme.colors.grey};
        `;
      case 'completed':
        return css`
          background: ${({ theme }: { theme: Theme }) => theme.colors.blue};
        `;
      case 'skipped':
        return css`
          background: ${({ theme }: { theme: Theme }) => theme.colors.white};
          border: 2px solid ${({ theme }: { theme: Theme }) => theme.colors.blue};
        `;
      default:
        return null;
    }
  }}
`;

const StyledStepLabel = styled(TextBody)<{ status: StepStatus }>`
  width: 180px;
  ${props => {
    switch (props.status) {
      case 'active':
        return css`
          font-weight: 700;
        `;
      case 'inactive':
        return css`
          color: ${({ theme }: { theme: Theme }) => theme.colors.grey};
        `;
      case 'completed':
        return css`
          color: ${({ theme }: { theme: Theme }) => theme.colors.black};
        `;
      case 'skipped':
        return css`
          color: ${({ theme }: { theme: Theme }) => theme.colors.black};
        `;
      default:
        return null;
    }
  }}
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

interface Props {
  withInvitation: boolean;
  steps: Steps;
}
const Stepper = ({ withInvitation, steps }: Props) => {
  const { personalDataStep, companyDataStep, storeTypeDataStep, inviteUsersStep, sectorDataStep } = steps;
  const stepsArray = [personalDataStep, companyDataStep, storeTypeDataStep, inviteUsersStep];

  const stepsInvitationArray = [personalDataStep, sectorDataStep];
  const { t } = useTranslation('signup');

  const isStepReached = (step: Step) => {
    return step.status !== 'inactive';
  };

  return (
    <StyledStepperContainer>
      {withInvitation ? (
        <>
          {stepsInvitationArray.map((step: Step, index) => {
            return (
              <StyledStep key={step.label}>
                <StyledStepCircle status={step.status} />
                <StyledStepLabel status={step.status}>{t(`${step.label}`)}</StyledStepLabel>
                {index < 1 && <StyledVerticalLine isActive={isStepReached(stepsInvitationArray[index + 1])} />}
              </StyledStep>
            );
          })}
        </>
      ) : (
        <>
          {stepsArray.map((step: Step, index) => {
            return (
              <StyledStep key={step.label}>
                <StyledStepCircle status={step.status} />
                <StyledStepLabel status={step.status}>{t(`${step.label}`)}</StyledStepLabel>
                {index < 3 && <StyledVerticalLine isActive={isStepReached(stepsArray[index + 1])} />}
              </StyledStep>
            );
          })}
        </>
      )}
    </StyledStepperContainer>
  );
};

export default Stepper;
