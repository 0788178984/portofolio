window.AsmartAPI = {
  async post(endpoint, data) {
    const base = window.ASMART_CONFIG?.API_URL || '';
    const url = `${base}${endpoint}`;

    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const json = await res.json().catch(() => ({ success: false, error: 'Invalid server response' }));

    if (!res.ok) {
      throw new Error(json.error || `Request failed (${res.status})`);
    }

    return json;
  },

  async submitContact(data) {
    return this.post('/api/contact', data);
  },

  async submitServiceRequest(data) {
    return this.post('/api/service-request', data);
  },

  async checkHealth() {
    const base = window.ASMART_CONFIG?.API_URL || '';
    const res = await fetch(`${base}/api/health`, { method: 'GET' });
    return res.ok;
  },
};
