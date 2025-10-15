import { useState } from 'react';
import { useLayout } from '@hooks/useContext';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import useLogoutUser from '@hooks/api/auth/useLogoutUser';
import useWindowResize from '@hooks/useWindowResize';
// Icons
import DashboardIcon from '@icons/dashboard-icon';
import LockIcon from '@icons/lock-icon';
import LogoutIcon from '@icons/logout-icon';
import PlaneIcon from '@icons/plane-icon';
import RecipeIcon from '@icons/recipe-icon';
import SegmentIcon from '@icons/segment-icon';
import DownArrow from '@icons/down-arrow';
import LeftChevron from '@icons/left-chevron';
import RightChevron from '@icons/right-chevron';
import SettingsIcon from '@icons/settings-icon';
import MenuIcon from '@icons/menu-icon';
import CloseIcon from '@icons/close-blue-icon';

// UI
import TextBody from '@ui/text-body';
import ecommerceLogo from '@icons/ecommerce-logo';
import UpArrow from '@icons/up-arrow';
import StoreIcon from '@icons/store-icon';
import { useTranslation } from 'next-i18next';
import LanguageSwitcher from './language-switcher';
import { Theme } from '../../theme/theme';

const StyledContainer = styled.aside<{ sideBarExtended: boolean }>`
  position: fixed;
  height: 100%;
  width: ${props => (props.sideBarExtended ? '256px' : '120px')};
  padding: ${props => (props.sideBarExtended ? '40px 32px' : '40px 24px;')};
  transition: all 0.3s ease-in-out;
  left: 0px;
  top: 0px;
  bottom: 0;
  display: grid;
  grid-template-rows: 33px 49px 1fr 49px 50px;
  justify-items: center;
  background: #ffffff;
  box-shadow: 0px 16px 40px rgba(17, 24, 39, 0.1);
  border-radius: 0px 24px 0px 0px;
  position: fixed;
  overflow-y: scroll;
  overflow-x: hidden;

  &::-webkit-scrollbar {
    width: 0;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  & + * {
    padding-left: ${props => (props.sideBarExtended ? '312px' : '174px')};
  }
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    position: ${props => props.sideBarExtended && 'fixed'};
    width: ${props => (props.sideBarExtended ? '100%' : '120px')};
    display: ${props => (props.sideBarExtended ? 'grid' : 'none')};
    margin-top: 54px;
    height: calc(100% - 54px);
    grid-template-rows:  max-content;
    z-index: 99;
  & + * {
   padding: 24px};
  }
  }
`;

const StyledMenuMobile = styled.div<{ isSidebarOpen: boolean }>`
  position: ${p => (p.isSidebarOpen ? 'fixed' : 'absolute')};
  z-index: ${p => p.isSidebarOpen && 4};
  left: 24px;
  top: 10px;
  cursor: pointer;
  @media (min-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const StyledHeaderContainer = styled.div<{ sideBarExtended: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${props => (props.sideBarExtended ? 'space-between' : 'center')};
  width: 100%;
  height: max-content;
  svg {
    cursor: pointer;
    color: ${({ theme }: { theme: Theme }) => theme.colors.blue};
  }
`;

const StyledArrowCollapse = styled.button`
  background: none;
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const StyledSectionsContainer = styled.ul<{ sideBarExtended?: boolean }>`
  width: 100%;
  padding: 48px 0 0;
  display: flex;
  flex-direction: column;
  align-items: ${props => (props.sideBarExtended ? 'flex-start' : 'center')};
  gap: 50px;
  color: ${({ theme }: { theme: Theme }) => theme.colors.blue};

  svg {
    cursor: pointer;
  }

  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    gap: 48px;
  }
`;

const StyledItemText = styled(TextBody)<{ active: boolean }>`
  color: ${({ theme }: { theme: Theme }) => theme.colors.black};
  min-width: max-content;
  font-weight: ${props => (props.active ? 700 : 300)};
`;

const StyledItem = styled.li<{ active?: boolean }>`
  display: flex;
  position: relative;
  flex-wrap: nowrap;
  max-height: 24px;
  gap: 8px;
  cursor: pointer;
  color: ${({ theme, active }: { active?: boolean; theme: Theme }) =>
    active ? theme.colors.orange : theme.colors.blue};

  svg {
    min-width: 24px;
    min-height: 24px;
  }

  &:hover {
    ${StyledItemText} {
      color: ${(props: { active?: boolean; theme: Theme }) => !props.active && props.theme.colors.blue};
    }
  }
`;

const StyledFooterContainer = styled.div<{ sideBarExtended?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: ${props => (props.sideBarExtended ? 'flex-start' : 'center')};
  gap: 50px;
  padding: 48px 0 0;
  width: 100%;
  svg {
    cursor: pointer;
  }
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    padding: 0px;
  }
`;

const StyledSeparator = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }: { theme: Theme }) => theme.colors.cloudBlue};
  margin-top: 48px;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

const StyledLanguageSwitcher = styled.div`
  display: flex;
  @media (min-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;
const StyledSeparatorMobile = styled(StyledSeparator)`
  display: none;
  @media (max-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
    display: flex;
  }
`;

type SidebarItem = {
  text: string;
  path?: string;
  pathName?: string;
  childs?: SidebarItem[];
  icon?: React.ReactNode;
  gapChilds?: boolean;
};

const items: SidebarItem[] = [
  {
    text: 'SIDEBAR.DASHBOARDS',
    path: '/dashboards',
    icon: <DashboardIcon />,
    childs: [
      {
        text: 'All Dashboards',
        path: '/dashboards',
        icon: <DashboardIcon />,
      },
    ],
  },
  {
    text: 'SIDEBAR.SEGMENTS',
    path: '/segments',
    icon: <SegmentIcon />,
  },
];

if (process.env.NEXT_PUBLIC_FEATURE_FLAG_SETTINGS === 'true') {
  items.push(
    { text: 'SIDEBAR.RECIPES', path: '/recipes', icon: <RecipeIcon /> },
    {
      text: 'SIDEBAR.SETTINGS',
      path: '/personal_data',
      icon: <SettingsIcon />,
      childs: [
        {
          text: 'SIDEBAR.PERSONAL_DATA',
          path: '/personal_data',
          gapChilds: true,
        },
        {
          text: 'SIDEBAR.COMPANY_DATA',
          path: '/company_data',
          gapChilds: true,
        },
        {
          text: 'SIDEBAR.STORE_TYPE',
          path: '/personal_data',
          gapChilds: true,
        },
        {
          text: 'SIDEBAR.INVITE_USERS',
          path: '/select_dashboard',
          gapChilds: true,
        },
      ],
    }
  );
}
if (process.env.NEXT_PUBLIC_FEATURE_FLAG_STORE === 'true') {
  items.push({ text: 'SIDEBAR.STORE', path: '/store', icon: <StoreIcon /> });
}

if (process.env.NEXT_PUBLIC_FEATURE_FLAG_RECIPES === 'true') {
  items.push({ text: 'SIDEBAR.RECIPES', path: '/recipes', icon: <RecipeIcon /> });
}

if (process.env.NEXT_PUBLIC_FEATURE_FLAG_MARKETING_ACTIONS === 'true') {
  items.push({
    text: 'SIDEBAR.MARKETING_ACTIONS',
    path: '/marketing-actions',
    icon: <PlaneIcon />,
  });
}

if (process.env.NEXT_PUBLIC_FEATURE_FLAG_ROLES_AND_PERMISSIONS === 'true') {
  items.push({
    text: 'SIDEBAR.ROLES_AND_PERMISSIONS',
    path: '/roles-and-permissions',
    icon: <LockIcon />,
    childs: [
      {
        text: 'SIDEBAR.ROLES',
        path: '/roles',
        icon: <LockIcon />,
      },
      {
        text: 'SIDEBAR.PERMISSIONS',
        path: '/permissions',
        icon: <LockIcon />,
      },
    ],
  });
}

const ItemWithChild = ({ item, sideBarExtended }: { item: SidebarItem; sideBarExtended: boolean }) => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const { t } = useTranslation('dashboards');
  const { isSidebarOpen, setIsSidebarOpen } = useLayout();

  const { isSmScreen } = useWindowResize();

  const handleClick = () => {
    if (isSmScreen) {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  const handleItemClick = async () => {
    if (item.path && !sideBarExtended) {
      await router.push(item.path);
    } else if (sideBarExtended) {
      setOpen(!open);
    }
  };
  return (
    <>
      <StyledItem active={item.path === router.asPath} onClick={handleItemClick}>
        {item.icon}
        {sideBarExtended && (
          <>
            <StyledItemText variant='light' active={item.path === router.asPath}>
              {t(item.text)}
            </StyledItemText>
            {open ? <UpArrow fill='#111827' /> : <DownArrow fill='#111827' />}
          </>
        )}
      </StyledItem>

      {open &&
        item.childs?.map((child, index) => (
          <StyledItem
            key={child.text}
            active={child.path === router.asPath}
            onClick={() => {
              router.push(child.path || '');
              handleClick();
            }}
            style={{ marginLeft: '8px', top: '-8px' }}
            data-aos='fade-down'
            data-aos-duration='500'
            data-aos-delay={index * 50}>
            {child.icon}
            {sideBarExtended && (
              <StyledItemText active={child.path === router.asPath} variant='light'>
                {t(child.text)}
              </StyledItemText>
            )}
          </StyledItem>
        ))}
    </>
  );
};

const Sidebar = () => {
  const { mutateAsync } = useLogoutUser();
  const router = useRouter();
  const { t } = useTranslation('dashboards');
  const { isSidebarOpen, setIsSidebarOpen } = useLayout();
  const { isSmScreen } = useWindowResize();

  const handleClick = () => {
    if (isSmScreen) {
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  const Logout = async () => {
    try {
      await mutateAsync();
      router.push('/');
      handleClick();
    } catch (err) {
      throw new Error('Could not logout');
    }
  };

  return (
    <>
      <StyledMenuMobile onClick={() => setIsSidebarOpen(!isSidebarOpen)} isSidebarOpen={isSidebarOpen}>
        {isSidebarOpen ? <CloseIcon /> : <MenuIcon />}
      </StyledMenuMobile>
      <StyledContainer sideBarExtended={isSidebarOpen}>
        {/* above */}
        <StyledHeaderContainer sideBarExtended={isSidebarOpen}>
          {isSidebarOpen && <ecommerceLogo width={82} height={20} />}
          <StyledArrowCollapse onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            {isSidebarOpen ? <LeftChevron /> : <RightChevron height={32} width={32} />}
          </StyledArrowCollapse>
        </StyledHeaderContainer>

        <StyledSeparator />

        {/* middle */}
        <StyledSectionsContainer sideBarExtended={isSidebarOpen}>
          {items.map(item => {
            return item.childs ? (
              <ItemWithChild key={item.text} item={item} sideBarExtended={isSidebarOpen} />
            ) : (
              <StyledItem
                key={item.text}
                active={item.path === router.asPath}
                onClick={() => {
                  if (item.path) {
                    router.push(item.path);
                    handleClick();
                  }
                }}>
                {item.icon}
                {isSidebarOpen && (
                  <StyledItemText variant='light' active={item.path === router.asPath}>
                    {t(item.text)}
                  </StyledItemText>
                )}
              </StyledItem>
            );
          })}
          <StyledLanguageSwitcher>
            <LanguageSwitcher variantColor='black' isSidebar />
          </StyledLanguageSwitcher>
        </StyledSectionsContainer>

        <StyledSeparator />

        <StyledFooterContainer sideBarExtended={isSidebarOpen}>
          <StyledSeparatorMobile />
          <StyledItem>
            <div onClick={Logout} aria-hidden='true'>
              <LogoutIcon />
            </div>
            {isSidebarOpen && (
              <div onClick={Logout} aria-hidden='true'>
                <StyledItemText variant='light' active={false}>
                  {t('SIDEBAR.LOGOUT')}
                </StyledItemText>
              </div>
            )}
          </StyledItem>
        </StyledFooterContainer>
      </StyledContainer>
    </>
  );
};

export default Sidebar;
