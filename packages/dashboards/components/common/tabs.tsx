import styled from 'styled-components';
import { Theme } from '../../theme/theme';

import TextBody from './text-body';

const StyledContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 48px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    gap: 16px;
  }
`;

const StyledText = styled(TextBody)`
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    font-size: 18px;
  }
`;
const StyledTab = styled.div<{ isActive: boolean }>`
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    width: 50%;
    text-align: center;
  }
  padding-bottom: 8px;
  width: max-content;
  cursor: pointer;
  border-bottom: 2px solid
    ${props => (props.isActive ? ({ theme }: { theme: Theme }) => theme.colors.blue : 'transparent')};
  transition: border-bottom 0.2s ease-in-out;
  color: ${props =>
    props.isActive
      ? ({ theme }: { theme: Theme }) => theme.colors.blue
      : ({ theme }: { theme: Theme }) => theme.colors.grey};
`;

interface Props {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Tabs = ({ tabs, activeTab, setActiveTab }: Props) => {
  return (
    <StyledContainer>
      {tabs.map(tab => (
        <StyledTab key={tab} isActive={tab === activeTab} onClick={() => setActiveTab(tab)}>
          <StyledText variant='subtitle'>{tab}</StyledText>
        </StyledTab>
      ))}
    </StyledContainer>
  );
};

export default Tabs;
