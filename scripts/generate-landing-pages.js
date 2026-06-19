/**
 * Generates SEO landing pages from services-data searchGuides.
 * Run: node scripts/generate-landing-pages.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

const LANDING_CONTENT = {
  'web-designer-uganda': {
    h1: 'Web Designer in Uganda',
    subtitle: 'Professional websites for schools, clinics, restaurants, shops, and startups',
    problem: 'Many Uganda businesses lose customers because they have no website or an outdated one that does not show on Google.',
    solution: 'Asmart builds modern, mobile-friendly websites with SEO, WhatsApp chat, and fast loading — tailored for the Uganda market.',
    features: ['Responsive multi-page design', 'SEO & Google Search Console setup', 'WhatsApp & contact integration', 'Blog and gallery sections', 'Price on negotiation'],
    related: ['school-website-uganda', 'clinic-website-uganda', 'seo-small-business-uganda'],
  },
  'app-developer-uganda': {
    h1: 'App Developer in Uganda',
    subtitle: 'Android apps for business, ecommerce, education, and media',
    problem: 'Businesses need mobile apps to reach customers, but finding a reliable local developer is hard.',
    solution: 'We build cross-platform Android apps with React Native and Expo — clean UX, Firebase backend, and Play Store publishing support.',
    features: ['React Native & Expo', 'Firebase & API integration', 'Play Store publishing', 'Ongoing updates & support', 'Price on negotiation'],
    related: ['web-designer-uganda', 'tech-consulting-uganda'],
  },
  'tech-consulting-uganda': {
    h1: 'Tech Consulting in Uganda',
    subtitle: 'Choose the right devices, software, and internet plans',
    problem: 'Individuals and businesses waste money buying wrong laptops, phones, or internet plans.',
    solution: 'Get expert advice on the best devices, software, and connectivity for your budget and needs — per session or hourly.',
    features: ['Device recommendations', 'Software selection', 'Internet plan comparison', 'Business tech strategy', 'Price on negotiation'],
    related: ['software-installation-uganda', 'wifi-setup-uganda', 'email-setup'],
  },
  'computer-repair-kagadi': {
    h1: 'Computer & Phone Repair in Kagadi',
    subtitle: 'Screen replacements, software flashing, and hardware fixes',
    problem: 'Broken phone screens and slow laptops stop people from working and communicating.',
    solution: 'Fast, affordable phone and computer repair in Kagadi — screens, batteries, software flashing, and virus removal.',
    features: ['Screen & battery replacement', 'Software flashing', 'Virus removal', 'Hardware diagnostics', 'Price on negotiation'],
    related: ['data-recovery-uganda', 'software-installation-uganda'],
  },
  'cctv-installation-uganda': {
    h1: 'CCTV Installation in Uganda',
    subtitle: 'Home and office security cameras with remote viewing',
    problem: 'Homes and businesses need security but lack professional camera installation.',
    solution: 'We install CCTV systems with DVR/NVR setup and mobile app viewing for homes, shops, and offices across Uganda.',
    features: ['Indoor & outdoor cameras', 'DVR/NVR configuration', 'Mobile remote viewing', 'Maintenance support', 'Price on negotiation'],
    related: ['wifi-setup-uganda', 'tech-consulting-uganda'],
  },
  'wifi-setup-uganda': {
    h1: 'WiFi & Network Setup in Uganda',
    subtitle: 'Routers, extenders, and small office networks',
    problem: 'Poor WiFi and network setup causes slow internet and dropped connections at home and office.',
    solution: 'Professional router configuration, WiFi extenders, and office network setup for reliable connectivity.',
    features: ['Router & modem setup', 'WiFi range extenders', 'Small office networks', 'Troubleshooting & support', 'Price on negotiation'],
    related: ['cctv-installation-uganda', 'tech-consulting-uganda'],
  },
  'cv-typing-services-uganda': {
    h1: 'CV & Document Typing in Uganda',
    subtitle: 'Professional CVs, letters, and form typing',
    problem: 'Job seekers and students need professionally typed documents but lack access or skills.',
    solution: 'We type CVs, cover letters, application forms, and official documents — formatted and ready to print or email.',
    features: ['Professional CV formatting', 'Cover letters', 'Application forms', 'Printing available', 'Price on negotiation'],
    related: ['graphic-design-uganda', 'printing'],
  },
  'graphic-design-uganda': {
    h1: 'Graphic Design in Uganda',
    subtitle: 'Logos, flyers, posters, and social media graphics',
    problem: 'Businesses need professional branding but cannot afford expensive design agencies.',
    solution: 'Quality logos, flyers, posters, and social media kits using Canva and Adobe — fast turnaround for Uganda businesses.',
    features: ['Logo design', 'Flyers & posters', 'Social media graphics', 'Brand identity kits', 'Price on negotiation'],
    related: ['social-media-management-uganda', 'web-designer-uganda'],
  },
  'social-media-management-uganda': {
    h1: 'Social Media Management in Uganda',
    subtitle: 'Facebook, Instagram, and TikTok for local businesses',
    problem: 'Local businesses know they need social media but lack time or skills to manage pages.',
    solution: 'We run your Facebook, Instagram, and TikTok — content posting, engagement, and page growth on monthly retainer.',
    features: ['Content creation & posting', 'Page setup & optimization', 'Engagement management', 'Monthly reporting', 'Price on negotiation'],
    related: ['graphic-design-uganda', 'web-designer-uganda'],
  },
  'seo-small-business-uganda': {
    h1: 'SEO for Small Business in Uganda',
    subtitle: 'Rank on Google in Kampala, Kagadi, and across Uganda',
    problem: 'Small businesses are invisible on Google while competitors get all the online customers.',
    solution: 'Technical SEO, keyword targeting, and conversion content that attracts customers searching your service locally.',
    features: ['Keyword research', 'On-page SEO', 'Google Search Console', 'Local SEO for Uganda', 'Price on negotiation'],
    related: ['web-designer-uganda', 'social-media-management-uganda'],
  },
  'software-installation-uganda': {
    h1: 'Software Installation in Uganda',
    subtitle: 'Windows, antivirus, MS Office, and essential software',
    problem: 'New laptops and PCs need proper software setup but users struggle with installation.',
    solution: 'We install Windows, antivirus, MS Office, drivers, and essential software on laptops and desktops.',
    features: ['Windows installation', 'Antivirus setup', 'MS Office & productivity tools', 'Driver updates', 'Price on negotiation'],
    related: ['computer-repair-kagadi', 'tech-consulting-uganda'],
  },
  'data-recovery-uganda': {
    h1: 'Data Recovery in Uganda',
    subtitle: 'Recover lost files from phones, laptops, and storage devices',
    problem: 'Lost photos, documents, and files from formatted drives or broken phones cause panic and loss.',
    solution: 'Professional data recovery from phones, laptops, USB drives, and memory cards — confidential and careful.',
    features: ['Phone data recovery', 'Hard drive recovery', 'Formatted drive recovery', 'Corrupted file repair', 'Price on negotiation'],
    related: ['computer-repair-kagadi', 'software-installation-uganda'],
  },
  'website-cost-uganda': {
    h1: 'How Much Is a Website in Uganda?',
    subtitle: 'Understanding website pricing — every project quoted on negotiation',
    problem: 'Business owners want a website but do not know what it should cost or what they are paying for.',
    solution: 'Website cost depends on pages, design quality, features, and integrations. We quote every project individually based on your goals and budget — no hidden fees.',
    features: ['Free consultation & quote', 'Transparent scope discussion', 'Flexible payment options', 'Packages for every budget', 'Price on negotiation'],
    related: ['web-designer-uganda', 'school-website-uganda', 'clinic-website-uganda'],
  },
};

function buildPage(slug, data) {
  const title = data.h1 + ' | Asmart Tech Platform Uganda';
  const canonical = `https://asmartdev.netlify.app/${slug}`;
  const relatedLinks = (data.related || [])
    .map((r) => `<li><a href="${r}">${r.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</a></li>`)
    .join('\n                            ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${data.subtitle}. Asmart Tech Platform — Kagadi, Uganda. Price on negotiation.">
    <meta name="keywords" content="${slug.replace(/-/g, ', ')}, Uganda, Kagadi, Asmart">
    <link rel="canonical" href="${canonical}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
    <link rel="icon" type="image/x-icon" href="Assets/favicon.ico.png">
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"Service","name":"${data.h1}","description":"${data.subtitle}","provider":{"@type":"LocalBusiness","name":"Asmart Uganda","address":{"@type":"PostalAddress","addressLocality":"Kagadi","addressCountry":"Uganda"},"telephone":"+256779654710","url":"https://asmartdev.netlify.app"}}
    </script>
</head>
<body class="platform-page landing-page">
    <header class="navbar">
        <nav class="nav-container">
            <div class="nav-logo"><a href="index.html" class="logo-link"><span class="logo-text">Asmart<span class="logo-accent">.tech</span></span></a></div>
            <div class="nav-menu" id="nav-menu">
                <ul class="nav-list">
                    <li class="nav-item"><a href="index.html" class="nav-link">Home</a></li>
                    <li class="nav-item"><a href="services.html" class="nav-link">Services</a></li>
                    <li class="nav-item"><a href="guides.html" class="nav-link">Guides</a></li>
                    <li class="nav-item"><a href="request.html" class="nav-link">Request</a></li>
                    <li class="nav-item"><a href="contact.html" class="nav-link">Contact</a></li>
                </ul>
            </div>
            <div class="hamburger" id="hamburger"><span class="bar"></span><span class="bar"></span><span class="bar"></span></div>
        </nav>
    </header>
    <main class="page-main landing-main">
        <section class="page-hero">
            <div class="container">
                <p class="page-hero-label"><i class="fas fa-map-marker-alt"></i> Kagadi · Uganda</p>
                <h1 class="page-hero-title">${data.h1}</h1>
                <p class="page-hero-desc">${data.subtitle}</p>
                <div class="negotiation-badge inline-badge"><i class="fas fa-handshake"></i> All pricing on negotiation</div>
                <div class="hero-buttons">
                    <a href="request.html?service=${slug}" class="btn btn-primary"><i class="fas fa-paper-plane"></i> Request Quote</a>
                    <a href="https://wa.me/256779654710?text=${encodeURIComponent('Hi Asmart, I need: ' + data.h1)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary"><i class="fab fa-whatsapp"></i> WhatsApp Now</a>
                </div>
            </div>
        </section>
        <section class="landing-content container">
            <article class="seo-card landing-block">
                <h2>The Problem</h2>
                <p>${data.problem}</p>
            </article>
            <article class="seo-card landing-block">
                <h2>Our Solution</h2>
                <p>${data.solution}</p>
            </article>
            <article class="pricing-card landing-features">
                <p class="pricing-label">What's Included</p>
                <h2 class="pricing-title">${data.h1}</h2>
                <ul class="pricing-features">
                    ${data.features.map((f) => `<li><i class="fas fa-check"></i> ${f}</li>`).join('\n                    ')}
                </ul>
                <a href="request.html?service=${slug}" class="btn btn-primary">Get Started — Price on Negotiation</a>
            </article>
            ${relatedLinks ? `<article class="seo-card landing-block"><h2>Related Services</h2><ul class="related-links">${relatedLinks}</ul></article>` : ''}
        </section>
    </main>
    <footer class="footer"><div class="container"><div class="footer-bottom"><p class="footer-copyright">© 2026 <strong>Asmart Uganda</strong> · <a href="guides.html">All Search Guides</a> · <a href="services.html">All Services</a></p></div></div></footer>
    <a href="https://wa.me/256779654710" target="_blank" class="whatsapp-float"><i class="fab fa-whatsapp"></i></a>
    <script src="js/shared-ui.js"></script>
    <script src="script.js"></script>
</body>
</html>`;
}

Object.entries(LANDING_CONTENT).forEach(([slug, data]) => {
  const file = path.join(ROOT, `${slug}.html`);
  fs.writeFileSync(file, buildPage(slug, data));
  console.log('Generated:', slug + '.html');
});

console.log('Done —', Object.keys(LANDING_CONTENT).length, 'landing pages');
