#!/usr/bin/env node
/* global process */
// Quick check script: attempts /api/auth/register then falls back to /auth/register
// Usage: BASE=https://api.undayouth.org node scripts/check-register.js

(async function () {
  const base = process.env.BASE || 'https://api.undayouth.org';
  const payload = {
    full_name: 'Test User',
    email: 'test+debug@example.com',
    username: 'testdebug',
    phone_number: '+254712345678',
    password: 'Abcd1234!'
  };

  const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };

  try {
    console.log('POST', `${base}/api/auth/register`);
    let res = await fetch(`${base}/api/auth/register`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });

    const text = await res.text();
    console.log('/api/auth/register ->', res.status, res.headers.get('content-type'));
    console.log(text.slice(0, 1000));

    if (!res.ok && (res.headers.get('content-type') || '').includes('text/html')) {
      console.log('Primary returned HTML; retrying fallback /auth/register');
      res = await fetch(`${base}/auth/register`, { method: 'POST', headers, body: JSON.stringify(payload) });
      const body2 = await res.text();
      console.log('/auth/register ->', res.status, res.headers.get('content-type'));
      console.log(body2.slice(0, 1000));
    }

  } catch (err) {
    console.error('Error during check:', err);
    process.exit(1);
  }
})();
