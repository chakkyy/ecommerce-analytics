import styled from 'styled-components';
import { useTranslation } from 'next-i18next';
import Button from '@ui/button';
import Tag from '@ui/tag';
import { Theme } from '../../theme/theme';

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
`;

const StyledTitleGroup = styled(StyledTitle)`
  text-align: center;
`;
const StyledName = styled.td`
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;
  color: ${({ theme }: { theme: Theme }) => theme.colors.black};
  gap: 8px;
  display: flex;
  align-items: center;
  padding: 32px 0;
`;

const StyledDescription = styled.td`
  color: ${({ theme }: { theme: Theme }) => theme.colors.black};
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  padding: 32px 0;
  max-width: 464px;
`;

const StyledTag = styled.td`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 32px 0;
`;

const StyledButton = styled.td`
  text-align: -webkit-right;
  padding: 32px 0;
`;

const Recipes = () => {
  const { t } = useTranslation('recipes');

  const dataRecipe = [
    {
      id: 1,
      label: `${t('NAME_RECIPE')} 1`,
      description: `${t('DESCRIPTION_RECIPES')}`,
      tag: <Tag label={t('TAG_PRODUCTS')} variant='blue' />,
      button: (
        <Button small variant='secondary'>
          {t('BUTTON_ADD')}
        </Button>
      ),
    },
    {
      id: 2,
      label: `${t('NAME_RECIPE')} 2`,
      description: `${t('DESCRIPTION_RECIPES')}`,
      tag: <Tag label={t('TAG_SALES')} variant='blue' />,
      button: (
        <Button small variant='secondary'>
          {t('BUTTON_ADD')}
        </Button>
      ),
    },
    {
      id: 3,
      label: `${t('NAME_RECIPE')} 3`,
      description: `${t('DESCRIPTION_RECIPES')}`,
      tag: <Tag label={t('TAG_CUSTOMER')} variant='blue' />,
      button: (
        <Button small variant='secondary'>
          {t('BUTTON_ADD')}
        </Button>
      ),
    },
    {
      id: 4,
      label: `${t('NAME_RECIPE')} 4`,
      description: `${t('DESCRIPTION_RECIPES')}`,
      tag: <Tag label={t('TAG_CATEGORIES')} variant='blue' />,
      button: (
        <Button small variant='secondary'>
          {t('BUTTON_ADD')}
        </Button>
      ),
    },
    {
      id: 5,
      label: `${t('NAME_RECIPE')} 5`,
      description: `${t('DESCRIPTION_RECIPES')}`,
      tag: <Tag label={t('TAG_CUSTOMER')} variant='blue' />,
      button: (
        <Button small variant='secondary'>
          {t('BUTTON_ADD')}
        </Button>
      ),
    },
  ];

  return (
    <StyledtTable>
      <StyledTHead>
        <StyledContent>
          <StyledTitle>{t('NAME')}</StyledTitle>
          <StyledTitle>{t('DESCRIPTION')}</StyledTitle>
          <StyledTitleGroup>{t('GROUP')}</StyledTitleGroup>
          <StyledTitle>&nbsp;</StyledTitle>
        </StyledContent>
      </StyledTHead>
      <StyledTBody>
        {dataRecipe.map(data => (
          <StyledContentData key={data.id}>
            <StyledName>{data.label}</StyledName>
            <StyledDescription>{data.description}</StyledDescription>
            <StyledTag>{data.tag}</StyledTag>
            <StyledButton>{data.button}</StyledButton>
          </StyledContentData>
        ))}
      </StyledTBody>
    </StyledtTable>
  );
};

export default Recipes;
