const fetch = global.fetch || require('node-fetch');

const base = process.env.VITE_API_URL || 'http://127.0.0.1:5000';
const pollInterval = 10000; // 10s
const timeoutSeconds = parseInt(process.env.SMOKE_TIMEOUT || '60', 10); // total timeout

(async function main(){
  console.log('API Base:', base);

  const username = `smoke_${Date.now()}`;
  const password = 'TestPass123!';
  const phone = '+2547' + String(Math.floor(Math.random() * 90000000) + 10000000);
  const full_name = 'Smoke Poll User';

  // Register member
  const registerPayload = { full_name, username, phone_number: phone, password };
  console.log('\n--- REGISTER MEMBER ---');
  let registrationId = null;
  try {
    const r = await fetch(`${base}/api/auth/register`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(registerPayload)
    });
    const txt = await r.text();
    let body; try { body = JSON.parse(txt); } catch { body = { raw: txt }; }
    console.log('Status:', r.status, 'Body:', body);
    registrationId = body.registration_id || body.registrationId || (body.data && body.data.registration_id);
  } catch (err) {
    console.error('Register failed:', err.message || err);
    return process.exit(1);
  }

  // Try champion registration to see if endpoint is healthy
  console.log('\n--- CHAMPION SELF-REGISTER CHECK ---');
  try {
    const champPayload = { fullName: full_name, dob: '2000-01-01', gender: 'Other', phone, consent_obtained: true };
    const cr = await fetch(`${base}/api/champions/register`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(champPayload) });
    const crTxt = await cr.text();
    let crBody; try { crBody = JSON.parse(crTxt); } catch { crBody = { raw: crTxt }; }
    console.log('Status:', cr.status, 'Body:', crBody);
  } catch (err) {
    console.error('Champion endpoint check failed:', err.message || err);
  }

  if (!registrationId) {
    console.log('No registration ID returned. Aborting poll.');
    return;
  }

  // Poll registration status until approved or timeout
  console.log(`\n--- POLL REGISTRATION STATUS (ID: ${registrationId}) for up to ${timeoutSeconds}s ---`);
  const deadline = Date.now() + (timeoutSeconds * 1000);
  let approved = false;
  while (Date.now() < deadline) {
    try {
      const s = await fetch(`${base}/api/auth/registration/${registrationId}`);
      const sTxt = await s.text();
      let sBody; try { sBody = JSON.parse(sTxt); } catch { sBody = { raw: sTxt }; }
      console.log('Poll status:', s.status, sBody.status || sBody.state || sBody.approved || sBody);
      const status = (sBody.status || sBody.state || (sBody.approved ? 'Approved' : '') || '').toString().toLowerCase();
      if (status === 'approved') { approved = true; break; }
    } catch (err) {
      console.error('Poll error:', err.message || err);
    }
    await new Promise(r => setTimeout(r, pollInterval));
  }

  if (!approved) {
    console.log('\nNot approved within timeout. Ending test.');
    return;
  }

  console.log('\n--- APPROVED: ATTEMPT LOGIN ---');
  try {
    const loginResp = await fetch(`${base}/api/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, password }) });
    const loginTxt = await loginResp.text(); let loginBody; try { loginBody = JSON.parse(loginTxt); } catch { loginBody = { raw: loginTxt }; }
    console.log('Login status:', loginResp.status, loginBody);
    const token = loginBody.access_token || loginBody.token || (loginBody.data && loginBody.data.access_token);
    if (token) {
      const me = await fetch(`${base}/api/members/me`, { headers: { Authorization: `Bearer ${token}` } });
      const meTxt = await me.text(); let meBody; try { meBody = JSON.parse(meTxt); } catch { meBody = { raw: meTxt }; }
      console.log('Profile fetch status:', me.status, meBody);
    }
  } catch (err) {
    console.error('Login after approval failed:', err.message || err);
  }

})();
