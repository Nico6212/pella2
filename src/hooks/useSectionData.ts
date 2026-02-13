import { useState, useEffect } from 'react';

export function useSectionData<T>(endpoint: string, fallbackData: T): { data: T; loaded: boolean } {
  const [data, setData] = useState<T>(fallbackData);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch(`/api/${endpoint}`)
      .then(res => {
        if (!res.ok) throw new Error('API error');
        return res.json();
      })
      .then(json => {
        setData(json);
        setLoaded(true);
      })
      .catch(() => {
        setLoaded(true);
      });
  }, [endpoint]);

  return { data, loaded };
}
