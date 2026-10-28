
import { useState, useEffect } from 'react';
import { StorageItem } from 'webext-storage';
import './App.css';

const enabledStorage = new StorageItem<boolean>('enabled', {
  defaultValue: true,
});

function App() {
  const [enabled, setEnabled] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let mounted = true;

    enabledStorage.get().then((value) => {
      if (mounted) {
        setEnabled(value ?? true);
        setLoaded(true);
      }
    });

    enabledStorage.onChanged((newValue) => {
      if (mounted) {
        setEnabled(newValue);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  const toggleEnabled = async () => {
    const next = !enabled;

    setEnabled(next);

    await enabledStorage.set(next);
  };

  if (!loaded) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <button onClick={toggleEnabled}>
        Blocker: {enabled ? 'ON' : 'OFF'}
      </button>

      <div>
        {enabled
          ? 'Shortcut blocking is enabled.'
          : 'Shortcut blocking is disabled.'}
      </div>
    </>
  );
}

export default App;
