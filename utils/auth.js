export function saveToken(token) {
  if (typeof window !== 'undefined') localStorage.setItem('token', token);
}
export function getToken() {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
}
export function removeToken() {
  if (typeof window !== 'undefined') localStorage.removeItem('token');
}
export function authFetch(url, opts = {}) {
  const token = getToken();
  const headers = Object.assign({}, opts.headers || {}, token ? { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } : { 'Content-Type': 'application/json' });
  return fetch(url, Object.assign({}, opts, { headers }));
}
