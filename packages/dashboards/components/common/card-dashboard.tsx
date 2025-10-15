import styled from 'styled-components';
import TextBody from '@ui/text-body';
import SegmentIcon from '@icons/segment-icon';
import { Theme } from '../../theme/theme';

const StyledDashboardWrapper = styled.div`
  padding: 32px;
  display: flex;
  width: 495px;
  flex-direction: column;
  gap: 16px;
  background: ${({ theme }: { theme: Theme }) => theme.colors.lightBlue};
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: ${({ theme }: { theme: Theme }) => theme.colors.cloudBlue};
  }

  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    width: 100%;
    padding: 24px;
  }
`;

const StyledDashboardTitleWrapper = styled.div``;
const StyledDashboardSector = styled(TextBody)``;
const StyledDashboardTitle = styled.h4`
  overflow: hidden;
  text-overflow: ellipsis;
  text-wrap: nowrap;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    font-size: 24px;
    max-width: 75vw;
  }
`;

const StyledDashboardInfo = styled(TextBody)`
  display: flex;
  gap: 8px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    font-size: 14px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

interface Props {
  title: string;
  metricLenght: number;
}

const CardDashboard = ({ title, metricLenght }: Props) => {
  return (
    <StyledDashboardWrapper>
      <StyledDashboardTitleWrapper>
        <StyledDashboardSector>E-Commerce</StyledDashboardSector>
        <StyledDashboardTitle title={title}>{title}</StyledDashboardTitle>
      </StyledDashboardTitleWrapper>
      <StyledDashboardInfo variant='light'>
        <SegmentIcon />
        {metricLenght} gráficos de información
      </StyledDashboardInfo>
    </StyledDashboardWrapper>
  );
};
export default CardDashboard;
