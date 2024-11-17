import { useState, useEffect } from 'react';
import { BusinessType } from '../types/business';
import { loadServiceTemplate } from '../templates/service-loader';

export const useServiceTemplate = (type: BusinessType) => {
  const [template, setTemplate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let mounted = true;

    const loadTemplate = async () => {
      try {
        setLoading(true);
        setError(null);
        const loadedTemplate = await loadServiceTemplate(type);
        if (mounted) {
          setTemplate(loadedTemplate);
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Failed to load template'));
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadTemplate();

    return () => {
      mounted = false;
    };
  }, [type]);

  return { template, loading, error };
};
