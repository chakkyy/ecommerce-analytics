type Props = {
  width?: number;
  height?: number;
};

const StarIcon = ({ width = 16, height = 16 }: Props) => {
  return (
    <svg width={width} height={height} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_1826_15754)'>
        <path
          d='M7.99978 12.1735L3.29778 14.8055L4.34778 9.52016L0.391113 5.8615L5.74245 5.22683L7.99978 0.333496L10.2571 5.22683L15.6084 5.8615L11.6518 9.52016L12.7018 14.8055L7.99978 12.1735ZM7.99978 10.6455L10.8311 12.2302L10.1984 9.04816L12.5804 6.84483L9.35845 6.46283L7.99978 3.51683L6.64111 6.4635L3.41911 6.84483L5.80111 9.04816L5.16845 12.2302L7.99978 10.6455Z'
          fill='#111827'
        />
      </g>
      <defs>
        <clipPath id='clip0_1826_15754'>
          <rect width='16' height='16' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default StarIcon;
