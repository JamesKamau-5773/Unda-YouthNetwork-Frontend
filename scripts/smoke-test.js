const fetch = global.fetch || require('node-fetch');

async function sleep(ms){ return new Promise(r => setTimeout(r, ms)); }

(async function main(){
  const base = process.env.VITE_API_URL || 'http://127.0.0.1:5000';
  const envUsername = process.env.SMOKE_USERNAME || process.env.VITE_SMOKE_USERNAME || null;
  const envPassword = process.env.SMOKE_PASSWORD || process.env.VITE_SMOKE_PASSWORD || null;
  const pollAttempts = parseInt(process.env.SMOKE_POLL_ATTEMPTS || '5');
  const pollInterval = parseInt(process.env.SMOKE_POLL_INTERVAL_MS || '2000');
  console.log('API Base:', base);

  const username = `smoke_${Date.now()}`;
  const password = 'TestPass123!';
  const phone = '+2547' + String(Math.floor(Math.random() * 90000000) + 10000000);
  const full_name = 'Smoke Test User';

  // 1) Register
  const registerPayload = {
    full_name,
    username,
    phone_number: phone,
    password,
  };
  console.log('\n--- REGISTER ---');
  try {
    const r = await fetch(`${base}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registerPayload),
    });
    const txt = await r.text();
    let body;
    try { body = JSON.parse(txt); } catch { body = { raw: txt }; }
    console.log('Status:', r.status);
    console.log('Body:', body);

    const regId = body.registration_id || body.registrationId || (body.data && body.data.registration_id);

    // 2) Poll registration status (if we have id)
    let lastStatus = null;
    if (regId) {
      console.log('\n--- CHECK REGISTRATION STATUS (poll) ---');
      try {
        for (let i = 0; i < pollAttempts; i++) {
          const s = await fetch(`${base}/api/auth/registration/${regId}`);
          const sTxt = await s.text();
          let sBody;
          try { sBody = JSON.parse(sTxt); } catch { sBody = { raw: sTxt }; }
          console.log('Attempt', i + 1, 'Status:', s.status);
          console.log('Body:', sBody);
          lastStatus = sBody.status || sBody.data?.status || sBody.state || lastStatus;
          if (lastStatus && ['Approved', 'Active', 'Rejected'].includes(lastStatus)) break;
          if (i < pollAttempts - 1) await sleep(pollInterval);
        }
      } catch (err) {
        console.error('Status check failed:', err.message || err);
      }
    }

    // 3) Attempt login (may fail if registration pending)
    console.log('\n--- ATTEMPT LOGIN ---');
    try {
      // Allow using an existing test account via env vars. If provided, use those credentials
      const useUsername = envUsername || username;
      const usePassword = envPassword || password;

      // If registration appears to still be pending and no explicit test credentials provided,
      // skip attempting login to avoid predictable 401s.
      if (!envUsername && lastStatus && String(lastStatus).toLowerCase().includes('pending')) {
        console.log('\nRegistration still pending and no test credentials provided — skipping login.');
      } else {
        const loginResp = await fetch(`${base}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: useUsername, password: usePassword })
        });
        const loginTxt = await loginResp.text();
        let loginBody;
        try { loginBody = JSON.parse(loginTxt); } catch { loginBody = { raw: loginTxt }; }
        console.log('Status:', loginResp.status);
        console.log('Body:', loginBody);

        const token = loginBody.access_token || loginBody.token || loginBody.data?.access_token;
        if (token) {
          console.log('\n--- FETCH PROFILE WITH TOKEN ---');
          try {
            const me = await fetch(`${base}/api/members/me`, { headers: { Authorization: `Bearer ${token}` } });
            const meTxt = await me.text();
            let meBody;
            try { meBody = JSON.parse(meTxt); } catch { meBody = { raw: meTxt }; }
            console.log('Status:', me.status);
            console.log('Body:', meBody);
          } catch (err) {
            console.error('Profile fetch failed:', err.message || err);
          }
        }
      }

    } catch (err) {
      console.error('Login attempt failed:', err.message || err);
    }

  } catch (err) {
    console.error('Register request failed:', err.message || err);
  }

  console.log('\n--- SMOKE TEST DONE ---');
})();
