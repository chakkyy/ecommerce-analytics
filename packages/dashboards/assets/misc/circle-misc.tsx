type Props = {
  width?: number;
  height?: number;
  fill?: string;
};

const CircleMisc = ({ width = 20, height = 20, fill = 'currentColor' }: Props) => {
  return (
    <svg width={width} height={height} viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='10' cy='10' r='10' fill={fill} />
    </svg>
  );
};

export default CircleMisc;
