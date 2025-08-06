# Migration Guide: Nuxt.js (Vue) → React + TypeScript + Tailwind

## 🚀 Overview

This guide covers the complete migration from the existing Nuxt.js (Vue.js) project to React with TypeScript and Tailwind CSS.

## 📋 Migration Steps

### 1. Project Setup

```bash
# Remove existing node_modules and package-lock.json
rm -rf node_modules package-lock.json

# Install React dependencies
npm install

# Or use the new package.json
cp package-react.json package.json
npm install
```

### 2. Key Changes

#### **Framework Migration**

- **From**: Nuxt 3 (Vue.js) with Composition API
- **To**: React 18 with TypeScript and Vite

#### **State Management**

- **From**: Pinia stores
- **To**: Zustand (lightweight alternative to Redux)

#### **Routing**

- **From**: Nuxt file-based routing
- **To**: React Router DOM

#### **Build Tool**

- **From**: Nuxt/Vite built-in
- **To**: Vite with React plugin

### 3. File Structure Mapping

```
Old Nuxt Structure          →    New React Structure
components/                →    src/components/
pages/                     →    src/pages/
stores/                    →    src/hooks/ (Zustand stores)
composables/               →    src/hooks/
services/                  →    src/services/
layouts/                   →    src/layouts/
assets/                    →    public/ + src/assets/
nuxt.config.ts            →    vite.config.ts
app.vue                    →    src/App.tsx
```

### 4. Component Migration Examples

#### **Vue Component → React Component**

**Before (Vue):**

```vue
<template>
  <div class="navbar">
    <nav-item v-for="item in items" :key="item.id">
      {{ item.name }}
    </nav-item>
  </div>
</template>

<script setup>
const items = ref([]);
const loading = ref(false);

onMounted(async () => {
  loading.value = true;
  items.value = await fetchItems();
  loading.value = false;
});
</script>
```

**After (React):**

```tsx
import React, { useState, useEffect } from 'react';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      const data = await fetchItems();
      setItems(data);
      setLoading(false);
    };
    loadItems();
  }, []);

  return (
    <div className={`navbar ${className}`}>
      {items.map(item => (
        <NavItem key={item.id}>{item.name}</NavItem>
      ))}
    </div>
  );
};
```

#### **Pinia Store → Zustand Store**

**Before (Pinia):**

```js
export const useTourStore = defineStore('tour', {
  state: () => ({
    tours: [],
    loading: false,
  }),
  actions: {
    async fetchTours() {
      this.loading = true;
      this.tours = await api.getTours();
      this.loading = false;
    },
  },
});
```

**After (Zustand):**

```ts
interface TourState {
  tours: Tour[];
  loading: boolean;
  fetchTours: () => Promise<void>;
}

export const useTourStore = create<TourState>(set => ({
  tours: [],
  loading: false,
  fetchTours: async () => {
    set({ loading: true });
    const tours = await api.getTours();
    set({ tours, loading: false });
  },
}));
```

### 5. Environment Variables

**Before (.env):**

```bash
VITE_ENV_POINT_URL=https://autontour.com/api/app/api/v10
GOOGLE_MAPS_API_KEY=your_key_here
```

**After (.env):**

```bash
VITE_API_BASE_URL=https://autontour.com/api/app/api/v10
VITE_GOOGLE_MAPS_API_KEY=your_key_here
```

### 6. Styling Migration

The Tailwind CSS configuration remains mostly the same, with minor adjustments for React:

```js
// tailwind.config.js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', // Updated for React
  ],
  // ... rest of config remains the same
};
```

### 7. API Services Migration

**Before (Nuxt composable):**

```js
export const useApi = () => {
  const config = useRuntimeConfig();
  return $fetch(url, { baseURL: config.public.apiBaseUrl });
};
```

**After (React hook):**

```ts
export const useApi = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL;
  return axios.create({ baseURL });
};
```

### 8. Performance Optimizations

#### **Code Splitting**

```tsx
// Lazy loading components
const LazyComponent = React.lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

#### **Image Optimization**

```tsx
// Using native lazy loading
<img src={imageUrl} alt={altText} loading="lazy" className="w-full h-auto" />
```

### 9. SEO Implementation

**Before (Nuxt):**

```vue
<script setup>
useHead({
  title: 'Page Title',
  meta: [{ name: 'description', content: 'Page description' }],
});
</script>
```

**After (React):**

```tsx
import { Helmet } from 'react-helmet-async';

function Page() {
  return (
    <>
      <Helmet>
        <title>Page Title</title>
        <meta name="description" content="Page description" />
      </Helmet>
      {/* Page content */}
    </>
  );
}
```

### 10. Development Scripts

**New package.json scripts:**

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --fix",
    "type-check": "tsc --noEmit"
  }
}
```

## 🎯 Migration Checklist

- [ ] Install React dependencies
- [ ] Convert Vue components to React components
- [ ] Migrate Pinia stores to Zustand
- [ ] Update routing from Nuxt to React Router
- [ ] Convert Nuxt plugins to React hooks/providers
- [ ] Update environment variables
- [ ] Migrate API services
- [ ] Update SEO implementation
- [ ] Convert CSS/SCSS to Tailwind classes
- [ ] Update build configuration
- [ ] Test all functionality
- [ ] Update deployment configuration

## 🚦 Running the Project

1. **Development:**

   ```bash
   npm run dev
   ```

2. **Production Build:**

   ```bash
   npm run build
   npm run preview
   ```

3. **Type Checking:**

   ```bash
   npm run type-check
   ```

4. **Linting:**
   ```bash
   npm run lint
   ```

## 📝 Notes

- React requires explicit imports for React in TypeScript files
- State management is more explicit in React compared to Vue's reactivity
- Event handling syntax differs between Vue and React
- React uses className instead of class for CSS classes
- Props are passed differently in React components

## 🆘 Common Issues & Solutions

1. **TypeScript Errors**: Make sure all React types are properly imported
2. **CSS Classes**: Use `className` instead of `class`
3. **Event Handlers**: Use `onClick` instead of `@click`
4. **State Updates**: Use setState functions instead of direct assignment
5. **Lifecycle**: Use useEffect instead of Vue lifecycle hooks

This migration provides a modern, type-safe React application with the same functionality as the original Nuxt.js project.
