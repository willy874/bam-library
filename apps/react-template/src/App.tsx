import { useEffect } from 'react';
import { globalServices } from './shared/services';
import { Registry } from './shared/utils/Registry';

export default function App() {
  useEffect(() => {
    const registry = new Registry();
    return globalServices.init(registry);
  }, []);
  return (
    <div>
      <h1>React Template</h1>
    </div>
  );
}
