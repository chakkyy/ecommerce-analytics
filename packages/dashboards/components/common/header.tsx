import styled from 'styled-components';
import { useLayout } from '@hooks/useContext';
import ecommerceSymbol from '@icons/ecommerce-symbol';
import { Theme } from '../../theme/theme';
import LanguageSwitcher from './language-switcher';

const StyledContainer = styled.header<{ isSidebarOpen: boolean }>`
  display: flex;
  width: 100%;
  flex-direction: row-reverse;
  align-items: center;
  background: ${({ theme }: { theme: Theme }) => theme.colors.almostWhite};
  padding: 10px 100px;
  border-radius: 0px 0px 16px 16px;

  /* This below is for settings icon */
  color: ${({ theme }: { theme: Theme }) => theme.colors.blue};

  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    padding: 10px 24px;
    justify-content: flex-end;
    flex-direction: row;
    position: ${p => p.isSidebarOpen && 'fixed'};
    z-index: ${p => p.isSidebarOpen && 4};
    min-height: 54px;
  }
`;

const StyledSeparatorWrapper = styled.div`
  padding: 0 32px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const StyledSettingsWrapper = styled.div`
  display: flex;
  gap: 32px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const StyledecommerceSymbol = styled.div`
  width: 34px;
  height: 34px;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  background: ${({ theme }: { theme: Theme }) => theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    width: 19px;
    height: 21px;
  }
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    svg {
      width: 17px;
      height: 20px;
    }
  }
`;

const VerticalSeparator = () => {
  return (
    <svg width='2' height='30' viewBox='0 0 2 30' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M1 0.5L1 29.5' stroke='#DDDDDD' />
    </svg>
  );
};

const Header = () => {
  const { isSidebarOpen } = useLayout();

  return (
    <StyledContainer isSidebarOpen={isSidebarOpen}>
      {/* profile pic */}
      <StyledecommerceSymbol>
        <ecommerceSymbol />
      </StyledecommerceSymbol>

      <StyledSeparatorWrapper>
        <VerticalSeparator />
      </StyledSeparatorWrapper>
      <StyledSettingsWrapper>
        <LanguageSwitcher variantColor='black' />
      </StyledSettingsWrapper>
    </StyledContainer>
  );
};

export default Header;
