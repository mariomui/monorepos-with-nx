import styled from '@emotion/styled';
import NxWelcome from './nx-welcome';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  
  return (
    <StyledApp>
      <div>{counter}</div>
      <button onClick={handleClick} />
    </StyledApp>
  );
}

export default App;
