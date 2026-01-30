let inMemoryToken = null;

export function setAccessToken(token) {
  inMemoryToken = token || null;
  try {
    if (token) localStorage.setItem('unda_token', token);
    else localStorage.removeItem('unda_token');
  } catch (e) {
    // ignore storage errors
  }
}

export function getAccessToken() {
  if (inMemoryToken) return inMemoryToken;
  try {
    const t = localStorage.getItem('unda_token');
    if (t && t !== 'undefined' && t !== 'null') return t;
  } catch (e) {
    // ignore
  }
  return null;
}

export function clearAuth() {
  inMemoryToken = null;
  try {
    localStorage.removeItem('unda_token');
    localStorage.removeItem('unda_user');
  } catch (e) {}
}

export default { setAccessToken, getAccessToken, clearAuth };
