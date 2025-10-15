type Props = {
  width?: number;
  height?: number;
};

const GraphicIcon = ({ width = 65, height = 65 }: Props) => {
  return (
    <svg width={width} height={height} viewBox='0 0 61 61' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <g opacity='0.25'>
        <g filter='url(#filter0_d_1477_13401)'>
          <circle cx='29.5' cy='28.5' r='20.5' fill='#FC7E00' />
        </g>
        <g filter='url(#filter1_d_1477_13401)'>
          <path
            d='M48 28.5C49.1046 28.5 50.0101 27.6025 49.9025 26.5031C49.6209 23.6252 48.7326 20.8314 47.2876 18.3093C45.5103 15.207 42.9525 12.6235 39.8682 10.8153C36.7839 9.00698 33.2803 8.0368 29.7051 8.00103C26.13 7.96525 22.6077 8.86512 19.4878 10.6113C16.3679 12.3575 13.7589 14.8893 11.9199 17.9553C10.0808 21.0214 9.07566 24.5151 9.00411 28.0897C8.93255 31.6643 9.79713 35.1955 11.512 38.3327C12.9062 40.8833 14.8231 43.1014 17.1289 44.8464C18.0096 45.513 19.2482 45.2105 19.8258 44.269L28.9146 29.4541C29.2783 28.8613 29.9239 28.5 30.6194 28.5H48Z'
            fill='#004DBC'
          />
        </g>
      </g>
      <defs>
        <filter
          id='filter0_d_1477_13401'
          x='0'
          y='0'
          width='61'
          height='61'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'>
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dx='1' dy='2' />
          <feGaussianBlur stdDeviation='5' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix type='matrix' values='0 0 0 0 0.0666667 0 0 0 0 0.0941176 0 0 0 0 0.152941 0 0 0 0.1 0' />
          <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_1477_13401' />
          <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_1477_13401' result='shape' />
        </filter>
        <filter
          id='filter1_d_1477_13401'
          x='6'
          y='6'
          width='48.9111'
          height='45.2051'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'>
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dx='1' dy='2' />
          <feGaussianBlur stdDeviation='2' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix type='matrix' values='0 0 0 0 0.0666667 0 0 0 0 0.0941176 0 0 0 0 0.152941 0 0 0 0.2 0' />
          <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_1477_13401' />
          <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_1477_13401' result='shape' />
        </filter>
      </defs>
    </svg>
  );
};
export default GraphicIcon;
