import { createGlobalStyle, css } from 'styled-components';
import { Theme } from '../../theme/theme';

const reset = css`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  strong,
  sub,
  sup,
  tt,
  var,
  b,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  textarea,
  video,
  button,
  input {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font-family: 'Roboto', sans-serif;
    vertical-align: baseline;
    text-decoration: none;
  }

  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
    background-color: ${({ theme }: { theme: Theme }) => theme.colors.white};
    color: ${({ theme }: { theme: Theme }) => theme.colors.black};
    min-height: 100vh;
  }
  html {
    scroll-behavior: smooth !important;
    scroll-padding-top: 70px;
    @media (min-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.md}) {
      scroll-padding-top: 95px;
    }
  }
  a {
    color: ${({ theme }: { theme: Theme }) => theme.colors.black};
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  label {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 140%;

    @media (min-width: ${({ theme }: { theme: Theme }) => theme.breakpoints.sm}) {
      font-size: 16px;
      line-height: 160%;
    }
  }

  svg {
    transform: none !important;
  }

  #anchor {
    scroll-margin-top: -100px;
  }
`;

export const h1Styles = css`
  font-family: 'Montserrat', sans-serif;
  font-style: normal;
  font-weight: 700;
  font-size: 80px;
  line-height: 120%;
`;

export const h2Styles = css`
  ${h1Styles}
  font-size: 48px;
  line-height: 120%;
`;

export const h3Styles = css`
  ${h2Styles}
  font-size: 40px;
`;

export const h4Styles = css`
  ${h3Styles}
  font-size: 32px;
  line-height: 135%;
`;

const titleStyles = css`
  h1 {
    ${h1Styles}
  }

  h2 {
    ${h2Styles}
  }

  h3 {
    ${h3Styles}
  }

  h4 {
    ${h4Styles}
  }
`;

export const scrollStyles = css`
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

export const GlobalStyle = createGlobalStyle`
  ${scrollStyles}
  ${reset}
  ${titleStyles}

  :root {
    --header-desktop: 56px;
  }
`;
