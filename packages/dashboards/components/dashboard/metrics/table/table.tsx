import TextBody from '@ui/text-body';
import { useTranslation } from 'next-i18next';
import { useEffect, useMemo, useState } from 'react';
import { Column, useTable } from 'react-table';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import InfiniteScroll from 'react-infinite-scroll-component';
import { RowData } from '@interfaces/index';
import LoaderIcon from '@icons/loader-icon';
import Numeral from 'numeral';
import InfoTooltip from '../infoTooltip';
import {
  StyledHeaderWrapper,
  StyledStatusWrapper,
  StyledTBody,
  StyledTHead,
  StyledTable,
  StyledTableWrapper,
  StyledTd,
  StyledThText,
  StyledTr,
  StyledWrapper,
  StyledLoaderIcon,
  StyledNoData,
  StyledTextBody,
} from './styles';
import api from '../../../../lib/axios';

type TableProps = {
  title: string;
  textTooltip: string;
  data: RowData[];
  startDate: Date;
  endDate: Date;
};

type Order = {
  id: number;
  orderId: string;
  createdAt: string;
  total: string;
  status: string;
  cost: string;
  ecommerceConnectId: number;
  vendorId: string | null;
  userId: string;
  updatedAt: string;
  deletedAt: string | null;
};

const parseOrders = (ordersResponse: Order[]): RowData[] => {
  return ordersResponse.map(orderResponse => {
    return {
      id: orderResponse.orderId,
      date: orderResponse.createdAt,
      price: orderResponse.total,
      status: orderResponse.status,
    };
  });
};

const PAGESIZE = 5;

const TableMetric = ({ title, textTooltip, startDate, endDate }: TableProps) => {
  const { t } = useTranslation('dashboards');
  const [items, setItems] = useState<RowData[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const router = useRouter();

  const columns: Array<Column<RowData>> = useMemo(
    () => [
      {
        Header: 'ID',
        accessor: 'id', // accessor is the "key" in the data
      },
      {
        Header: String(t('METRICS.TABLE.DATE')),
        accessor: 'date',
      },
      {
        Header: String(t('METRICS.TABLE.PRICE')),
        accessor: 'price',
      },
      {
        Header: String(t('METRICS.TABLE.STATUS')),
        accessor: 'status',
      },
    ],
    [t]
  );

  const showMoreOrders = async () => {
    if (hasMore) {
      const newPage = page + 1;
      const { data } = await api.get(`companies${router.asPath}/orders`, {
        params: { page: newPage, pageSize: PAGESIZE, startDate, endDate },
      });
      if (data.length > 0) {
        // Parse orders response
        const ordersData = parseOrders(data);
        // Arrange new items
        const newItems = items.concat(ordersData);
        const newOrders = newItems.filter((obj: RowData, index: number) => {
          return index === newItems.findIndex((o: RowData) => obj.id === o.id);
        });
        setItems(newOrders);
        setPage(newPage);
      } else {
        setHasMore(false);
      }
    }
  };

  useEffect(() => {
    (async () => {
      const { data } = await api.get(`companies${router.asPath}/orders`, {
        params: { page: 1, pageSize: PAGESIZE, startDate, endDate },
      });
      if (data.length > 0) {
        // Parse orders response
        const ordersData = parseOrders(data);
        setItems(ordersData);
        setHasMore(true);
      } else {
        setItems([]);
        setHasMore(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate]);

  const memoOrders: Array<RowData> = useMemo(() => items, [items]);
  const tableInstance = useTable({ columns, data: memoOrders });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

  return (
    <StyledWrapper>
      <StyledHeaderWrapper>
        <StyledTextBody variant='small'>
          {title} <InfoTooltip text={textTooltip} />
        </StyledTextBody>
      </StyledHeaderWrapper>
      <StyledTableWrapper id='ordersTableWrapper'>
        <InfiniteScroll
          dataLength={rows.length}
          next={showMoreOrders}
          hasMore={hasMore}
          loader={
            <StyledLoaderIcon>
              <LoaderIcon />
            </StyledLoaderIcon>
          }
          style={{ overflow: 'hidden' }}
          scrollableTarget='ordersTableWrapper'>
          <StyledTable {...getTableProps()}>
            <StyledTHead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>
                      <StyledThText>{column.render('Header')}</StyledThText>
                    </th>
                  ))}
                </tr>
              ))}
            </StyledTHead>
            <StyledTBody {...getTableBodyProps()}>
              {rows.map(row => {
                prepareRow(row);
                return (
                  <StyledTr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      if (cell.column.id === 'status') {
                        return (
                          <StyledTd {...cell.getCellProps()}>
                            <StyledStatusWrapper variant={cell.value}>
                              {t(`METRICS.TABLE.STATUSES.${cell.value.toUpperCase() as string}`)}
                            </StyledStatusWrapper>
                          </StyledTd>
                        );
                      }
                      if (cell.column.id === 'date') {
                        return (
                          <StyledTd {...cell.getCellProps()}>
                            <TextBody variant='light'>{format(new Date(cell.value as string), 'MMM do, yy')}</TextBody>
                          </StyledTd>
                        );
                      }
                      if (cell.column.id === 'price') {
                        return (
                          <StyledTd {...cell.getCellProps()}>
                            <TextBody variant='light'>${Numeral(cell.value).format('0.00a')}</TextBody>
                          </StyledTd>
                        );
                      }
                      return (
                        <StyledTd {...cell.getCellProps()}>
                          <TextBody variant='light'>{cell.render('Cell')}</TextBody>
                        </StyledTd>
                      );
                    })}
                  </StyledTr>
                );
              })}
            </StyledTBody>
          </StyledTable>
          {rows.length === 0 && <StyledNoData>{t('common:NO_DATA_AVAILABLE')}</StyledNoData>}
        </InfiniteScroll>
      </StyledTableWrapper>
    </StyledWrapper>
  );
};

export default TableMetric;
