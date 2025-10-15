import { MouseEventHandler } from 'react';

type Props = {
  width?: number;
  height?: number;
  fill?: string;
  onClick?: MouseEventHandler<SVGSVGElement> | undefined;
};

const CloseIcon = ({ width = 24, height = 24, fill = 'currentColor', onClick }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      onClick={onClick}>
      <g clipPath='url(#clip0_29_231)'>
        <path
          d='M12 10.586L16.95 5.636L18.364 7.05L13.414 12L18.364 16.95L16.95 18.364L12 13.414L7.05 18.364L5.636 16.95L10.586 12L5.636 7.05L7.05 5.636L12 10.586Z'
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id='clip0_29_231'>
          <rect width='24' height='24' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CloseIcon;
