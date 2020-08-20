import styled from 'styled-components';

const Matrix = styled.div`
  display: grid;
  margin: auto;
  grid-template-columns: repeat(${(props) => (props.cols || 6)}, 1fr);
  grid-auto-rows: ${(props) => `${ (props.height || 480) / ( props.rows || 12 ) }px`};
  width: ${(props) => `${ props.cols * (( props.height || 480) / ( props.rows || 12 )) }px` };
  filter: ${(props) => props.frozen ? 'blur(5px)' : 'initial' };
`;

export default Matrix;
