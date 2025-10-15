type Props = {
  width?: number;
  height?: number;
};

const ColorPaletteIcon3 = ({ width = 160, height = 32 }: Props) => {
  return (
    <svg width={width} height={height} viewBox='0 0 160 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M0 4C0 1.79086 1.79086 0 4 0H53.3333V32H4C1.79086 32 0 30.2091 0 28V4Z' fill='#72DAE8' />
      <path d='M53.3335 0H106.667V32H53.3335V0Z' fill='#8ABAFF' />
      <path d='M106.667 0H156C158.209 0 160 1.79086 160 4V28C160 30.2091 158.209 32 156 32H106.667V0Z' fill='#003177' />
    </svg>
  );
};

export default ColorPaletteIcon3;
