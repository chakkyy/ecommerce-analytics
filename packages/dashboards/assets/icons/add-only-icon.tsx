type Props = {
  width?: number;
  height?: number;
};

const AddOnlyIcon = ({ width = 12, height = 12 }: Props) => {
  return (
    <svg width={width} height={height} viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M5.16699 5.16675V0.166748H6.83366V5.16675H11.8337V6.83341H6.83366V11.8334H5.16699V6.83341H0.166992V5.16675H5.16699Z'
        fill='#004DBC'
      />
    </svg>
  );
};

export default AddOnlyIcon;
