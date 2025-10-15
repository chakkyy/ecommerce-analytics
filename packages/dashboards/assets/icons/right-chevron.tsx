type Props = {
  width?: number;
  height?: number;
  fill?: string;
};

const RightChevron = ({ width = 32, height = 32, fill = 'currentColor' }: Props) => {
  return (
    <svg width={width} height={height} viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_223_261)'>
        <path
          d='M17.4147 16L10.8147 9.39999L12.7 7.51465L21.1853 16L12.7 24.4853L10.8147 22.6L17.4147 16Z'
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id='clip0_223_261'>
          <rect width='32' height='32' fill='white' transform='translate(0 32) rotate(-90)' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default RightChevron;
