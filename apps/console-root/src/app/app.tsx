import styled from '@emotion/styled';
import { Suspense, lazy } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import ErrorBoundary from '../ErrorBoundary';
import { sharedMfe } from '@bookspear/shared-mfe';
const Counter = lazy(() => import('counter/App'));

const StyledApp = styled.div`
  // Your style here
`;

let self;
if (typeof window !== undefined) {
  self = window;
} else {
  self = global;
}
self.$RefreshReg$ = () => ({});
self.$RefreshReg$ = () => () => ({});

export function App() {
  return (
    <Suspense fallback={null}>
      <StyledApp>
        <div role="navigation">
          <ul>
            <li>
              <Link to="/">Hodmdedd</Link>
              {sharedMfe()}
            </li>
            <li>
              <Link to="/page-2">Page 21</Link>
            </li>
          </ul>
        </div>
        <ErrorBoundary>

          <Counter />
        </ErrorBoundary>
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
    </Suspense>
  );
}

export default App;
