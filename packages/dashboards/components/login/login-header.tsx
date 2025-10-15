import styled, { keyframes } from 'styled-components';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import ecommerceLogo from '@icons/ecommerce-logo';
import UserIcon from '@icons/user-icon';
import TwoUpArrowsMisc from '@misc/orange-arrows-misc';
import OrangeDashedCircle from '@misc/orange-dashed-circle';
import CircleMisc from '@misc/circle-misc';
import WhiteCircleArrow from '@misc/circle-arrow-misc';
import LanguageSwitcher from '@ui/language-switcher';
import { Theme } from '../../theme/theme';

const floating = keyframes`
  from { transform: translate(0,  0px); }
  65%  { transform: translate(0, 8px); }
  to   { transform: translate(0, -0px); } 
`;
const Misc = styled.div<{ left?: boolean; right?: boolean; floatDuration?: number }>`
  position: absolute;
  pointer-events: none;
  animation: ${floating};
  animation-duration: ${props => props.floatDuration || null}s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  animation-direction: alternate;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
  }
`;

const StyledHeader = styled.div`
  height: 200px;
  padding: 40px 0;
  background: ${({ theme }: { theme: Theme }) => theme.colors.blue};
  svg {
    color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  }
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    padding: 24px 24px 32px;
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

const StyledContentWrapper = styled.div`
  display: flex;
  width: max-content;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 9;

  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    width: 100%;
  }
`;

const StyledTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  z-index: 2;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    margin-top: 24px;
    width: 183px;
    svg {
      width: 24px;
      height: 24px;
    }
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

const StyledLeftOrangeCircleMisc = styled(Misc)`
  position: absolute;
  top: 35px;
  left: -100px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    right: 0px;
    left: 18px;
    top: 4px;
  }
`;

const StyledRightBlueCircleMisc = styled(Misc)`
  position: absolute;
  top: 110px;
  right: -100px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    left: 0x;
    top: 65px;
    right: 0px;
  }
`;

const StyledCircleArrowMisc = styled(Misc)`
  position: absolute;
  right: -200px;
  top: 20px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const StyledOrangeArrowMisc = styled(Misc)`
  position: absolute;
  right: -350px;
  top: 90px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const StyledOrangeDashedCircle = styled(Misc)`
  position: absolute;
  width: 178px;
  height: 178px;
  top: 110px;
  left: -350px;
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

const SyledLanguageSwitcher = styled.div`
  position: absolute;
  top: 40px;
  right: 105px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    top: 24px;
    right: 24px;
  }
`;

const getRandomFloatDuration = () => Math.random() * 4 + 2;

const LoginHeader = () => {
  const { t } = useTranslation('login');
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
          <StyledTitle>{t('SIGN_IN_COLLABORATOR')}</StyledTitle>
          <UserIcon width={32} height={32} />
        </StyledTextWrapper>

        {/* Misc */}
        <StyledOrangeDashedCircle floatDuration={getRandomFloatDuration()}>
          <OrangeDashedCircle />
        </StyledOrangeDashedCircle>

        <StyledLeftOrangeCircleMisc floatDuration={getRandomFloatDuration()}>
          <CircleMisc fill='#fc7e00' />
        </StyledLeftOrangeCircleMisc>

        <StyledRightBlueCircleMisc floatDuration={getRandomFloatDuration()}>
          <CircleMisc width={14} height={14} fill='#72dae8' />
        </StyledRightBlueCircleMisc>

        <StyledCircleArrowMisc floatDuration={getRandomFloatDuration()}>
          <WhiteCircleArrow />
        </StyledCircleArrowMisc>

        <StyledOrangeArrowMisc floatDuration={getRandomFloatDuration()}>
          <TwoUpArrowsMisc />
        </StyledOrangeArrowMisc>
        {/* Misc */}
      </StyledContentWrapper>
    </StyledHeader>
  );
};

export default LoginHeader;
