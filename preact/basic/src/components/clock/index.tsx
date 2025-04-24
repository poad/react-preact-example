import { useState, useEffect } from 'preact/hooks';

export function Clock() {
  const [time, setTime] = useState<string>();
  useEffect(() => {
    const timeoutId = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 500);
    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return <span>{time}</span>;
}
