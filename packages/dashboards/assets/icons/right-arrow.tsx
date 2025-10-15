type Props = {
  width?: number;
  height?: number;
};

const RightArrow = ({ width = 16, height = 16 }: Props) => {
  return (
    <svg width={width} height={height} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_2537_7637)'>
        <path
          d='M10.7813 7.33336H2.66659V8.6667H10.7813L7.20525 12.2427L8.14792 13.1854L13.3333 8.00003L8.14792 2.8147L7.20525 3.75736L10.7813 7.33336Z'
          fill='white'
        />
      </g>
      <defs>
        <clipPath id='clip0_2537_7637'>
          <rect width='16' height='16' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default RightArrow;
