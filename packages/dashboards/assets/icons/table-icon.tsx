type Props = {
  width?: number;
  height?: number;
};

const TableIcon = ({ width = 64, height = 64 }: Props) => {
  return (
    <svg width={width} height={height} viewBox='0 0 62 62' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g opacity='0.25' filter='url(#filter0_d_1477_13406)'>
        <rect
          x='9.47826'
          y='5.47826'
          width='43.0435'
          height='43.0435'
          rx='3.34783'
          fill='white'
          stroke='#004DBC'
          strokeWidth='0.956522'
        />
        <path d='M9.95654 17.4346H52.5218' stroke='#004DBC' strokeWidth='0.956522' />
        <path d='M9.95654 25.0869H52.5218' stroke='#004DBC' strokeWidth='0.956522' />
        <path d='M9.95654 32.7393H52.5218' stroke='#004DBC' strokeWidth='0.956522' />
        <path d='M9.95654 40.3916H52.5218' stroke='#004DBC' strokeWidth='0.956522' />
        <path d='M17.6089 49L17.6089 17.4348' stroke='#004DBC' strokeWidth='0.956522' />
        <path d='M26.2173 49L26.2173 17.4348' stroke='#004DBC' strokeWidth='0.956522' />
        <path d='M34.8262 49L34.8262 17.4348' stroke='#004DBC' strokeWidth='0.956522' />
        <path d='M43.4346 49L43.4346 17.4348' stroke='#004DBC' strokeWidth='0.956522' />
      </g>
      <defs>
        <filter
          id='filter0_d_1477_13406'
          x='0'
          y='0'
          width='62'
          height='62'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'>
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='4' />
          <feGaussianBlur stdDeviation='4.5' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix type='matrix' values='0 0 0 0 0.0666667 0 0 0 0 0.0941176 0 0 0 0 0.152941 0 0 0 0.05 0' />
          <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_1477_13406' />
          <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_1477_13406' result='shape' />
        </filter>
      </defs>
    </svg>
  );
};

export default TableIcon;
