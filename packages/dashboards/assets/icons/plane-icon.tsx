type Props = {
  width?: number;
  height?: number;
};

const PlaneIcon = ({ width = 24, height = 24 }: Props) => {
  return (
    <svg width={width} height={height} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_964_2386)'>
        <path
          d='M1.92302 9.36955C1.41302 9.16455 1.41902 8.85955 1.95702 8.68055L21.043 2.31855C21.572 2.14255 21.875 2.43855 21.727 2.95655L16.273 22.0426C16.123 22.5716 15.798 22.5956 15.556 22.1126L11 12.9996L1.92302 9.36955ZM6.81302 9.16955L12.449 11.4246L15.489 17.5066L19.035 5.09655L6.81202 9.16955H6.81302Z'
          fill='currentColor'
        />
        <path d='M11.0486 12.983L14.6921 9.35421' stroke='currentColor' strokeWidth='2' />
      </g>
      <defs>
        <clipPath id='clip0_964_2386'>
          <rect width='24' height='24' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default PlaneIcon;
