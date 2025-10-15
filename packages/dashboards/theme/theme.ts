export interface Theme {
  name: string;
  colors: {
    black: string;
    grey: string;
    lightGrey: string;
    almostWhite: string;
    white: string;
    darkBlue: string;
    blue: string;
    cloudBlue: string;
    marineBlue: string;
    secondaryBlue: string;
    skyBlue: string;
    lightBlue: string;
    orange: string;
    lightOrange: string;
    redError: string;
    lightRed: string;
    greenSuccess: string;
    lightGreen: string;
    sand: string;
    blueSelection: string;
    darkGrey: string;
    secondaryHover: string;
    primary: string;
    error: string;
  };
  breakpoints: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}
