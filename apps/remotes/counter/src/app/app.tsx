import styled from '@emotion/styled';
import React, {useState} from 'react';
const StyledApp = styled.div`
  border: 1px solid blue;
  padding: 1em 1em;
  width: fit-content;
`;

export function App() {
  const [counter, setCounter] = useState(0);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCounter(counter + 1);
  }
  return (
    <React.Suspense fallback={null}>
    <StyledApp>
      <div>{counter}</div>
    This is a counter
      <button onClick={handleClick}>Click Me </button>
    </StyledApp>
    </React.Suspense >
  );
}

export default App;
