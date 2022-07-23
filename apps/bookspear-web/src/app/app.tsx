import React, { useEffect, useState } from 'react';
import { Message } from '@bookspear/api-interfaces';

export const App = () => {
  const [m, setMessage] = useState<Message>({ message: '' });

  useEffect(() => {
    fetch('/api')
      .then((r) => r.json())
      .then(setMessage);
  }, []);

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <h1>Welcome to bookspear-web!</h1>
      </div>
      <div>{m.message}</div>
    </>
  );
};

export default App;
