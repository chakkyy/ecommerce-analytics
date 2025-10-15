type Props = {
  width?: number;
  height?: number;
  fill?: string;
};

const LeftChevron = ({ width = 32, height = 32, fill = 'currentColor' }: Props) => {
  return (
    <svg width={width} height={height} viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_223_273)'>
        <path
          d='M14.5853 16L21.1853 22.6L19.3 24.4853L10.8147 16L19.3 7.51468L21.1853 9.40001L14.5853 16Z'
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id='clip0_223_273'>
          <rect width='32' height='32' fill='white' transform='translate(32) rotate(90)' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default LeftChevron;
