import styled from '@emotion/styled';
import React, { useState } from 'react';
import { counterMfe } from '@bookspear/shared-mfe';
const StyledApp = styled.div`
  border: 1px solid blue;
  padding: 1em 1em;
  width: fit-content;
`;

export function App() {
  const [counter, setCounter] = useState(0);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCounter(counter + 1);
  };
  return (
    <React.Suspense fallback={"...loaidng counter"}>
      <StyledApp>
        <div>{counter}</div>
        UniDirectional Counter
        {counterMfe()}
        <button onClick={handleClick}>Click Me </button>
      </StyledApp>
    </React.Suspense>
  );
}

export default App
