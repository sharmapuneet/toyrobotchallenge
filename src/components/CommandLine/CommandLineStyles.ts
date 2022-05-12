import styled from 'styled-components';

// Styled component for the input container.
const CommandLineStyled = styled.div`
  margin: 0 auto;
  width: 273px;
`;

// Styled component for the input label.
const CommandLineLabelStyled = styled.label`
  display: block;
  margin-bottom: 10px;
`;

// Styled component for the input field.
const CommandLineInputStyled = styled.input`
  border: 1px solid grey;
  font-size: 1rem;
  padding: 10px 10px;
  width: 200px;
  &:focus {
    outline: 1px solid green;
    border-radius: 3px;
  };
`;

// Styled component for the submit button.
const CommandLineButtonStyled = styled.button`
  background: green;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1rem;
  padding: 11px 25px;
`;

// Styled component for the error message.
const CommandLineErrorStyled = styled.p`
  color: red;
`;

export {
  CommandLineButtonStyled,
  CommandLineErrorStyled,
  CommandLineInputStyled,
  CommandLineLabelStyled,
  CommandLineStyled,
};
