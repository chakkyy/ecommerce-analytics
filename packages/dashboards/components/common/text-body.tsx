import React from 'react';
import styled, { css } from 'styled-components';

interface Props {
  as?: keyof JSX.IntrinsicElements;
  href?: string;
  className?: string;
  children?: React.ReactNode;
  variant?: 'small' | 'smallLight' | 'subtitle' | 'bold' | 'light' | 'lightItalic';
  color?: string;
}

const baseStyle = css`
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;

const variants = {
  subtitle: css`
    ${baseStyle}
    font-size: 20px;
    font-weight: 700;
    line-height: 130%;
  `,
  small: css`
    ${baseStyle}
    font-size: 14px;
    line-height: 130%;
  `,
  smallLight: css`
    ${baseStyle}
    font-size: 14px;
    line-height: 130%;
    font-weight: 300;
  `,
  bold: css`
    ${baseStyle}
    font-weight: 700;
  `,
  light: css`
    ${baseStyle}
    font-weight: 300;
  `,
  lightItalic: css`
    ${baseStyle}
    font-weight: 300;
    font-style: italic;
  `,
};

const StyledParagraph = styled.p<Pick<Props, 'variant'>>`
  color: ${props => (props.color ? props.color : 'inherit')};
  ${props => (props.variant ? variants[props.variant] : baseStyle)};
`;

const TextBody = React.forwardRef<HTMLParagraphElement, Props>(
  ({ as, className, children, variant, href, color }, ref) => (
    <StyledParagraph as={as} href={href} className={className} variant={variant} ref={ref} color={color}>
      {children}
    </StyledParagraph>
  )
);

TextBody.displayName = 'TextBody';

export default TextBody;
