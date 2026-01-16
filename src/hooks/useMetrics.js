import { useState } from 'react';

export function useMetrics() {
  // Production-ready default (no seeded demo data)
  const [metrics] = useState({
    activeChampions: 0,
    referralConversionRate: 0,
    trainingComplianceRate: 0,
  });
  const [loading] = useState(false);

  return { ...metrics, loading };
}
