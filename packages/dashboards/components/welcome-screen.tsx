import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import styled, { keyframes, useTheme } from 'styled-components';
import TextBody from '@ui/text-body';
import LanguageSwitcher from '@ui/language-switcher';
import ecommerceLogo from '@icons/ecommerce-logo';
import CompanyIcon from '@icons/company-icon';
import UserIcon from '@icons/user-icon';
import Button from '@ui/button';
import {
  CircleWithArrow,
  CircleMisc,
  BlueTrianglesMisc,
  OrangeDotsMisc,
  BlueDropsMisc,
  CircleTriangleMisc,
  BlueDropMisc,
} from '@misc/index';
import TwoUpArrowsMisc from '@misc/orange-arrows-misc';
import { Theme } from '../theme/theme';

const slideRight = keyframes`
  from{
    transform: translateX(-100px);
  }
  to{
    transform: translateX(0px);
  }
`;

const slideLeft = keyframes`
  from{
    transform: translateX(100px);
  }
  to{
    transform: translateX(0px);
  }
`;

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
`;

const StyledOrangeCircleArrowMisc = styled(Misc)`
  position: absolute;
  top: 320px;
  left: 150px;
`;
const StyledLeftBlueCircleMisc = styled(Misc)`
  position: absolute;
  bottom: 60px;
  left: 120px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    left: 30px;
  }
`;

const StyledBlueTrianglesMisc = styled(Misc)`
  position: absolute;
  top: 600px;
  left: 600px;

  @media (max-height: 800px) {
    top: 400px;
  }

  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    left: 300px;
  }
`;
const StyledOrangeDotsMisc = styled(Misc)`
  bottom: 0;
  left: 490px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    left: 200px;
    top: 4932x;
  }
`;
const StyledRightOrangeCircleMisc = styled(Misc)`
  right: 420px;
  bottom: 200px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    top: 300px;
    right: 100px;
  }
`;
const StyledBlueDropsMisc = styled(Misc)`
  bottom: 70px;
  right: 0;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;
const StyledCircleTriangleMisc = styled(Misc)`
  top: 170px;
  right: 500px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    top: 70px;
    right: 0;
    left: 290px;
  }
`;

const StyledNotHoverMisc = styled.div<{ isHoverActive: boolean }>`
  display: ${props => (props.isHoverActive ? 'none' : 'block')};
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
  }
  &:hover {
    @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
      display: block;
    }
  }
`;

const StyledHoverMisc = styled.div<{ isHoverActive: boolean }>`
  display: ${props => (props.isHoverActive ? 'block' : 'none')};
`;

const StyledWhiteCircleArrowMisc = styled(Misc)`
  top: 130px;
  left: ${props => (props.left ? '550px' : 'unset')};
  right: ${props => (props.right ? '300px' : 'unset')};
`;

const StyledOrangeCircleMisc = styled(Misc)`
  top: 180px;
  left: ${props => (props.left ? '620px' : 'unset')};
  right: ${props => (props.right ? '370px' : 'unset')};
`;

const StyledBlueCircleMisc = styled(Misc)`
  top: 600px;
  left: ${props => (props.left ? '720px' : 'unset')};
  right: ${props => (props.right ? '730px' : 'unset')};
`;

const StyledBlueDropMisc = styled(Misc)`
  bottom: 0;
  left: ${props => (props.left ? '0' : 'unset')};
  transform: ${props => (props.right ? 'scaleX(-1)' : 'unset')} !important;
  right: ${props => (props.right ? '0' : 'unset')};
`;

const StyledTwoUpArrowsMisc = styled(Misc)`
  bottom: 30px;
  left: ${props => (props.left ? '800px' : 'unset')};
  right: ${props => (props.right ? '800px' : 'unset')};
`;

const StyledNavBar = styled.div`
  background: transparent;
  position: absolute;
  width: 100%;
  height: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 45px;
  padding: 0px 100px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    padding: 0px 24px;
  }
`;

const StyledContentWrapper = styled.div<{ hoverAlign: string }>`
  max-width: 304px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 27px;
  margin: 0 auto;

  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    gap: 24px;
    margin: 0px;
    margin: 0px;

    svg {
      width: 48px;
      height: 48px;
    }
  }
`;

const StyledTitle = styled.h3`
  text-align: center;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    font-size: 24px;
    font-weight: 700;
    line-height: 135%;
    z-index: 99;
  }
`;

const StyledCTAWrapper = styled.div`
  display: none;
  flex-direction: column;
  gap: 32px;
  color: white;
`;

const StyledCTAText = styled(TextBody)`
  margin-top: 8px;
  width: 480px;
`;

const StyledLeftSide = styled.div`
  height: 100vh;
  width: 50%;
  background: ${({ theme }: { theme: Theme }) => theme.colors.almostWhite};
  transition: all 0.5s ease;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    width: 100%;
    height: 50vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
  }
  &:hover {
    width: 75%;
    background: ${({ theme }: { theme: Theme }) => theme.colors.blue};
    @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
      height: 70vh;
      width: 100%;
      padding: 0 24px;
    }
    ${StyledContentWrapper} {
      max-width: 609px;
      gap: 24px;
      align-items: flex-start;

      @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
        max-width: 327px;
        align-items: center;
        padding: 0px;
        z-index: 99;
      
      }
      svg {
        color: ${({ theme }: { theme: Theme }) => theme.colors.almostWhite};
      }
    }

    ${StyledTitle} {
      color: ${({ theme }: { theme: Theme }) => theme.colors.almostWhite};
      font-size: 80px;
      line-height: 100%;
      text-align: left;
      @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
        font-size: 40px;
        font-weight: 700;
        line-height: 120%;
        text-align: center;
      }
    }

    ${StyledCTAWrapper} {
      display: flex;
      animation: ${slideRight} 0.5s ease-out;
      @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
        align-items: center;
        gap: 24px;
        button {
          width: 100%;
        }
      }
    }
    ${StyledCTAText} {
      @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
        width: 100%;
        text-align: center;
      }
    }
  }
`;

const StyledRightSide = styled.div`
  height: 100vh;
  width: 50%;
  transition: all 0.5s ease;
  background: ${({ theme }: { theme: Theme }) => theme.colors.almostWhite};
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
    height: 50vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
  }
  &:hover {
    width: 75%;
    background: ${({ theme }: { theme: Theme }) => theme.colors.blue};
    @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
      height: 70vh;
      width: 100%;
      padding: 0 24px;
    }
    ${StyledContentWrapper} {
      max-width: 609px;
      gap: 24px;
      align-items: flex-end;
      @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
        max-width: 327px;
        align-items: center;
        padding: 0px;
        z-index: 99;
      }
      svg {
        color: ${({ theme }: { theme: Theme }) => theme.colors.almostWhite};
      }
    }

    ${StyledTitle} {
      color: ${({ theme }: { theme: Theme }) => theme.colors.almostWhite};
      font-size: 80px;
      line-height: 100%;
      text-align: right;
      @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
        font-size: 40px;
        font-weight: 700;
        line-height: 120%;
        text-align: center;
      }
    }

    ${StyledCTAWrapper} {
      display: flex;
      align-items: flex-end;
      animation: ${slideLeft} 0.5s ease-out;
      @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
        align-items: center;
        gap: 24px;
        button {
          width: 100%;
        }
      }
    }

    ${StyledCTAText} {
      text-align: right;
      @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
        width: 100%;
        text-align: center;
      }
    }
  }
`;

const WelcomeScreen = () => {
  const signUpRef = useRef<null | HTMLDivElement>(null);
  const signInRef = useRef<null | HTMLDivElement>(null);
  const { t } = useTranslation('index');
  // @TODO type theme
  const theme = useTheme() as Theme;
  const [hover, setHover] = useState<{ left: boolean; right: boolean }>({ left: false, right: false });

  const router = useRouter();
  const handleRedirect = (path: string) => () => {
    router.push(path);
  };

  const getRandomFloatDuration = () => Math.random() * 4 + 2;

  return (
    <>
      <StyledNavBar>
        <ecommerceLogo fill={hover.left ? theme.colors.almostWhite : theme.colors.blue} />
        <LanguageSwitcher variantColor={hover.right ? 'white' : 'black'} />
      </StyledNavBar>
      <StyledLeftSide
        ref={signUpRef}
        onClick={() => signUpRef.current?.scrollIntoView({ behavior: 'smooth' })}
        onMouseEnter={() => setHover({ left: true, right: false })}
        onMouseLeave={() => setHover({ left: false, right: false })}
        onTouchEnd={() => signUpRef.current?.scrollIntoView({ behavior: 'smooth' })}>
        <StyledContentWrapper hoverAlign='flex-start'>
          <CompanyIcon width={64} height={64} />
          <StyledTitle>{t('COMPANY_SIGNUP')}</StyledTitle>
          <StyledCTAWrapper>
            <StyledCTAText variant='light'>{t('COMPANY_DESC')}</StyledCTAText>
            <Button dark onClick={handleRedirect('/signup')}>
              {t('SIGN_UP')}
            </Button>
          </StyledCTAWrapper>
        </StyledContentWrapper>
      </StyledLeftSide>
      <StyledRightSide
        ref={signInRef}
        onClick={() => signInRef.current?.scrollIntoView({ behavior: 'smooth' })}
        onMouseEnter={() => setHover({ left: false, right: true })}
        onMouseLeave={() => setHover({ left: false, right: false })}
        onTouchEnd={() => signInRef.current?.scrollIntoView({ behavior: 'smooth' })}>
        <StyledContentWrapper hoverAlign='flex-end'>
          <UserIcon width={64} height={64} />
          <StyledTitle>{t('SIGN_IN_COLLABORATOR')}</StyledTitle>
          <StyledCTAWrapper>
            <StyledCTAText variant='light'>{t('COLLABORATOR_DESC')}</StyledCTAText>
            <Button dark onClick={handleRedirect('/login')}>
              {t('SIGN_IN')}
            </Button>
          </StyledCTAWrapper>
        </StyledContentWrapper>
      </StyledRightSide>

      {/* misc when hover not active */}
      {/* left */}
      <StyledNotHoverMisc isHoverActive={hover.left || hover.right}>
        <StyledOrangeCircleArrowMisc floatDuration={getRandomFloatDuration()}>
          <CircleWithArrow fill='#FC7E00' width={40} height={40} />
        </StyledOrangeCircleArrowMisc>
        <StyledLeftBlueCircleMisc floatDuration={getRandomFloatDuration()}>
          <CircleMisc width={14} height={14} fill='#004DBC' />
        </StyledLeftBlueCircleMisc>
        <StyledBlueTrianglesMisc floatDuration={getRandomFloatDuration()}>
          <BlueTrianglesMisc />
        </StyledBlueTrianglesMisc>
        <StyledOrangeDotsMisc floatDuration={getRandomFloatDuration()}>
          <OrangeDotsMisc />
        </StyledOrangeDotsMisc>
        {/* right */}
        <StyledRightOrangeCircleMisc floatDuration={getRandomFloatDuration()}>
          <CircleMisc width={19} height={19} fill='#FC7E00' />
        </StyledRightOrangeCircleMisc>
        <StyledBlueDropsMisc floatDuration={getRandomFloatDuration()}>
          <BlueDropsMisc />
        </StyledBlueDropsMisc>
        <StyledCircleTriangleMisc floatDuration={getRandomFloatDuration()}>
          <CircleTriangleMisc />
        </StyledCircleTriangleMisc>
      </StyledNotHoverMisc>
      {/* misc when hover not active */}

      {/* misc when hover active */}
      <StyledHoverMisc isHoverActive={hover.left || hover.right}>
        <StyledWhiteCircleArrowMisc left={hover.left} right={hover.right} floatDuration={getRandomFloatDuration()}>
          <CircleWithArrow fill='#CCDBF2' width={48} height={48} />
        </StyledWhiteCircleArrowMisc>
        <StyledOrangeCircleMisc left={hover.left} right={hover.right} floatDuration={getRandomFloatDuration()}>
          <CircleMisc width={18} height={18} fill='#FC7E00' />
        </StyledOrangeCircleMisc>
        <StyledBlueCircleMisc left={hover.left} right={hover.right} floatDuration={getRandomFloatDuration()}>
          <CircleMisc width={14} height={14} fill='#72DAE8' />
        </StyledBlueCircleMisc>
        <StyledBlueDropMisc left={hover.left} right={hover.right} floatDuration={getRandomFloatDuration()}>
          <BlueDropMisc />
        </StyledBlueDropMisc>
        <StyledTwoUpArrowsMisc left={hover.left} right={hover.right} floatDuration={getRandomFloatDuration()}>
          <TwoUpArrowsMisc fill='#CCDBF2' />
        </StyledTwoUpArrowsMisc>
      </StyledHoverMisc>
      {/* misc when hover active */}
    </>
  );
};

export default WelcomeScreen;
