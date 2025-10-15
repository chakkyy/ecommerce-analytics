type Props = {
  width?: number;
  height?: number;
  fill?: string;
};

const UploadIcon = ({ width = 24, height = 24, fill = 'currentColor' }: Props) => {
  return (
    <svg width={width} height={height} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_16_143)'>
        <path
          d='M3 19H21V21H3V19ZM13 5.828V17H11V5.828L4.929 11.9L3.515 10.486L12 2L20.485 10.485L19.071 11.899L13 5.83V5.828Z'
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id='clip0_16_143'>
          <rect width='24' height='24' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default UploadIcon;
