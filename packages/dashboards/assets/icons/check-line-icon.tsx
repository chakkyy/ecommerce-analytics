type Props = {
  width?: number;
  height?: number;
};

const CheckLineIcon = ({ width = 10, height = 24 }: Props) => {
  return (
    <svg width={width} height={height} viewBox='0 0 10 2' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M0 1L10 0.999999' stroke='#111827' strokeWidth='2' />
    </svg>
  );
};

export default CheckLineIcon;
