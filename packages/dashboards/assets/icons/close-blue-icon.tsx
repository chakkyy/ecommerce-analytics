type Props = {
  width?: number;
  height?: number;
};

const CloseBlueIcon = ({ width = 32, height = 32 }: Props) => {
  return (
    <svg width={width} height={height} viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_995_10372)'>
        <path
          d='M16.001 14.1146L22.601 7.51465L24.4863 9.39998L17.8863 16L24.4863 22.6L22.601 24.4853L16.001 17.8853L9.40096 24.4853L7.51562 22.6L14.1156 16L7.51562 9.39998L9.40096 7.51465L16.001 14.1146Z'
          fill='#004DBC'
        />
      </g>
      <defs>
        <clipPath id='clip0_995_10372'>
          <rect width='32' height='32' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CloseBlueIcon;
