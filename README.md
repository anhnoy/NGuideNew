# NGuide Customer Frontend

A modern travel booking platform for Laos and Thailand tourism built with Nuxt 3, Vue 3, and TypeScript.

## 🚀 Features

- **Modern Tech Stack**: Nuxt 3, Vue 3, TypeScript, Tailwind CSS
- **Travel Booking**: Comprehensive quotation and booking system
- **Google Maps Integration**: Interactive maps for location-based services
- **Multi-language Support**: Korean language support with Noto Sans KR
- **Real-time Features**: Socket.io integration
- **PDF Generation**: Travel itinerary and quotation PDFs
- **SEO Optimized**: Server-side rendering and sitemap generation
- **Mobile Responsive**: Optimized for all devices

## 🛠️ Tech Stack

- **Framework**: [Nuxt 3](https://nuxt.com/)
- **Frontend**: [Vue 3](https://vuejs.org/) with Composition API
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/)
- **State Management**: [Pinia](https://pinia.vuejs.org/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Maps**: Google Maps API
- **PDF Generation**: jsPDF + html2canvas
- **Real-time**: Socket.io
- **Fonts**: Google Fonts (Noto Sans KR)

## 📋 Prerequisites

- Node.js (v18 or higher)
- npm, pnpm, yarn, or bun
- Google Maps API key

## 🔧 Setup

1. **Clone the repository**

```bash
git clone <repository-url>
cd nguide-customerfront
```

2. **Install dependencies**

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

3. **Environment Configuration**

```bash
# Copy the example environment file
cp .env.example .env.local

# Edit .env.local with your actual values
# GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

4. **Development Server**
   Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## 🏗️ Building for Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

## 🚀 Deployment

Preview production build locally:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

For deployment, check out the [Nuxt 3 deployment documentation](https://nuxt.com/docs/getting-started/deployment).

## 📁 Project Structure

```
.
├── assets/              # Static assets (CSS, fonts, icons, images)
├── components/          # Vue components
├── composables/         # Vue composables and utilities
├── layouts/            # App layouts
├── pages/              # App pages (auto-routing)
├── plugins/            # Nuxt plugins
├── public/             # Public static files
├── server/             # Server-side code
├── services/           # API services
├── stores/             # Pinia stores
├── nuxt.config.ts      # Nuxt configuration
├── tailwind.config.js  # Tailwind CSS configuration
└── tsconfig.json       # TypeScript configuration
```

## 🔒 Environment Variables

| Variable                    | Description           | Required |
| --------------------------- | --------------------- | -------- |
| `VITE_ENV_POINT_URL`        | API base URL          | ✅       |
| `VITE_ENV_POINT_SOCKET_URL` | Socket.io server URL  | ✅       |
| `GOOGLE_MAPS_API_KEY`       | Google Maps API key   | ✅       |
| `EXCHANGE`                  | Exchange rate API URL | ❌       |

## 🧪 Code Quality

This project includes several tools for maintaining code quality:

- **ESLint**: JavaScript/TypeScript linting
- **Prettier**: Code formatting
- **Husky**: Git hooks
- **TypeScript**: Static type checking

Run linting:

```bash
npm run lint
```

## 📱 Performance

The application includes several performance optimizations:

- **Server-Side Rendering (SSR)**: Faster initial page loads
- **Lazy Loading**: Images and components loaded on demand
- **Code Splitting**: Automatic code splitting by Nuxt
- **Image Optimization**: Optimized image delivery
- **Performance Monitoring**: Built-in performance tracking

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support and questions, please contact the development team or create an issue in the repository.

---

**Auto&Tour** - Your trusted partner for Laos and Thailand travel experiences.
