const fetch = global.fetch || require('node-fetch');

(async function main(){
  const base = process.env.VITE_API_URL || 'http://127.0.0.1:5000';
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

    // 2) Poll registration status once (if we have id)
    if (regId) {
      console.log('\n--- CHECK REGISTRATION STATUS ---');
      try {
        const s = await fetch(`${base}/api/auth/registration/${regId}`);
        const sTxt = await s.text();
        let sBody;
        try { sBody = JSON.parse(sTxt); } catch { sBody = { raw: sTxt }; }
        console.log('Status:', s.status);
        console.log('Body:', sBody);
      } catch (err) {
        console.error('Status check failed:', err.message || err);
      }
    }

    // 3) Attempt login (may fail if registration pending)
    console.log('\n--- ATTEMPT LOGIN ---');
    try {
      const loginResp = await fetch(`${base}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
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

    } catch (err) {
      console.error('Login attempt failed:', err.message || err);
    }

  } catch (err) {
    console.error('Register request failed:', err.message || err);
  }

  console.log('\n--- SMOKE TEST DONE ---');
})();
