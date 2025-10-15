type Props = {
  width?: number;
  height?: number;
};

const MenuIcon = ({ width = 28, height = 28 }: Props) => {
  return (
    <svg width={width} height={height} viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g clipPath='url(#clip0_3945_2922)'>
        <path
          d='M3.5 4.66663L24.5 4.66663V6.99996L3.5 6.99996L3.5 4.66663ZM3.5 12.8333L24.5 12.8333V15.1666L3.5 15.1666L3.5 12.8333ZM3.5 21L24.5 21V23.3333L3.5 23.3333L3.5 21Z'
          fill='#004DBC'
        />
      </g>
      <defs>
        <clipPath id='clip0_3945_2922'>
          <rect width='28' height='28' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};

export default MenuIcon;
