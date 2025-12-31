import { useEffect, useState } from 'react';
import api from '../services/apiService';

export function useMetrics() {
  const [metrics, setMetrics] = useState({
    activeChampions: 0,
    referralConversionRate: 0,
    trainingComplianceRate: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMetrics() {
      try {
        // Fetch all champions
        const championsRes = await api.get('/api/champions');
        const champions = championsRes.data || [];
        const activeChampions = champions.filter(c => c.champion_status === 'Active').length;

        // Fetch all referrals
        const referralsRes = await api.get('/api/referrals');
        const referrals = referralsRes.data || [];
        const totalReferred = referrals.length;
        const attended = referrals.filter(r => r.status === 'Attended').length;
        const referralConversionRate = totalReferred ? (attended / totalReferred) * 100 : 0;

        // Training compliance
        const certified = champions.filter(c => c.training_status === 'Certified').length;
        const refresherRequired = champions.filter(c => c.training_status === 'Refresher Required').length;
        const totalTrained = certified + refresherRequired;
        const trainingComplianceRate = totalTrained ? (certified / totalTrained) * 100 : 0;

        setMetrics({
          activeChampions,
          referralConversionRate,
          trainingComplianceRate,
        });
      } catch (err) {
        setMetrics({
          activeChampions: 0,
          referralConversionRate: 0,
          trainingComplianceRate: 0,
        });
      } finally {
        setLoading(false);
      }
    }
    fetchMetrics();
  }, []);

  return { ...metrics, loading };
}
