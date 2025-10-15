type Props = {
  width?: number;
  height?: number;
  fill?: string;
};

const TwoUpArrowsMisc = ({ width = 29, height = 35, fill = '#FC7E00' }: Props) => {
  return (
    <svg width={width} height={height} viewBox='0 0 33 40' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M31 17.1778L16.5 3L2 17.1778' stroke={fill} strokeWidth='4' strokeLinecap='round' />
      <path d='M31 38L16.5 23.1777L2 38' stroke={fill} strokeWidth='4' strokeLinecap='round' />
    </svg>
  );
};

export default TwoUpArrowsMisc;
