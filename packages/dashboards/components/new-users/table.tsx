import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import WrapperShadow from '@ui/wrapper-shadow';
import { Theme } from '../../theme/theme';

const StyledWrapper = styled.div`
  height: calc(100vh - 390px);
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    height: calc(100vh - 300px);
  }
`;

const StyledtTable = styled.table`
  border-collapse: collapse;
  font-family: 'Roboto', sans-serif;
  width: 100%;
`;

const StyledTHead = styled.thead`
  text-align: left;
`;

const StyledContent = styled.tr`
  text-align: left;
`;

const StyledTBody = styled.tbody``;

const StyledContentData = styled.tr`
  border-bottom: 1px solid ${({ theme }: { theme: Theme }) => theme.colors.lightGrey};
`;

const StyledTitle = styled.th`
  text-align: left;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: ${({ theme }: { theme: Theme }) => theme.colors.grey};
  padding: 0px 0px 16px;
`;

const StyledNameSegment = styled.td`
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;
  color: ${({ theme }: { theme: Theme }) => theme.colors.black};
  display: flex;
  align-items: center;
  padding: 24px 0px;

  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    padding: 16px 30px 16px 0px;
  }
`;

const StyledDescriptionSegment = styled.td`
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: ${({ theme }: { theme: Theme }) => theme.colors.black};
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    padding: 16px 20px 16px 0px;
  }
`;

const StyledWithoutData = styled(StyledTitle)`
  font-style: normal;
  text-align: center;
  padding-top: 70px;
  display: flex;
  justify-content: center;
`;
const Table = ({ data }: { data: any }) => {
  const { t } = useTranslation(['segments', 'common']);
  const usersLength = data?.users.length;

  return (
    <WrapperShadow defaultActive>
      <StyledWrapper>
        <StyledtTable>
          <StyledTHead>
            <StyledContent>
              <StyledTitle>{t('SEGMENT_DETAIL.TABLE.NAME')}</StyledTitle>
              <StyledTitle>{t('SEGMENT_DETAIL.TABLE.EMAIL')}</StyledTitle>
              <StyledTitle>{t('SEGMENT_DETAIL.TABLE.PHONE')}</StyledTitle>
            </StyledContent>
          </StyledTHead>
          <StyledTBody>
            {data?.users.map((user: { fullName: string; phone: string; email: string }, index: number) => (
              // eslint-disable-next-line react/no-array-index-key
              <StyledContentData key={user.email + index}>
                <StyledNameSegment>{user.fullName}</StyledNameSegment>
                <StyledDescriptionSegment>{user.email}</StyledDescriptionSegment>
                <StyledDescriptionSegment>{user.phone}</StyledDescriptionSegment>
              </StyledContentData>
            ))}
          </StyledTBody>
        </StyledtTable>
        {usersLength === 0 && <StyledWithoutData>{t('common:NO_DATA_AVAILABLE')}</StyledWithoutData>}
      </StyledWrapper>
    </WrapperShadow>
  );
};

export default Table;
