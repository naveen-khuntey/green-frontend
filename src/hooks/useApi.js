import { useState } from 'react';
import * as api from '@/lib/api';

export function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function call(fn, ...args) {
    setLoading(true);
    setError(null);
    try {
      const result = await fn(...args);
      setLoading(false);
      return result;
    } catch (e) {
      setError(e);
      setLoading(false);
      throw e;
    }
  }

  return { loading, error, call };
}
