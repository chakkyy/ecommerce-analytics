import WrapperShadow from '@ui/wrapper-shadow';
import { useTranslation } from 'next-i18next';
import styled from 'styled-components';
import ItemList from './item-list/item-list';
import { Theme } from '../../../../theme/theme';

const StyledWrapper = styled.div`
  gap: 30px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 344px);
  margin-top: 32px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    gap: 16px;
    margin-top: 16px;
  }
`;

const List = () => {
  const { t } = useTranslation('segments');

  const dataProduct = [
    {
      id: 1,
      title: `${t('SEGMENT_DETAIL.DATA_RECIPE_PRODUCTS.CATEGORY')}`,
      description: `${t('SEGMENT_DETAIL.DATA_RECIPE_PRODUCTS.DESCRIPTION')}`,
    },
    {
      id: 2,
      title: `${t('SEGMENT_DETAIL.DATA_RECIPE_PRODUCTS.CATEGORY_1')}`,
      description: `${t('SEGMENT_DETAIL.DATA_RECIPE_PRODUCTS.DESCRIPTION_1')}`,
    },
    {
      id: 3,
      title: `${t('SEGMENT_DETAIL.DATA_RECIPE_PRODUCTS.CATEGORY_3')}`,
      description: `${t('SEGMENT_DETAIL.DATA_RECIPE_PRODUCTS.DESCRIPTION_3')}`,
    },
    {
      id: 4,
      title: `${t('SEGMENT_DETAIL.DATA_RECIPE_PRODUCTS.CATEGORY_3')}`,
      description: `${t('SEGMENT_DETAIL.DATA_RECIPE_PRODUCTS.DESCRIPTION_3')}`,
    },
    {
      id: 5,
      title: `${t('SEGMENT_DETAIL.DATA_RECIPE_PRODUCTS.CATEGORY_3')}`,
      description: `${t('SEGMENT_DETAIL.DATA_RECIPE_PRODUCTS.DESCRIPTION_3')}`,
    },
    {
      id: 6,
      title: `${t('SEGMENT_DETAIL.DATA_RECIPE_PRODUCTS.CATEGORY_1')}`,
      description: `${t('SEGMENT_DETAIL.DATA_RECIPE_PRODUCTS.DESCRIPTION_1')}`,
    },
    {
      id: 7,
      title: `${t('SEGMENT_DETAIL.DATA_RECIPE_PRODUCTS.CATEGORY_1')}`,
      description: `${t('SEGMENT_DETAIL.DATA_RECIPE_PRODUCTS.DESCRIPTION_1')}`,
    },
    {
      id: 8,
      title: `${t('SEGMENT_DETAIL.DATA_RECIPE_PRODUCTS.CATEGORY_1')}`,
      description: `${t('SEGMENT_DETAIL.DATA_RECIPE_PRODUCTS.DESCRIPTION_1')}`,
    },
    {
      id: 9,
      title: `${t('SEGMENT_DETAIL.DATA_RECIPE_PRODUCTS.CATEGORY_1')}`,
      description: `${t('SEGMENT_DETAIL.DATA_RECIPE_PRODUCTS.DESCRIPTION_1')}`,
    },
    {
      id: 10,
      title: `${t('SEGMENT_DETAIL.DATA_RECIPE_PRODUCTS.CATEGORY_1')}`,
      description: `${t('SEGMENT_DETAIL.DATA_RECIPE_PRODUCTS.DESCRIPTION_1')}`,
    },
  ];

  return (
    <WrapperShadow defaultActive>
      <StyledWrapper>
        {dataProduct.map(data => (
          <ItemList key={data.id} title={data.title} description={data.description} />
        ))}
      </StyledWrapper>
    </WrapperShadow>
  );
};
export default List;
