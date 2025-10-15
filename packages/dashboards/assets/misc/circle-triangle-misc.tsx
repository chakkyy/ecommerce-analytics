type Props = {
  width?: number;
  height?: number;
};

const CircleTriangleMisc = ({ width = 46, height = 46 }: Props) => {
  return (
    <svg width={width} height={height} viewBox='0 0 46 46' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M45 23.0046V22.9954C45 10.8477 35.1523 1 23.0046 1H22.9954C10.8477 1 1 10.8477 1 22.9954V23.0046C1 35.1523 10.8477 45 22.9954 45H23.0046C35.1523 45 45 35.1523 45 23.0046Z'
        stroke='#72DAE8'
        strokeWidth='2'
        strokeMiterlimit='10'
      />
      <path d='M12.5527 30.5553L22.9996 13.3181L33.4464 30.5553H12.5527Z' stroke='#72DAE8' strokeWidth='2' />
    </svg>
  );
};

export default CircleTriangleMisc;
