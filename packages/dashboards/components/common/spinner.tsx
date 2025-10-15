import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.div`
  display: inline-block;
  width: 15px;
  height: 15px;
  border: 2px solid #fff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
`;

export default function Spinner() {
  return <StyledSpinner />;
}
