import styled from '@emotion/styled';
import {Suspense, lazy} from 'react'
import { Route, Routes, Link } from 'react-router-dom';
const Counter = lazy(() => import('remotes-counter/Module'))

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
              <Link to="/">Homed</Link>
            </li>
            <li>
              <Link to="/page-2">Page 21</Link>
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
    </Suspense>
  );
}

export default App;
