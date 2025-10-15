type Props = {
  width?: number;
  height?: number;
};

const OrangeDashedCircle = ({ width = 107, height = 107 }: Props) => {
  return (
    <svg width={width} height={height} viewBox='0 0 107 107' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <circle cx='53.5' cy='53.5' r='52.5' stroke='#FC7E00' strokeWidth='2' strokeDasharray='5 5' />
    </svg>
  );
};

export default OrangeDashedCircle;
