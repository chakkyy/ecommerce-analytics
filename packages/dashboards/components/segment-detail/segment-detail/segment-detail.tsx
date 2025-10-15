import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import styled from 'styled-components';

// icons
import DownArrow from '@icons/down-arrow';
import UpArrow from '@icons/up-arrow';
import Pagination from '@components/pagination/pagination';
import Table from './table';
import DownloadButton from '../../common/download-csv-button';
import { Theme } from '../../../theme/theme';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StyledTitleWrapper = styled.div`
  display: flex;
  gap: 8px;
  padding-left: 0;
  align-items: center;
`;

const StyledContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 44px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    align-items: flex-start;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 32px;
  }
`;

const StyledTitle = styled.h1`
  color: ${({ theme }: { theme: Theme }) => theme.colors.blue};
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 130%;
  cursor: pointer;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    font-size: 16px;
    line-height: 150%;
  }
`;

const StyledIcon = styled.div`
  cursor: pointer;
  svg {
    color: ${({ theme }: { theme: Theme }) => theme.colors.blue};
  }
`;

const LIMIT = 10;

const SegmentDetailComponent = ({
  segmentId,
  users,
  setPage,
  page,
}: {
  segmentId: number;
  users: any;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { t } = useTranslation('segments');
  const [isExpandable, setIsExpandable] = useState<boolean>(true);

  return (
    <StyledWrapper>
      <StyledContent>
        <StyledTitleWrapper>
          <StyledTitle onClick={() => setIsExpandable(!isExpandable)}>
            {t('SEGMENT_DETAIL.TITLE_SEGMENT_DETAIL')}
          </StyledTitle>
          <StyledIcon onClick={() => setIsExpandable(!isExpandable)}>
            {!isExpandable ? <UpArrow /> : <DownArrow />}
          </StyledIcon>
        </StyledTitleWrapper>
        <DownloadButton segmentId={segmentId} />
      </StyledContent>
      {isExpandable && (
        <>
          <Table segmentId={segmentId} page={page} />
          <Pagination
            currentPage={page}
            siblingCount={2}
            totalCount={users?.count}
            pageSize={LIMIT}
            setPage={setPage}
          />
        </>
      )}
    </StyledWrapper>
  );
};
export default SegmentDetailComponent;
