import styled from 'styled-components';

const Field = styled.div`
  background: ${(props) => (props.color ? props.color : 'orange')};
  border: 1px solid #ccc;
`;

export default Field;
