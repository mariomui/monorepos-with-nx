import styled from '@emotion/styled';
import React from 'react'
import { Route, Routes, Link } from 'react-router-dom';
const Counter = React.lazy(() => import('remotes-counter/Module'))

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <React.Suspense fallback={null}>
      <StyledApp>
        <div role="navigation">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/page-2">Page 2</Link>
            </li>
          </ul>
        </div>
        <Counter />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                This is the generated root route.{' '}
                <Link to="/page-2">Click here for page 2.</Link>
              </div>
            }
          />
          <Route
            path="/page-2"
            element={
              <div>
                <Link to="/">Click here to go back to root page.</Link>
              </div>
            }
          />
        </Routes>
        {/* END: routes */}
      </StyledApp>
    </React.Suspense>
  );
}

export default App;
