type Props = {
  width?: number;
  height?: number;
};

const BusinessIcon = ({ width = 73, height = 85 }: Props) => {
  return (
    <svg width={width} height={height} viewBox='0 0 73 85' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M21.6738 31.2295L35.1773 23.2671C35.9885 22.7815 36.9905 22.7815 37.8017 23.2671L51.2098 31.1324L70.4392 20.0627L38.7083 1.41884C37.3245 0.59346 35.6545 0.59346 34.3184 1.41884L2.53979 20.0627L21.6738 31.2295Z'
        fill='url(#paint0_linear_769_6822)'
      />
      <path
        d='M53.7897 34.379V51.1325C53.7897 52.1094 53.2703 52.9886 52.4676 53.477L38.6799 61.7316V84.1998L70.4576 65.2484C71.8269 64.418 72.6296 62.9527 72.6296 61.3409V23.3403L53.7897 34.379Z'
        fill='url(#paint1_linear_769_6822)'
      />
      <path
        d='M34.2993 61.7316L20.5117 53.477C19.709 52.9886 19.1896 52.1094 19.1896 51.1325V34.379L0.349609 23.3403V61.3409C0.349609 62.9527 1.19953 64.4669 2.52163 65.2484L34.2521 84.1998V61.7316H34.2993Z'
        fill='#FF4F4F'
      />
      <defs>
        <linearGradient
          id='paint0_linear_769_6822'
          x1='2.5355'
          y1='31.2649'
          x2='70.448'
          y2='31.2649'
          gradientUnits='userSpaceOnUse'>
          <stop stopColor='#1895FF' />
          <stop offset='1' stopColor='#64C4FF' />
        </linearGradient>
        <linearGradient
          id='paint1_linear_769_6822'
          x1='38.6594'
          y1='84.2063'
          x2='72.5996'
          y2='84.2063'
          gradientUnits='userSpaceOnUse'>
          <stop stopColor='#FFB800' />
          <stop offset='1' stopColor='#FFD03B' />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default BusinessIcon;
