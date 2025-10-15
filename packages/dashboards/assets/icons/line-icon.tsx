type Props = {
  width?: number;
  height?: number;
};

const LineIcon = ({ width = 45, height = 28 }: Props) => {
  return (
    <svg width={width} height={height} viewBox='0 0 49 36' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M1.75 30.5C3.16463 28.0553 4.18699 21.3317 14.0894 21.3317C20.8942 21.3317 22.7978 27.4994 29 27.4994C41.2602 27.4994 38.1332 15.6874 40.25 9C41.1996 6 42.25 2.5 47.25 2'
        stroke='#004DBC'
        strokeWidth='3'
        strokeLinecap='round'
      />
      <g filter='url(#filter0_d_1477_13392)'>
        <circle cx='21' cy='24' r='6' fill='#FC7E00' fillOpacity='0.4' />
        <circle cx='20.9999' cy='23.9994' r='3.6' fill='#FC7E00' />
      </g>
      <defs>
        <filter
          id='filter0_d_1477_13392'
          x='11.7191'
          y='16.9064'
          width='18.5617'
          height='18.5617'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'>
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='2.18724' />
          <feGaussianBlur stdDeviation='1.64043' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix type='matrix' values='0 0 0 0 0.0666667 0 0 0 0 0.0941176 0 0 0 0 0.152941 0 0 0 0.1 0' />
          <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_1477_13392' />
          <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_1477_13392' result='shape' />
        </filter>
      </defs>
    </svg>
  );
};

export default LineIcon;
