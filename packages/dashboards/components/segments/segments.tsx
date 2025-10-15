import { useMemo } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import useGetSegments from '@hooks/api/segments/useGetSegments';
import RightChevron from '@icons/right-chevron';
import { getTranslationFromLabel } from '@utils/formatMetricWithSymbol';
import { Theme } from '../../theme/theme';

const StyledtTable = styled.table`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    gap: 16px;
  }
`;

const StyledContent = styled.tr`
  display: flex;
  gap: 30px;
  padding: 24px;
  @media (min-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.xl}) {
    gap: 210px;
  }

  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const StyledContentMobile = styled.tr`
  @media (min-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const StyledContentData = styled.tr`
  display: flex;
  gap: 30px;
  padding: 24px;
  transition: all 0.3s ease-in-out;
  border-radius: 8px;
  cursor: pointer;
  align-items: center;
  &:hover {
    background-color: ${({ theme }: { theme: Theme }) => theme.colors.lightBlue};
  }
  @media (min-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.xl}) {
    gap: 210px;
  }
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0px;
    padding: 0px;

    &:hover {
      background-color: transparent;
    }
  }
`;

const StyledTitle = styled.th`
  width: 85px;
  text-align: left;
  font-family: 'Roboto', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: ${({ theme }: { theme: Theme }) => theme.colors.grey};
`;

const StyledTitleName = styled(StyledTitle)`
  min-width: 230px;
`;

const StyledNameSegment = styled.td`
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 150%;
  color: ${({ theme }: { theme: Theme }) => theme.colors.black};
  gap: 8px;
  display: flex;
  align-items: center;
  min-width: 230px;
`;

const StyledDescriptionSegment = styled.td`
  font-family: 'Roboto', sans-serif;
  font-weight: 300;
  font-size: 16px;
  line-height: 150%;
  color: ${({ theme }: { theme: Theme }) => theme.colors.black};
  width: 644px;

  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    width: auto;
    display: flex;
    align-items: center;
  }
`;
const StyledIcon = styled.td`
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;
const StyledIconMobile = styled.td`
  @media (min-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

const Segments = () => {
  const { t, i18n } = useTranslation(['common', 'segments']);
  const segments = useGetSegments();
  const language = useMemo(() => i18n?.language || 'en', [i18n?.language]);

  return (
    <StyledtTable>
      <thead>
        <StyledContent>
          <StyledTitleName>{t('NAME')}</StyledTitleName>
          <StyledTitle>{t('DESCRIPTION')}</StyledTitle>
          <StyledTitle>&nbsp;</StyledTitle>
        </StyledContent>

        <StyledContentMobile>
          <StyledTitleName>
            {t('NAME')} y {t('DESCRIPTION')}
          </StyledTitleName>
        </StyledContentMobile>
      </thead>
      <tbody>
        {segments.data?.map((data: { name: string; description: string; id: number }) => (
          <Link key={data.id} href={`/segments/${data.id}`}>
            <StyledContentData>
              <StyledNameSegment>{getTranslationFromLabel(data.name, language)}</StyledNameSegment>
              <StyledDescriptionSegment>
                {getTranslationFromLabel(data.description, language)}
                <StyledIconMobile>
                  <RightChevron />
                </StyledIconMobile>
              </StyledDescriptionSegment>
              <StyledIcon>
                <RightChevron />
              </StyledIcon>
            </StyledContentData>
          </Link>
        ))}
      </tbody>
    </StyledtTable>
  );
};

export default Segments;
