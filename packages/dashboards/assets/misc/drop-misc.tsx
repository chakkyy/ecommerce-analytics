type Props = {
  width?: number;
  height?: number;
};

const BlueDropMisc = ({ width = 101, height = 134 }: Props) => {
  return (
    <svg width={width} height={height} viewBox='0 0 101 134' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M-41 105.006C-41 143.935 -9.42889 175.506 29.5 175.506C68.4289 175.506 100 143.935 100 105.006C100 104.771 100 104.537 100 104.273H99.8827C100.059 98.9085 98.7395 63.5559 39.7306 5.27983C37.1509 2.64158 33.5453 1 29.5293 1C25.5133 1 21.937 2.64158 19.3574 5.27983C-39.7395 63.5852 -41.0586 98.9378 -40.8827 104.273H-41C-41 104.507 -41 104.742 -41 105.006Z'
        stroke='#72DAE8'
        strokeWidth='2'
        strokeMiterlimit='10'
      />
    </svg>
  );
};

export default BlueDropMisc;
