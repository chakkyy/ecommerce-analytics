type Props = {
  width?: number;
  height?: number;
};

const CheckIcon = ({ width = 24, height = 24 }: Props) => {
  return (
    <svg width={width} height={height} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_159_184)'>
        <path
          d='M9.99999 15.172L19.192 5.979L20.607 7.393L9.99999 18L3.63599 11.636L5.04999 10.222L9.99999 15.172Z'
          fill='currentColor'
        />
      </g>
      <defs>
        <clipPath id='clip0_159_184'>
          <rect width='24' height='24' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CheckIcon;
