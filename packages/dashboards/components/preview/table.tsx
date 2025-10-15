import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import WrapperShadow from '@ui/wrapper-shadow';
import AlertIcon from '@icons/alert-icon';
import Button from '@ui/button';
import { useRouter } from 'next/router';
import { Theme } from '../../theme/theme';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const StyledWrapperShadow = styled(WrapperShadow)`
  padding-right: 0px;
  overflow-x: scroll;
`;
const StyledWrapperContent = styled.div`
  height: calc(100vh - 390px);
`;

const StyledtTable = styled.table`
  border-collapse: collapse;

  font-family: 'Roboto', sans-serif;
  width: 100%;
`;

const StyledTHead = styled.thead`
  text-align: center;
`;

const StyledContent = styled.tr`
  text-align: center;
`;

const StyledTBody = styled.tbody``;

const StyledContentData = styled.tr`
  @media (min-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.xl}) {
  }
`;

const StyledTitle = styled.th<{ isEmpty?: number }>`
  text-align: center;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: ${({ theme }: { theme: Theme }) => theme.colors.black};
  white-space: nowrap;
  padding: 7px 0px 9px;
  border: 1px solid ${({ theme }: { theme: Theme }) => theme.colors.lightGrey};
  border-left: none;
  &:first-child {
    border: none;
  }
`;
const StyledTitleSchuedule = styled(StyledTitle)`
  color: ${props =>
    !props.isEmpty
      ? ({ theme }: { theme: Theme }) => theme.colors.redError
      : ({ theme }: { theme: Theme }) => theme.colors.black};
  border-left: 2px solid ${p => (!p.isEmpty ? ({ theme }: { theme: Theme }) => theme.colors.redError : '')};
  border-right: 2px solid ${p => (!p.isEmpty ? ({ theme }: { theme: Theme }) => theme.colors.redError : '')};
  border-top: 2px solid ${p => (!p.isEmpty ? ({ theme }: { theme: Theme }) => theme.colors.redError : '')};
  border-top-left-radius: 80px 80px;
`;

const StyledTitleCell = styled(StyledTitle)`
  color: ${({ theme }: { theme: Theme }) => theme.colors.blue};
  border-top: none;
  border-left: none;
`;

const StyledDescriptionSegment = styled.td<{ isEmpty?: number }>`
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: ${({ theme }: { theme: Theme }) => theme.colors.grey};
  text-align: center;
  white-space: nowrap;
  padding: 7px 37px;
  border: 1px solid ${({ theme }: { theme: Theme }) => theme.colors.lightGrey};
`;

const StyledCellNumber = styled(StyledDescriptionSegment)`
  border: none;
`;

const StyledSchedule = styled(StyledDescriptionSegment)`
  border-left: 2px solid ${p => (!p.isEmpty ? ({ theme }: { theme: Theme }) => theme.colors.redError : '')};
  border-right: 2px solid ${p => (!p.isEmpty ? ({ theme }: { theme: Theme }) => theme.colors.redError : '')};
`;
const StyledCellUser = styled(StyledDescriptionSegment)`
  border-left: none;
`;
const StyledError = styled.div`
  color: ${({ theme }: { theme: Theme }) => theme.colors.redError};
`;
const AlertWrapper = styled.div`
  background: ${({ theme }: { theme: Theme }) => theme.colors.lightRed};
  height: 56px;
  display: flex;
  align-items: center;
  border-radius: 8px;
  padding: 16px 24px;
  gap: 16px;
  width: max-content;
`;

const StyledTextError = styled.h1`
  font-family: 'Roboto', sans-serif;
  color: ${({ theme }: { theme: Theme }) => theme.colors.black};
  font-weight: 300;
  font-size: 14px;
  line-height: 130%;
  max-width: 728px;
`;

const StyledButtons = styled.div`
  margin-top: 72px;
  display: flex;
  justify-content: flex-end;
  gap: 24px;
  margin-right: 100px;
`;
const Table = () => {
  const { t } = useTranslation('preview');
  const router = useRouter();

  const cell = [
    { id: 1, cell: 'A' },
    { id: 2, cell: 'B' },
    { id: 3, cell: 'C' },
    { id: 4, cell: 'D' },
    { id: 5, cell: 'E' },
    { id: 6, cell: 'F' },
    { id: 7, cell: 'G' },
    { id: 8, cell: 'H' },
    { id: 9, cell: 'I' },
    { id: 10, cell: 'J' },
    { id: 11, cell: 'K' },
    { id: 12, cell: 'L' },
    { id: 13, cell: 'M' },
    { id: 14, cell: 'N' },
    { id: 15, cell: 'R' },
    { id: 16, cell: 'O' },
    { id: 17, cell: 'P' },
    { id: 18, cell: 'Q' },
  ];
  const dataTable = [
    {
      id: 1,
      label: '1',
      user: 'Ntrillo',
      amount: '12',
      date: '31-marz-23',
      business: 'Tienda',
      numberId: '2434',
      month: 'Enero',
      phone: '1122934628',
      address: 'Av. Corrientes 549',
      schedule: '',
    },
    {
      id: 2,
      label: '2',
      user: 'Ntrillo',
      amount: '12',
      date: '31-marz-23',
      business: 'Tienda',
      numberId: '2434',
      month: 'Enero',
      phone: '1122934628',
      address: 'Av. Corrientes 549',
      schedule: '',
    },
    {
      id: 3,
      label: '3',
      user: 'Ntrillo',
      amount: '12',
      date: '31-marz-23',
      business: 'Tienda',
      numberId: '2434',
      month: 'Enero',
      phone: '1122934628',
      address: 'Av. Corrientes 549',
      schedule: '',
    },
    {
      id: 4,
      label: '4',
      user: 'Ntrillo',
      amount: '12',
      date: '31-marz-23',
      business: 'Tienda',
      numberId: '2434',
      month: 'Enero',
      phone: '1122934628',
      address: 'Av. Corrientes 549',
      schedule: '',
    },
    {
      id: 5,
      label: '5',
      user: 'Ntrillo',
      amount: '12',
      date: '31-marz-23',
      business: 'Tienda',
      numberId: '2434',
      month: 'Enero',
      phone: '1122934628',
      address: 'Av. Corrientes 549',
      schedule: '',
    },
    {
      id: 6,
      label: '6',
      user: 'Ntrillo',
      amount: '12',
      date: '31-marz-23',
      business: 'Tienda',
      numberId: '2434',
      month: 'Enero',
      phone: '1122934628',
      address: 'Av. Corrientes 549',
      schedule: '',
    },
    {
      id: 7,
      label: '7',
      user: 'Ntrillo',
      amount: '12',
      date: '31-marz-23',
      business: 'Tienda',
      numberId: '2434',
      month: 'Enero',
      phone: '1122934628',
      address: 'Av. Corrientes 549',
      schedule: '',
    },
    {
      id: 8,
      label: '8',
      user: 'Ntrillo',
      amount: '12',
      date: '31-marz-23',
      business: 'Tienda',
      numberId: '2434',
      month: 'Enero',
      phone: '1122934628',
      address: 'Av. Corrientes 549',
      schedule: '',
    },
    {
      id: 9,
      label: '9',
      user: 'Ntrillo',
      amount: '12',
      date: '31-marz-23',
      business: 'Tienda',
      numberId: '2434',
      month: 'Enero',
      phone: '1122934628',
      address: 'Av. Corrientes 549',
      schedule: '',
    },
    {
      id: 10,
      label: '10',
      user: 'Ntrillo',
      amount: '12',
      date: '31-marz-23',
      business: 'Tienda',
      numberId: '2434',
      month: 'Enero',
      phone: '1122934628',
      address: 'Av. Corrientes 549',
      schedule: '',
    },
    {
      id: 11,
      label: '11',
      user: 'Ntrillo',
      amount: '12',
      date: '31-marz-23',
      business: 'Tienda',
      numberId: '2434',
      month: 'Enero',
      phone: '1122934628',
      address: 'Av. Corrientes 549',
      schedule: '',
    },
    {
      id: 12,
      label: '12',
      user: 'Ntrillo',
      amount: '12',
      date: '31-marz-23',
      business: 'Tienda',
      numberId: '2434',
      month: 'Enero',
      phone: '1122934628',
      address: 'Av. Corrientes 549',
      schedule: '',
    },
  ];

  const emptyCell = dataTable.filter(data => data.schedule).length;

  return (
    <>
      <StyledError>
        <AlertWrapper>
          <AlertIcon />
          <StyledTextError>{t('ALERT_TEXT')}</StyledTextError>
        </AlertWrapper>{' '}
      </StyledError>
      <StyledWrapper>
        <StyledWrapperShadow defaultActive>
          <StyledWrapperContent>
            <StyledtTable>
              <StyledTHead>
                <StyledContent>
                  <StyledTitle>&nbsp;</StyledTitle>
                  {cell.map(data => (
                    <StyledTitleCell key={data.id}>{data.cell}</StyledTitleCell>
                  ))}
                </StyledContent>
              </StyledTHead>
              <StyledTHead>
                <StyledContent>
                  <StyledTitle>&nbsp;</StyledTitle>
                  <StyledTitle>{t('TABLE.USER')}</StyledTitle>
                  <StyledTitle>{t('TABLE.AMOUNT')}</StyledTitle>
                  <StyledTitle>{t('TABLE.DATE')}</StyledTitle>
                  <StyledTitle>{t('TABLE.BUSINESS')}</StyledTitle>
                  <StyledTitle>{t('TABLE.NUMBER_ID')}</StyledTitle>
                  <StyledTitle>{t('TABLE.MONTH')}</StyledTitle>
                  <StyledTitle>{t('TABLE.PHONE')}</StyledTitle>
                  <StyledTitle>{t('TABLE.ADDRESS')}</StyledTitle>
                  <StyledTitleSchuedule isEmpty={emptyCell}>{t('TABLE.SCHEDULE')}</StyledTitleSchuedule>
                  <StyledTitle>{t('TABLE.USER')}</StyledTitle>
                  <StyledTitle>{t('TABLE.AMOUNT')}</StyledTitle>
                  <StyledTitle>{t('TABLE.DATE')}</StyledTitle>
                  <StyledTitle>{t('TABLE.BUSINESS')}</StyledTitle>
                  <StyledTitle>{t('TABLE.NUMBER_ID')}</StyledTitle>
                  <StyledTitle>{t('TABLE.MONTH')}</StyledTitle>
                  <StyledTitle>{t('TABLE.PHONE')}</StyledTitle>
                  <StyledTitle>{t('TABLE.ADDRESS')}</StyledTitle>
                  <StyledTitleSchuedule isEmpty={emptyCell}>{t('TABLE.SCHEDULE')}</StyledTitleSchuedule>
                </StyledContent>
              </StyledTHead>
              <StyledTBody>
                {dataTable.map(data => (
                  <StyledContentData key={data.id}>
                    <StyledCellNumber>{data.label}</StyledCellNumber>
                    <StyledCellUser>{data.user}</StyledCellUser>
                    <StyledDescriptionSegment>{data.amount}</StyledDescriptionSegment>
                    <StyledDescriptionSegment>{data.date}</StyledDescriptionSegment>
                    <StyledDescriptionSegment>{data.business}</StyledDescriptionSegment>
                    <StyledDescriptionSegment>{data.numberId}</StyledDescriptionSegment>
                    <StyledDescriptionSegment>{data.month}</StyledDescriptionSegment>
                    <StyledDescriptionSegment>{data.phone}</StyledDescriptionSegment>
                    <StyledDescriptionSegment>{data.address}</StyledDescriptionSegment>
                    <StyledSchedule isEmpty={emptyCell}>{data.schedule}</StyledSchedule>
                    <StyledDescriptionSegment>{data.user}</StyledDescriptionSegment>
                    <StyledDescriptionSegment>{data.amount}</StyledDescriptionSegment>
                    <StyledDescriptionSegment>{data.date}</StyledDescriptionSegment>
                    <StyledDescriptionSegment>{data.business}</StyledDescriptionSegment>
                    <StyledDescriptionSegment>{data.numberId}</StyledDescriptionSegment>
                    <StyledDescriptionSegment>{data.month}</StyledDescriptionSegment>
                    <StyledDescriptionSegment>{data.phone}</StyledDescriptionSegment>
                    <StyledDescriptionSegment>{data.address}</StyledDescriptionSegment>
                    <StyledSchedule isEmpty={emptyCell}>{data.schedule}</StyledSchedule>
                  </StyledContentData>
                ))}
              </StyledTBody>
            </StyledtTable>
          </StyledWrapperContent>
        </StyledWrapperShadow>

        <StyledButtons>
          <Button variant='secondary' onClick={() => router.back()}>
            {t('BUTTON_CANCEL')}
          </Button>
          {emptyCell ? <Button>{t('BUTTON_UPLOAD')}</Button> : <Button>{t('BUTTON_REMOUNT')}</Button>}
        </StyledButtons>
      </StyledWrapper>
    </>
  );
};

export default Table;
