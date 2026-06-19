/**
 * Generates SEO landing pages — Uganda-wide targeting (HQ Kagadi, serves all Uganda).
 * Run: node scripts/generate-landing-pages.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SITE = 'https://asmartdev.netlify.app';
const AREAS =
  'Kampala, Entebbe, Jinja, Mbarara, Gulu, Fort Portal, Hoima, Masaka, Mbale, Kagadi & all Uganda';

const LANDING_CONTENT = {
  'web-designer-uganda': {
    h1: 'Web Designer in Uganda',
    subtitle: 'Professional websites for schools, clinics, shops, restaurants & startups nationwide',
    problem: 'Many Uganda businesses lose customers because they have no website or an outdated one that does not show on Google.',
    solution: `Asmart builds modern, mobile-friendly websites with SEO and WhatsApp chat — for clients in ${AREAS}.`,
    features: ['Responsive multi-page design', 'SEO & Google Search Console', 'WhatsApp integration', 'Blog & gallery', 'Price on negotiation'],
    keywords: 'web designer Uganda, website design Uganda, web developer Kampala, Asmart',
    related: ['school-website-uganda', 'clinic-website-uganda', 'seo-small-business-uganda'],
  },
  'app-developer-uganda': {
    h1: 'App Developer in Uganda',
    subtitle: 'Android apps for business, ecommerce, education & media — nationwide',
    problem: 'Businesses need mobile apps to reach customers, but finding a reliable Uganda developer is hard.',
    solution: 'We build Android apps with React Native and Expo — clean UX, Firebase backend, Play Store support — anywhere in Uganda.',
    features: ['React Native & Expo', 'Firebase & APIs', 'Play Store publishing', 'Updates & support', 'Price on negotiation'],
    keywords: 'app developer Uganda, Android developer Uganda, mobile app Kampala, Asmart',
    related: ['web-designer-uganda', 'tech-consulting-uganda'],
  },
  'tech-consulting-uganda': {
    h1: 'Tech Consulting in Uganda',
    subtitle: 'Choose the right devices, software & internet plans — remote or on-site',
    problem: 'Individuals and businesses waste money on wrong laptops, phones, or internet plans.',
    solution: `Expert tech advice for your budget — serving ${AREAS}. Per session or hourly.`,
    features: ['Device recommendations', 'Software selection', 'Internet plan advice', 'Business tech strategy', 'Price on negotiation'],
    keywords: 'tech consulting Uganda, IT consultant Uganda, computer advice Kampala, Asmart',
    related: ['software-installation-uganda', 'wifi-setup-uganda'],
  },
  'computer-phone-repair-uganda': {
    h1: 'Phone & Computer Repair Uganda',
    subtitle: 'Screen repair, software flashing & hardware fixes — nationwide service',
    problem: 'Broken phones and slow laptops stop people working — repair shops are hard to find outside major towns.',
    solution: `Asmart offers phone and computer repair with remote support and on-site service in ${AREAS}.`,
    features: ['Screen & battery repair', 'Software flashing', 'Virus removal', 'Diagnostics', 'Price on negotiation'],
    keywords: 'phone repair Uganda, computer repair Uganda, mobile repair Kampala, laptop repair Uganda, Asmart',
    related: ['data-recovery-uganda', 'software-installation-uganda'],
  },
  'cctv-installation-uganda': {
    h1: 'CCTV Installation in Uganda',
    subtitle: 'Home & office security cameras with remote viewing — all regions',
    problem: 'Homes and businesses need security but lack professional camera installation.',
    solution: `CCTV installation with DVR/NVR and mobile viewing for homes, shops & offices in ${AREAS}.`,
    features: ['Indoor & outdoor cameras', 'DVR/NVR setup', 'Mobile remote viewing', 'Maintenance', 'Price on negotiation'],
    keywords: 'CCTV installation Uganda, security cameras Uganda, CCTV Kampala, camera installer Uganda, Asmart',
    related: ['wifi-setup-uganda', 'tech-consulting-uganda'],
  },
  'wifi-setup-uganda': {
    h1: 'WiFi & Network Setup in Uganda',
    subtitle: 'Routers, extenders & office networks — home and business',
    problem: 'Poor WiFi causes slow internet and dropped connections at home and in offices.',
    solution: `Professional router setup, WiFi extenders & office networks across ${AREAS}.`,
    features: ['Router configuration', 'WiFi extenders', 'Office networks', 'Troubleshooting', 'Price on negotiation'],
    keywords: 'WiFi setup Uganda, network installation Uganda, router setup Kampala, internet setup Uganda, Asmart',
    related: ['cctv-installation-uganda', 'tech-consulting-uganda'],
  },
  'printing-services-uganda': {
    h1: 'Printing & Photocopying Services Uganda',
    subtitle: 'Documents, IDs, forms & photos — print and photocopy nationwide',
    problem: 'People need fast, quality printing and photocopying for job applications, school, and business.',
    solution: `Professional printing and photocopying in Kagadi with delivery and remote document support for clients across ${AREAS}.`,
    features: ['Document printing', 'Photocopying', 'ID & passport photos', 'Binding & lamination', 'Price on negotiation'],
    keywords: 'printing services Uganda, photocopy Uganda, print shop Kampala, document printing Uganda, Asmart',
    related: ['cv-typing-services-uganda', 'graphic-design-uganda'],
  },
  'cv-typing-services-uganda': {
    h1: 'CV & Document Typing in Uganda',
    subtitle: 'Professional CVs, letters & forms — email delivery nationwide',
    problem: 'Job seekers need professionally typed CVs and application documents.',
    solution: `CV typing, cover letters & official documents — send by email or WhatsApp anywhere in Uganda.`,
    features: ['Professional CVs', 'Cover letters', 'Application forms', 'Printing available', 'Price on negotiation'],
    keywords: 'CV typing Uganda, document typing Uganda, resume writing Kampala, typing services Uganda, Asmart',
    related: ['printing-services-uganda', 'graphic-design-uganda'],
  },
  'graphic-design-uganda': {
    h1: 'Graphic Design in Uganda',
    subtitle: 'Logos, flyers, posters & social media graphics',
    problem: 'Businesses need professional branding at affordable prices.',
    solution: 'Logos, flyers, posters & social media kits — fast turnaround for Uganda businesses nationwide.',
    features: ['Logo design', 'Flyers & posters', 'Social media kits', 'Brand identity', 'Price on negotiation'],
    keywords: 'graphic design Uganda, logo design Uganda, flyer design Kampala, Asmart',
    related: ['social-media-management-uganda', 'web-designer-uganda'],
  },
  'social-media-management-uganda': {
    h1: 'Social Media Management in Uganda',
    subtitle: 'Facebook, Instagram & TikTok for businesses nationwide',
    problem: 'Businesses need social media but lack time or skills to manage pages.',
    solution: 'We run Facebook, Instagram & TikTok — content, engagement & growth for Uganda businesses.',
    features: ['Content posting', 'Page setup', 'Engagement', 'Monthly reporting', 'Price on negotiation'],
    keywords: 'social media management Uganda, Facebook page manager Uganda, Instagram marketing Kampala, Asmart',
    related: ['graphic-design-uganda', 'web-designer-uganda'],
  },
  'seo-small-business-uganda': {
    h1: 'SEO for Small Business in Uganda',
    subtitle: 'Rank on Google in Kampala, upcountry towns & across Uganda',
    problem: 'Small businesses are invisible on Google while competitors get online customers.',
    solution: `Technical SEO, keywords & content so customers find you in ${AREAS}.`,
    features: ['Keyword research', 'On-page SEO', 'Search Console', 'Local & national SEO', 'Price on negotiation'],
    keywords: 'SEO Uganda, Google ranking Uganda, SEO services Kampala, small business SEO Uganda, Asmart',
    related: ['web-designer-uganda', 'social-media-management-uganda'],
  },
  'software-installation-uganda': {
    h1: 'Software Installation in Uganda',
    subtitle: 'Windows, antivirus, MS Office & essential software',
    problem: 'New laptops need proper software setup but users struggle with installation.',
    solution: `Windows, antivirus, MS Office & drivers — on-site or guided remote setup in ${AREAS}.`,
    features: ['Windows install', 'Antivirus', 'MS Office', 'Driver updates', 'Price on negotiation'],
    keywords: 'software installation Uganda, Windows install Uganda, MS Office install Kampala, Asmart',
    related: ['computer-phone-repair-uganda', 'tech-consulting-uganda'],
  },
  'data-recovery-uganda': {
    h1: 'Data Recovery in Uganda',
    subtitle: 'Recover lost files from phones, laptops & storage devices',
    problem: 'Lost photos and documents from broken phones or formatted drives cause panic.',
    solution: 'Professional data recovery from phones, laptops, USB drives & memory cards — confidential service.',
    features: ['Phone recovery', 'Hard drive recovery', 'Formatted drives', 'Corrupted files', 'Price on negotiation'],
    keywords: 'data recovery Uganda, file recovery Uganda, phone data recovery Kampala, Asmart',
    related: ['computer-phone-repair-uganda', 'software-installation-uganda'],
  },
  'website-cost-uganda': {
    h1: 'How Much Is a Website in Uganda?',
    subtitle: 'Website pricing explained — every project quoted on negotiation',
    problem: 'Business owners do not know what a website should cost or what they pay for.',
    solution: 'We quote every project individually based on pages, design, features & budget — no hidden fees.',
    features: ['Free consultation', 'Transparent scope', 'Flexible payment', 'All budgets welcome', 'Price on negotiation'],
    keywords: 'website cost Uganda, how much website Uganda, cheap website Uganda, Asmart',
    related: ['web-designer-uganda', 'school-website-uganda', 'clinic-website-uganda'],
  },
};

function buildKeywords(slug, data) {
  return data.keywords || `${slug.replace(/-/g, ', ')}, Uganda, Asmart, nationwide`;
}

function buildPage(slug, data) {
  const title = `${data.h1} | Asmart Uganda`;
  const canonical = `${SITE}/${slug}`;
  const desc = `${data.subtitle}. Asmart serves all Uganda — ${AREAS}. Price on negotiation.`;
  const relatedLinks = (data.related || [])
    .map((r) => `<li><a href="${r}">${r.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</a></li>`)
    .join('\n                            ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <meta name="description" content="${desc}">
    <meta name="keywords" content="${buildKeywords(slug, data)}">
    <link rel="canonical" href="${canonical}">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="style.css">
    <link rel="icon" type="image/x-icon" href="Assets/favicon.ico.png">
    <script type="application/ld+json">
    {"@context":"https://schema.org","@type":"Service","name":"${data.h1}","description":"${data.subtitle}","areaServed":{"@type":"Country","name":"Uganda"},"provider":{"@type":"LocalBusiness","name":"Asmart Uganda","address":{"@type":"PostalAddress","addressLocality":"Kagadi","addressRegion":"Western Uganda","addressCountry":"UG"},"telephone":"+256779654710","url":"${SITE}"}}
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
                <div class="nav-toggle"><button id="theme-toggle" class="theme-toggle-btn"><i class="fas fa-moon"></i></button></div>
            </div>
            <div class="hamburger" id="hamburger"><span class="bar"></span><span class="bar"></span><span class="bar"></span></div>
        </nav>
    </header>
    <main class="page-main landing-main">
        <section class="page-hero">
            <div class="container">
                <p class="page-hero-label"><i class="fas fa-globe-africa"></i> Serving all Uganda · HQ Kagadi</p>
                <h1 class="page-hero-title">${data.h1}</h1>
                <p class="page-hero-desc">${data.subtitle}</p>
                <p class="coverage-line"><i class="fas fa-map-marker-alt"></i> ${AREAS}</p>
                <div class="negotiation-badge inline-badge"><i class="fas fa-handshake"></i> Price on negotiation</div>
                <div class="hero-buttons">
                    <a href="request.html?service=${slug}" class="btn btn-primary"><i class="fas fa-paper-plane"></i> Request Quote</a>
                    <a href="https://wa.me/256779654710?text=${encodeURIComponent('Hi Asmart, I need: ' + data.h1)}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary"><i class="fab fa-whatsapp"></i> WhatsApp</a>
                </div>
            </div>
        </section>
        <section class="landing-content container">
            <article class="seo-card landing-block"><h2>The Problem</h2><p>${data.problem}</p></article>
            <article class="seo-card landing-block"><h2>Our Solution</h2><p>${data.solution}</p></article>
            <article class="pricing-card landing-features">
                <p class="pricing-label">What's Included</p>
                <h2 class="pricing-title">${data.h1}</h2>
                <ul class="pricing-features">${data.features.map((f) => `<li><i class="fas fa-check"></i> ${f}</li>`).join('\n                    ')}</ul>
                <a href="request.html?service=${slug}" class="btn btn-primary">Get Quote — Uganda Wide</a>
            </article>
            ${relatedLinks ? `<article class="seo-card landing-block"><h2>Related Services</h2><ul class="related-links">${relatedLinks}</ul></article>` : ''}
        </section>
    </main>
    <footer class="footer"><div class="container"><div class="footer-bottom"><p class="footer-copyright">© 2026 <strong>Asmart Uganda</strong> · Nationwide · <a href="guides.html">All guides</a></p></div></div></footer>
    <a href="https://wa.me/256779654710" target="_blank" class="whatsapp-float" aria-label="WhatsApp"><i class="fab fa-whatsapp"></i></a>
    <script src="js/shared-ui.js"></script>
    <script src="script.js"></script>
</body>
</html>`;
}

Object.entries(LANDING_CONTENT).forEach(([slug, data]) => {
  fs.writeFileSync(path.join(ROOT, `${slug}.html`), buildPage(slug, data));
  console.log('Generated:', slug + '.html');
});

console.log('Done —', Object.keys(LANDING_CONTENT).length, 'pages (Uganda-wide SEO)');
