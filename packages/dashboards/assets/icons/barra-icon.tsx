type Props = {
  width?: number;
  height?: number;
};

const BarraIcon = ({ width = 42, height = 42 }: Props) => {
  return (
    <svg width={width} height={height} viewBox='0 0 58 58' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g filter='url(#filter0_d_1477_13385)'>
        <path d='M6 9.5V47' stroke='#004DBC' strokeWidth='6' strokeLinecap='round' />
        <path d='M20 21L20 47' stroke='#004DBC' strokeWidth='6' strokeLinecap='round' />
        <path d='M34 5L34 47' stroke='#004DBC' strokeWidth='6' strokeLinecap='round' />
        <path d='M48 31L48 47' stroke='#004DBC' strokeWidth='6' strokeLinecap='round' />
      </g>
      <defs>
        <filter
          id='filter0_d_1477_13385'
          x='0'
          y='0'
          width='58'
          height='58'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'>
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dx='2' dy='3' />
          <feGaussianBlur stdDeviation='2.5' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix type='matrix' values='0 0 0 0 0.0666667 0 0 0 0 0.0941176 0 0 0 0 0.152941 0 0 0 0.1 0' />
          <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_1477_13385' />
          <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_1477_13385' result='shape' />
        </filter>
      </defs>
    </svg>
  );
};

export default BarraIcon;
