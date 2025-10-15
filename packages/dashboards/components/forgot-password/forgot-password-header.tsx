import styled from 'styled-components';
import ecommerceLogo from '@icons/ecommerce-logo';

import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import OrangeDashedCircle from '@misc/orange-dashed-circle';
import CircleMisc from '@misc/circle-misc';
import CircleWithArrow from '@misc/circle-arrow-misc';
import LanguageSwitcher from '@ui/language-switcher';
import { Theme } from '../../theme/theme';

const StyledHeader = styled.div`
  height: 170px;
  padding: 40px 0;
  background: ${({ theme }: { theme: Theme }) => theme.colors.blue};
  svg {
    color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  }
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    padding: 24px 24px 32px;
  }
`;
const StyledContentWrapper = styled.div`
  display: flex;
  width: max-content;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  position: relative;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    width: 100%;
  }
`;

const StyledTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  z-index: 2;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    margin-top: 26px;
    padding: 0px;
    text-align: center;
  }
`;

const StyledTitle = styled.h3`
  color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  text-align: center;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    font-weight: 700;
    font-size: 24px;
  }
`;

const StyledLeftOrangeCircleMisc = styled.div`
  position: absolute;
  top: 35px;
  left: -130px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    right: 0px;
    left: 18px;
    top: 4px;
  }
`;

const StyledRightBlueCircleMisc = styled.div`
  position: absolute;
  top: 80px;
  right: -120px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    left: 0x;
    top: 65px;
    right: 0px;
  }
`;

const StyledCircleArrowMisc = styled.div`
  position: absolute;
  right: -220px;
  top: 0px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const StyledOrangeDashedCircle = styled.div`
  position: absolute;
  width: 178px;
  height: 178px;
  top: 80px;
  left: -380px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    left: 36px;
    width: 55px;
    height: 55px;
    svg {
      width: 55px;
      height: 55px;
    }
  }
`;

const StyledNavBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 40px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    margin: 0px;
  }
`;

const SyledLanguageSwitcher = styled.div`
  position: absolute;
  top: 40px;
  right: 105px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    top: 24px;
    right: 24px;
  }
`;

const ResetPasswordHeader = () => {
  const { t } = useTranslation('forgot-password');
  return (
    <StyledHeader>
      <StyledNavBar data-aos='fade-right' data-aos-duration='1000'>
        <Link href='/'>
          <ecommerceLogo />
        </Link>
      </StyledNavBar>
      <SyledLanguageSwitcher>
        <LanguageSwitcher variantColor='white' />
      </SyledLanguageSwitcher>

      <StyledContentWrapper>
        <StyledTextWrapper data-aos='fade-down' data-aos-duration='500'>
          <StyledTitle>{t('RESET_PASS')}</StyledTitle>
        </StyledTextWrapper>
        {/* Misc */}
        <StyledOrangeDashedCircle>
          <OrangeDashedCircle width={91} height={91} />
        </StyledOrangeDashedCircle>

        <StyledLeftOrangeCircleMisc>
          <CircleMisc fill='#fc7e00' />
        </StyledLeftOrangeCircleMisc>

        <StyledRightBlueCircleMisc>
          <CircleMisc width={14} height={14} fill='#72dae8' />
        </StyledRightBlueCircleMisc>

        <StyledCircleArrowMisc>
          <CircleWithArrow width={36} height={36} />
        </StyledCircleArrowMisc>
        {/* Misc */}
      </StyledContentWrapper>
    </StyledHeader>
  );
};

export default ResetPasswordHeader;
