type Props = {
  width?: number;
  height?: number;
  fill?: string;
};

const CircleWithArrow = ({ width = 38, height = 38, fill = '#CCDBF2' }: Props) => {
  return (
    <svg width={width} height={height} viewBox='0 0 38 38' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M37 19.0038V18.9962C37 9.05718 28.9428 1 19.0038 1H18.9962C9.05718 1 1 9.05718 1 18.9962V19.0038C1 28.9428 9.05718 37 18.9962 37H19.0038C28.9428 37 37 28.9428 37 19.0038Z'
        stroke={fill}
        strokeMiterlimit='10'
      />
      <path
        d='M20.327 24.006C20.8293 23.4153 21.4666 22.7729 22.113 22.2352L22.1285 22.2608C21.5047 22.7779 20.8923 23.3767 20.327 24.006ZM19.0019 24.2366V25.6563C18.9997 25.6594 18.9975 25.6625 18.9953 25.6656C18.9931 25.6625 18.9909 25.6594 18.9887 25.6563V24.2366V11.9426H19.0019V24.2366ZM15.8776 22.2352C16.524 22.7729 17.1613 23.4153 17.6636 24.006C17.0983 23.3767 16.486 22.7779 15.8621 22.2608L15.8776 22.2352Z'
        fill={fill}
        stroke={fill}
      />
    </svg>
  );
};

export default CircleWithArrow;
