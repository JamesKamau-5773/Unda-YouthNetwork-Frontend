import { useEffect, useState } from 'react';

export function useMetrics() {
  // Use static demo data instead of backend API
  const [metrics, setMetrics] = useState({
    activeChampions: 12,
    referralConversionRate: 75.0,
    trainingComplianceRate: 90.0,
  });
  const [loading, setLoading] = useState(false);

  // No backend calls, just static data
  return { ...metrics, loading };
}
