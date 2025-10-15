type Props = {
  width?: number;
  height?: number;
};

const CircleCheckIcon = ({ width = 28, height = 28 }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill='none'
      xmlns='http://www.w3.org/2000/svg'>
      <rect width={width} height={height} rx='14' fill='#339F00' />
      <g clipPath='url(#clip0_1507_5757)'>
        <path
          d='M12.3336 16.6433L19.9936 8.98242L21.1728 10.1608L12.3336 18.9999L7.03027 13.6966L8.20861 12.5183L12.3336 16.6433Z'
          fill='white'
        />
      </g>
      <defs>
        <clipPath id='clip0_1507_5757'>
          <rect width={width} height={height} fill='white' transform='translate(4 4)' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CircleCheckIcon;
