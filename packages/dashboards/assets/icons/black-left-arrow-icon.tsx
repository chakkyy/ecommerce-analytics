import { MouseEventHandler } from 'react';

type Props = {
  width?: number;
  height?: number;
  onClick?: MouseEventHandler<SVGSVGElement> | undefined;
};

const BlackLeftArrowIcon = ({ width = 24, height = 24, onClick }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      onClick={onClick}>
      <g clipPath='url(#clip0_3460_20589)'>
        <path
          d='M10.9387 11.9998L15.8887 7.04977L14.4747 5.63577L8.11067 11.9998L14.4747 18.3638L15.8887 16.9498L10.9387 11.9998Z'
          fill='#111827'
        />
      </g>
      <defs>
        <clipPath id='clip0_3460_20589'>
          <rect width='24' height='24' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default BlackLeftArrowIcon;
