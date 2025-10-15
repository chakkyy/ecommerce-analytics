import { MouseEventHandler } from 'react';

type Props = {
  width?: number;
  height?: number;
  onClick?: MouseEventHandler<SVGSVGElement> | undefined;
};

const BlackRighttArrowIcon = ({ width = 24, height = 24, onClick }: Props) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      onClick={onClick}>
      <g clipPath='url(#clip0_3460_20592)'>
        <path
          d='M13.0613 11.9998L8.11133 7.04977L9.52533 5.63577L15.8893 11.9998L9.52533 18.3638L8.11133 16.9498L13.0613 11.9998Z'
          fill='#111827'
        />
      </g>
      <defs>
        <clipPath id='clip0_3460_20592'>
          <rect width='24' height='24' fill='white' transform='matrix(-1 0 0 1 24 0)' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default BlackRighttArrowIcon;
