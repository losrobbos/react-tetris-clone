import styled from 'styled-components';

const Matrix = styled.div`
  display: grid;
  width: 240px;
  margin: auto;
  grid-template-columns: repeat(${(props) => (props.cols ? props.cols : 6)}, 1fr);
  filter: ${(props) => (props.frozen ? 'blur(5px)' : 'initial')};

  .field {
    height: ${(props) => `${40}px`};
  }
`;

export default Matrix;
