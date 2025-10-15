import styled from 'styled-components';
import Options from './options/options';
import Products from './products/products';

const StyledWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
`;

const NewMetric = () => {
  return (
    <StyledWrapper>
      <Options />
      <Products />
    </StyledWrapper>
  );
};
export default NewMetric;
