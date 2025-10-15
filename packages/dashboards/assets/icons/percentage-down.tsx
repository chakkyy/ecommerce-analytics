type Props = {
  width?: number;
  height?: number;
};

const PercentageDownIcon = ({ width = 17, height = 17 }: Props) => {
  return (
    <svg width={width} height={height} viewBox='0 0 17 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path d='M3.08496 5.1665L6.76917 8.6665L8.61128 6.9165L13.085 11.1665' stroke='#FF0000' strokeWidth='1.43106' />
      <path d='M10.418 11.8333H13.7513V8.49992' stroke='#FF0000' strokeWidth='1.43106' />
    </svg>
  );
};

export default PercentageDownIcon;
