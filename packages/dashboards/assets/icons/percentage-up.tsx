type Props = {
  width?: number;
  height?: number;
};

const PercentageUpIcon = ({ width = 17, height = 17 }: Props) => {
  return (
    <svg width={width} height={height} viewBox='0 0 17 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M3.08496 11.8335L6.76917 8.3335L8.61128 10.0835L13.085 5.8335' stroke='#339F00' strokeWidth='1.43106' />
      <path d='M10.418 5.16675H13.7513V8.50008' stroke='#339F00' strokeWidth='1.43106' />
    </svg>
  );
};

export default PercentageUpIcon;
