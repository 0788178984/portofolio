window.ASMART_CONFIG = {
  API_URL: (function () {
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      return 'http://localhost:3000';
    }
    return 'https://asmart-platform-api.onrender.com';
  })(),
  WHATSAPP: '256779654710',
  EMAIL: 'asiimwelucky34@gmail.com',
  SITE_NAME: 'Asmart Tech Platform',
  TAGLINE: 'Tech Services Across All Uganda',
  SERVICE_AREAS: 'Kampala, Entebbe, Jinja, Mbarara, Gulu, Fort Portal, Hoima, Masaka, Mbale, Kagadi & all Uganda',
};
