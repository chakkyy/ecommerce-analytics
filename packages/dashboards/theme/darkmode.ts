import { Theme } from './theme';

// Inverted colors
const theme: Theme = {
  name: 'darkmode',
  colors: {
    black: '#FFFFFF',
    grey: '#7E7E7E',
    lightGrey: '#DDDDDD',
    almostWhite: '#F9F9FB',
    white: '#111827',
    darkBlue: '#003177',
    blue: '#004DBC',
    cloudBlue: '#CCDBF2',
    marineBlue: '#4D83D0',
    secondaryBlue: '#003A8D',
    skyBlue: '#8ABAFF',
    lightBlue: '#F4F9FF',
    orange: '#FC7E00',
    lightOrange: '#FED8B2',
    redError: '#FF0000',
    lightRed: '#FFC7C7',
    greenSuccess: '#339F00',
    lightGreen: '#D6ECCC',
    sand: '#F4EFEA',
    blueSelection: '#0D99FF',
    darkGrey: '#555C65',
    secondaryHover: '#EDF9F2',
    primary: '#00CD5D',
    error: '#F1414C',
  },
  breakpoints: {
    xs: '556px',
    sm: '728px',
    md: '960px',
    lg: '1302px',
    xl: '1600px',
  },
};
export default theme;
