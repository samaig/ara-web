# Araviel - AI Companion Landing Page

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

> **Your Intelligent Companion for Everything AI**

Araviel is a global AI company building the ultimate lifestyle companion - one intelligent platform that automatically selects the best AI model for every task. This repository contains the official landing page for Araviel.

## 🌟 Live Demo

Visit [https://araviel.ai](https://araviel.ai) to see the live website.

## 📋 Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [SEO Optimization](#seo-optimization)
- [Performance](#performance)
- [Browser Support](#browser-support)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- **Modern Design**: Clean, professional design with beautiful gradients and animations
- **Fully Responsive**: Optimized for all devices from mobile to desktop
- **SEO Optimized**: Comprehensive meta tags, schema markup, and sitemap
- **Fast Performance**: Optimized assets, lazy loading, and efficient code
- **Accessible**: WCAG compliant with keyboard navigation and screen reader support
- **Interactive**: Smooth animations, scroll effects, and engaging user interactions
- **Form Handling**: Waitlist signup with validation
- **Analytics Ready**: Prepared for Google Analytics, Plausible, or other analytics platforms

## 🛠 Technology Stack

- **HTML5**: Semantic markup with accessibility in mind
- **CSS3**: Modern CSS with custom properties, Grid, and Flexbox
- **JavaScript (ES6+)**: Vanilla JavaScript for optimal performance
- **Google Fonts**: Inter and Space Grotesk for beautiful typography
- **SVG**: Scalable vector graphics for crisp icons and logos

### Design System

- **Color Palette**:
  - Primary: Deep Midnight Blue (#0A0E27)
  - Accent Coral: #FF6B6B
  - Accent Purple: #A78BFA
  - Neutral: Warm off-white (#FAF9F6)

- **Typography**:
  - Display: Space Grotesk
  - Body: Inter

## 🚀 Getting Started

### Prerequisites

- A modern web browser
- A web server (Apache, Nginx, or any static hosting service)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/araviel/ara-web.git
cd ara-web
```

2. Open `index.html` in your browser or serve with a local server:

**Using Python:**
```bash
python -m http.server 8000
```

**Using Node.js (with http-server):**
```bash
npx http-server
```

**Using PHP:**
```bash
php -S localhost:8000
```

3. Visit `http://localhost:8000` in your browser

## 📁 Project Structure

```
ara-web/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript interactions
├── favicon.svg         # Site favicon
├── robots.txt          # Search engine crawler instructions
├── sitemap.xml         # XML sitemap for SEO
├── .htaccess           # Apache configuration (optional)
└── README.md           # This file
```

## 🔍 SEO Optimization

### Meta Tags

- Comprehensive meta tags for all major platforms
- Open Graph tags for social media sharing
- Twitter Card tags for Twitter sharing
- Canonical URLs
- Structured data (Schema.org)

### Performance

- Gzip compression enabled
- Browser caching configured
- Lazy loading for images
- Optimized CSS and JavaScript
- Minimal external dependencies

### Best Practices

- Semantic HTML5 markup
- Proper heading hierarchy
- Alt text for all images (when added)
- Mobile-friendly design
- Fast page load times

## ⚡ Performance

Current performance metrics (target):

- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.5s
- **Cumulative Layout Shift**: < 0.1

### Optimization Techniques

1. **CSS**: Minified and optimized for critical rendering path
2. **JavaScript**: Deferred loading for non-critical scripts
3. **Images**: Lazy loading and WebP format (when applicable)
4. **Fonts**: Preconnect to font providers, font-display: swap
5. **Caching**: Aggressive caching for static assets

## 🌐 Browser Support

- Chrome (last 2 versions)
- Firefox (last 2 versions)
- Safari (last 2 versions)
- Edge (last 2 versions)
- Mobile Safari (iOS 12+)
- Chrome Mobile (Android 8+)

## 📦 Deployment

### Static Hosting (Recommended)

Deploy to any static hosting service:

**Netlify:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod
```

**Vercel:**
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

**GitHub Pages:**
1. Push to GitHub
2. Enable GitHub Pages in repository settings
3. Select branch and root folder

### Traditional Hosting

1. Upload all files to your web server
2. Ensure `.htaccess` is configured (for Apache)
3. Configure SSL certificate (recommended)
4. Update domain settings

## 🔧 Customization

### Colors

Update CSS custom properties in `styles.css`:

```css
:root {
    --color-primary: #0A0E27;
    --color-accent-coral: #FF6B6B;
    --color-accent-purple: #A78BFA;
    /* ... */
}
```

### Content

Edit `index.html` to update:
- Text content
- Links
- Email addresses
- Social media links

### Analytics

Add your analytics tracking code in `index.html` before `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🐛 Known Issues

None at this time. Please report issues on GitHub.

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Write clean, readable code
- Follow existing code style
- Test on multiple browsers
- Optimize for performance
- Ensure accessibility compliance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

- **Founder**: [Your Name]
- **Website**: [https://araviel.ai](https://araviel.ai)
- **Email**: hello@araviel.ai

## 🙏 Acknowledgments

- Inspired by leading AI companies: Anthropic, OpenAI, Perplexity
- Design system influenced by modern web design best practices
- Typography: Google Fonts (Inter, Space Grotesk)

## 📞 Contact

- **General**: hello@araviel.ai
- **Investors**: investors@araviel.ai
- **Careers**: careers@araviel.ai
- **Support**: support@araviel.ai

## 🗺️ Roadmap

- [x] Landing page design
- [x] Responsive implementation
- [x] SEO optimization
- [ ] Backend integration for waitlist
- [ ] Blog section
- [ ] Documentation pages
- [ ] Interactive product demos
- [ ] Multi-language support

---

**Built with ❤️ for the future of AI interaction**

© 2025 Araviel. All rights reserved.
