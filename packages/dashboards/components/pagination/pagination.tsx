import { useMemo } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import TextBody from '@ui/text-body';

import BlackLeftArrowIcon from '@icons/black-left-arrow-icon';
import BlackRighttArrowIcon from '@icons/black-right-arrow-icon';
import { Theme } from '../../theme/theme';

const DOTS = '...';
const SIBLING_OFFSET = 3;
const ITEMS_COUNT_OFFSET = 1;

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

const StyledPaginator = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 56px;
  align-items: center;
  user-select: none;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    margin-top: 32px;
  }
`;

const StyledList = styled.ul`
  align-items: center;
  justify-content: center;
  display: flex;
  flex: 1;
  margin-left: 80px;
  flex-wrap: wrap;
  button {
    background: none;
    cursor: pointer;
    &.active {
      font-weight: bold;
    }
  }
  li {
    min-width: 20px;
    margin-left: 2px;
    margin-right: 2px;
    text-align: center;
  }
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    justify-content: flex-end;
  }
`;

const StyledArrowIcon = styled.li`
  cursor: pointer;
  svg {
    margin-top: 6px;
  }
`;

const Pagination = ({
  totalCount,
  pageSize,
  currentPage,
  setPage,
  siblingCount = 1,
}: {
  totalCount: number;
  pageSize: number;
  currentPage: number;
  setPage: (page: number) => void;
  siblingCount: number;
}) => {
  const { t } = useTranslation('segments');
  const totalPageCount = Math.ceil(totalCount / pageSize);

  const paginationRange = useMemo(() => {
    // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
    const totalPageNumbers = siblingCount + SIBLING_OFFSET;

    /*
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

    /*
      We do not want to show dots if there is only one position left 
      after/before the left/right page count as that would lead to a change if our Pagination
      component size which we do not want
    */
    const shouldShowLeftDots = leftSiblingIndex > 1;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 1;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = ITEMS_COUNT_OFFSET + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = ITEMS_COUNT_OFFSET + 2 * siblingCount;
      const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
      return [DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [DOTS, ...middleRange, DOTS];
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return (
    <StyledPaginator>
      <TextBody variant='light'>
        {t('SEGMENT_DETAIL.TOTAL_RECORDS')}: <strong>{totalCount}</strong>
      </TextBody>
      <StyledList>
        {paginationRange && paginationRange.length > 1 && (
          <>
            {currentPage !== 1 && (
              <StyledArrowIcon>
                <BlackLeftArrowIcon
                  onClick={() => {
                    setPage(currentPage - 1);
                  }}
                />
              </StyledArrowIcon>
            )}
            {paginationRange?.map(pageNumber => {
              if (pageNumber === DOTS) {
                return <li>&#8230;</li>;
              }

              return (
                <li>
                  <button
                    className={pageNumber === currentPage ? 'active' : ''}
                    type='button'
                    onClick={() => {
                      setPage(pageNumber as number);
                    }}>
                    {pageNumber}
                  </button>
                </li>
              );
            })}

            {currentPage !== totalPageCount && (
              <StyledArrowIcon>
                <BlackRighttArrowIcon
                  onClick={() => {
                    setPage(currentPage + 1);
                  }}
                />
              </StyledArrowIcon>
            )}
          </>
        )}
      </StyledList>
    </StyledPaginator>
  );
};
export default Pagination;
