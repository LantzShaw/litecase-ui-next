import { useState } from 'react';

import { Button } from '../../dist/es';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Button>Click Me</Button>
    </div>
  );
}

export default App;
