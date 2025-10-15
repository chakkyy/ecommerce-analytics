import DownArrow from '@icons/down-arrow';
import { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import TextBody from '@ui/text-body';
import { useTranslation } from 'next-i18next';
import { useClickOutside } from '@hooks/useClickOutside';
import UpArrow from '@icons/up-arrow';
import { useRouter } from 'next/router';
import { Theme } from '../../theme/theme';

const DropDownContainer = styled.div`
  height: 24px;
  position: relative;
`;

const DropDownListContainer = styled.div<{ isSidebar?: boolean }>`
  position: absolute;
  z-index: 100;
  right: 0px;
  top: 25px;
  width: 205px;
  left: ${p => p.isSidebar && '0'};
`;

const DropDownList = styled.ul`
  cursor: pointer;
  margin: 0;
  padding: 16px;
  background: #fff;
  box-sizing: border-box;
  box-shadow: 0px 16px 40px rgba(17, 24, 39, 0.1);
  border-radius: 8px;

  &:last-child {
    padding-bottom: 8px;
  }
`;
const ListItem = styled.li`
  list-style: none;
  margin-bottom: 8px;
  padding: 8px 16px;
  border-radius: 8px;

  &:hover {
    background: ${({ theme }: { theme: Theme }) => theme.colors.cloudBlue};

    p {
      font-weight: 700;
    }
  }
`;

const StyledLabel = styled(TextBody)`
  color: ${({ theme }: { theme: Theme }) => theme.colors.black};
`;

type Option = {
  label: string;
  value: string;
};

type DropdownProps = {
  options?: Option[];
  variantColor?: 'white' | 'black';
  bold?: boolean;
  isSidebar?: boolean;
};

const dropdownOptions = [
  { value: 'es', label: 'SPANISH' },
  { value: 'en', label: 'ENGLISH' },
  { value: 'pt', label: 'PORTUGUESE' },
];

const variantColors = {
  white: css`
    color: ${({ theme }: { theme: Theme }) => theme.colors.white};
  `,

  black: css`
    color: ${({ theme }: { theme: Theme }) => theme.colors.black};
  `,
};

const StyledText = styled(TextBody)<Pick<DropdownProps, 'variantColor'>>`
  ${props => props.variantColor && variantColors[props.variantColor]};
`;

const DropDownHeader = styled.div<Pick<DropdownProps, 'variantColor'>>`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;

  svg {
    ${props => props.variantColor && variantColors[props.variantColor]};
  }
`;

const LanguageSwitcher = ({
  options = dropdownOptions,
  variantColor,
  bold = false,
  isSidebar = false,
}: DropdownProps) => {
  const router = useRouter();
  const path = router.asPath;
  const { t, i18n } = useTranslation('common');
  const currentLanguage = i18n.language;

  const dropdownCurrentLanguage = (language: string) => {
    switch (language) {
      case 'es':
        return 'ESP';
      case 'en':
        return 'ENG';
      case 'pt':
        return 'POR';
      default:
        return 'ESP';
    }
  };

  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement | null>(null);

  const toggling = () => setIsOpen(!isOpen);

  useClickOutside({
    ref: selectRef,
    callback: () => {
      setIsOpen(false);
    },
  });

  const onOptionClicked = (value: string) => async () => {
    await router.push(path, path, { locale: value });
    setIsOpen(false);
  };

  return (
    <DropDownContainer ref={selectRef}>
      <DropDownHeader onClick={toggling}>
        <StyledText variant={bold ? 'bold' : 'small'} color={variantColor}>
          {dropdownCurrentLanguage(currentLanguage)}
        </StyledText>
        {isOpen ? (
          <UpArrow fill={variantColor} width={22} height={22} />
        ) : (
          <DownArrow fill={variantColor} width={22} height={22} />
        )}
      </DropDownHeader>
      {isOpen && (
        <DropDownListContainer isSidebar={isSidebar}>
          <DropDownList>
            {options.map(option => (
              <ListItem onClick={onOptionClicked(option.value)} key={option.value}>
                <StyledLabel>{t(option.label)}</StyledLabel>
              </ListItem>
            ))}
          </DropDownList>
        </DropDownListContainer>
      )}
    </DropDownContainer>
  );
};

export default LanguageSwitcher;
