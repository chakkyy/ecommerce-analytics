type Props = {
  width?: number;
  height?: number;
  fill?: string;
};

const UpArrow = ({ width = 24, height = 24, fill = 'currentColor' }: Props) => {
  return (
    <svg width={width} height={height} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_120_196)'>
        <path d='M12 10.939L16.95 15.889L18.364 14.475L12 8.111L5.63602 14.475L7.05002 15.889L12 10.939Z' fill={fill} />
      </g>
      <defs>
        <clipPath id='clip0_120_196'>
          <rect width='24' height='24' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default UpArrow;
