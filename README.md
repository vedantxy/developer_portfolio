# 🌐 Developer Portfolio

![React](https://img.shields.io/badge/React-18+-blue?style=flat-square&logo=react)
![Vite](https://img.shields.io/badge/Vite-Latest-646CFF?style=flat-square&logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3+-06B6D4?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

A fully responsive, interactive, and animated portfolio website built with **React + Vite**. Showcasing skills, projects, and experience with smooth animations, dynamic visuals, and a modern design aesthetic.

🔗 **Live Demo**: [developer-portfolio-lilac-six.vercel.app](https://developer-portfolio-lilac-six.vercel.app)

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [📦 Installation](#-installation)
- [🚀 Getting Started](#-getting-started)
- [📁 Project Structure](#-project-structure)
- [🔧 Configuration](#-configuration)
- [🎨 Customization](#-customization)
- [📊 Analytics & Performance](#-analytics--performance)
- [🐛 Troubleshooting](#-troubleshooting)
- [📝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

- **🎨 Responsive Design** - Seamlessly adapts to all device sizes (mobile, tablet, desktop)
- **🧩 Interactive Particle Background** - Dynamic particle effects powered by `ts-particles` that respond to cursor movement
- **🌗 Theme Toggler** - Switch between light and dark modes with persistent preferences
- **🌀 Smooth Animations** - Fluid transitions using `GSAP` and `Framer Motion`
- **🦴 Skeleton Loader** - Elegant loading states before content renders
- **📊 Google Analytics 4** - Integrated visitor tracking and insights
- **📜 Resume Section** - View and download your resume directly from the portfolio
- **💡 Skills & Projects Showcase** - Organized display of technical skills and project portfolio
- **📬 Contact Form** - EmailJS-powered contact form that doesn't expose your email
- **⚡ Performance Optimized** - Fast loading with Vite's lightning-fast build tool
- **📱 PWA Ready** - Progressive Web App capabilities for offline support
- **♿ Accessible** - Built with accessibility best practices

---

## 🛠️ Tech Stack

### Core Framework
- **React 18+** - UI library
- **Vite** - Next-gen build tool with instant HMR
- **TypeScript** - Type-safe JavaScript

### Styling & Animation
- **Tailwind CSS 3+** - Utility-first CSS framework
- **Framer Motion** - Production-ready motion library
- **GSAP** - Professional animation library
- **ts-particles** - Customizable particle engine

### Services & Tools
- **EmailJS** - Email service without backend setup
- **Google Analytics 4** - Visitor analytics and insights
- **Vercel Web Analytics** - Deployment and performance monitoring

### Development Tools
- **ESLint** - Code quality and style enforcement
- **Vite Config** - Custom build configuration

### Deployment
- **Vercel** - Serverless deployment platform
- **Netlify** - Alternative deployment option

---

## 📦 Installation

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** (v8 or higher) or **yarn**

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/vedantxy/developer_portfolio.git
   cd developer_portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   VITE_GA4_ID=your_ga4_id
   ```

4. **Ready to go!**
   ```bash
   npm run dev
   ```

---

## 🚀 Getting Started

### Development Server

Start the development server with hot module replacement:

```bash
npm run dev
```

The portfolio will be available at `http://localhost:5173` (Vite's default port).

### Production Build

Create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Linting

Check code quality:

```bash
npm run lint
```

---

## 📁 Project Structure

```
developer_portfolio/
├── public/                 # Static assets
│   ├── favicon.ico
│   └── ...
├── src/
│   ├── components/        # Reusable React components
│   │   ├── Header.jsx
│   │   ├── Hero.jsx
│   │   ├── Projects.jsx
│   │   ├── Skills.jsx
│   │   ├── Contact.jsx
│   │   └── ...
│   ├── assets/            # Images, fonts, and media
│   ├── styles/            # Global styles and Tailwind config
│   ├── App.jsx            # Main App component
│   ├── main.jsx           # Entry point
│   └── ...
├── index.html             # HTML template
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── eslint.config.js       # ESLint configuration
├── package.json           # Dependencies and scripts
├── netlify.toml           # Netlify deployment config
├── vercel.json            # Vercel deployment config
└── README.md              # This file
```

---

## 🔧 Configuration

### Vite Configuration

Edit `vite.config.js` to customize the build process:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: false,
  }
})
```

### Tailwind CSS

Customize styles in `tailwind.config.js`:

```javascript
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Add custom themes, colors, etc.
    },
  },
  plugins: [],
}
```

### EmailJS Setup

1. Go to [EmailJS](https://www.emailjs.com/)
2. Sign up and create a new service
3. Get your Service ID, Template ID, and Public Key
4. Add them to your `.env.local` file

### Google Analytics 4

1. Create a GA4 property in [Google Analytics](https://analytics.google.com)
2. Get your Measurement ID
3. Add it to your `.env.local` file

---

## 🎨 Customization

### Change Color Scheme

Edit the Tailwind config to modify the primary colors:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color',
    }
  }
}
```

### Update Content

- **About Section**: Edit `src/components/About.jsx`
- **Projects**: Modify `src/components/Projects.jsx`
- **Skills**: Update `src/components/Skills.jsx`
- **Contact**: Customize `src/components/Contact.jsx`

### Add New Sections

1. Create a new component in `src/components/`
2. Import it in `src/App.jsx`
3. Add it to the rendering order

### Particle Configuration

Customize particles in the particle component:

```javascript
{
  particles: {
    number: { value: 80 },
    color: { value: "#ffffff" },
    shape: { type: "circle" },
    move: { enable: true, speed: 2 }
  }
}
```

---

## 📊 Analytics & Performance

### Google Analytics 4 Notes

- ⚠️ May show console warnings if browser tracking prevention is enabled (completely normal)
- Provides detailed visitor insights and engagement metrics
- Check the console for GA4 debug messages in development

### Performance Optimization

- **Skeleton Loader**: Provides visual feedback while content loads
- **Code Splitting**: Vite automatically optimizes chunking
- **Image Optimization**: Use modern formats and lazy loading
- **CSS Purging**: Tailwind automatically removes unused styles

### Metrics to Monitor

- **LCP** (Largest Contentful Paint)
- **FID** (First Input Delay)
- **CLS** (Cumulative Layout Shift)
- **Page Load Time**

---

## 🐛 Troubleshooting

### Common Issues

**Port Already in Use**
```bash
# Use a different port
npm run dev -- --port 3000
```

**Module Not Found Error**
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build Fails**
```bash
# Clear Vite cache
rm -rf .vite
npm run build
```

**EmailJS Not Working**
- Verify your Service ID, Template ID, and Public Key
- Check that they're correctly set in `.env.local`
- Ensure CORS is properly configured

**GA4 Not Tracking**
- Verify your Measurement ID is correct
- Check that analytics script is loading
- Allow analytics in browser settings
- Check GA4 dashboard for real-time data

---

## 📝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/developer_portfolio.git
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Test thoroughly

4. **Commit your changes**
   ```bash
   git commit -m "Add your descriptive message"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Describe your changes clearly
   - Reference any related issues

---

## 📄 License

This project is licensed under the **MIT License** - see the LICENSE file for details.

You're free to use this portfolio as a template for your own projects!

---

## 🙏 Acknowledgments

- [React](https://react.dev) - UI library
- [Vite](https://vitejs.dev) - Build tool
- [Tailwind CSS](https://tailwindcss.com) - CSS framework
- [Framer Motion](https://www.framer.com/motion) - Animation library
- [GSAP](https://greensock.com/gsap) - Animation platform
- [ts-particles](https://tsparticles.js.org) - Particle engine
- [EmailJS](https://www.emailjs.com) - Email service

---

## 🎯 Future Enhancements

- [ ] Blog/Articles section
- [ ] Dark mode animations
- [ ] Multi-language support
- [ ] Search functionality
- [ ] Admin panel for content management
- [ ] API integration for dynamic content
- [ ] Social media links
- [ ] Video testimonials section

---

## 📞 Contact & Support

Have questions or suggestions? Reach out through:

- **Portfolio Website**: [developer-portfolio-lilac-six.vercel.app](https://developer-portfolio-lilac-six.vercel.app)
- **GitHub Issues**: [Open an issue](https://github.com/vedantxy/developer_portfolio/issues)
- **Email**: Use the contact form on the portfolio

---

**⭐ If you found this helpful, don't forget to star the repository!**

---

<div align="center">

Made with ❤️ by [vedantxy](https://github.com/vedantxy)

© 2024 All rights reserved. | Last Updated: April 2026

</div>
