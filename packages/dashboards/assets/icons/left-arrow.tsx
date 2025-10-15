type Props = {
  width?: number;
  height?: number;
  fill?: string;
};

const LeftArrow = ({ width = 24, height = 24, fill = 'currentColor' }: Props) => {
  return (
    <svg width={width} height={height} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_28_227)'>
        <path
          d='M7.828 11H20V13H7.828L13.192 18.364L11.778 19.778L4 12L11.778 4.222L13.192 5.636L7.828 11Z'
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id='clip0_28_227'>
          <rect width='24' height='24' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default LeftArrow;
