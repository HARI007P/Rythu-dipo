# 🌐 Multilingual Support Guide (English ↔ Telugu)

This guide explains how to use the internationalization (i18n) features in the Rythu-Dipo React application.

## 📁 File Structure

```
frontend/
├── public/
│   └── locales/
│       ├── en/
│       │   └── translation.json     # English translations
│       └── te/
│           └── translation.json     # Telugu translations
├── src/
│   ├── components/
│   │   ├── LanguageToggle.jsx       # Language switcher component
│   │   └── TestTranslation.jsx      # Test component (remove in production)
│   ├── hooks/
│   │   └── useI18n.js              # Custom i18n hook
│   ├── i18n/
│   │   └── index.js                # i18n configuration
│   └── main.jsx                    # i18n initialization
```

## 🚀 Quick Start

1. **Language Switching**: Use the language toggle in the navbar
2. **Persistence**: Selected language is saved in localStorage
3. **Auto-detection**: App detects browser language on first visit

## 🛠️ How to Use Translations in Components

### Basic Usage

```jsx
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('home.title')}</h1>
      <p>{t('home.description')}</p>
    </div>
  );
};
```

### With Parameters (Interpolation)

```jsx
const { t } = useTranslation();

// For key: "products.showingResults": "Showing {{count}} of {{total}} products"
<p>{t('products.showingResults', { count: 5, total: 20 })}</p>
// Output: "Showing 5 of 20 products" (English)
// Output: "20 లో 5 ఉత్పాదనలను చూపిస్తోంది" (Telugu)
```

### With Custom Hook

```jsx
import useI18n from '../hooks/useI18n';

const MyComponent = () => {
  const { t, currentLanguage, changeLanguage } = useI18n();
  
  return (
    <div>
      <p>Current: {currentLanguage}</p>
      <h1>{t('home.title')}</h1>
      <button onClick={() => changeLanguage('te')}>
        Switch to Telugu
      </button>
    </div>
  );
};
```

## 📝 Translation Keys Structure

### Organized by Feature

```json
{
  "common": {        // Shared/common terms
    "loading": "Loading...",
    "error": "Error"
  },
  "navbar": {        // Navigation elements
    "home": "Home",
    "products": "Products"
  },
  "home": {          // Home page content
    "title": "Rythu Dipo",
    "description": "Your trusted partner..."
  },
  "auth": {          // Authentication pages
    "login": {
      "title": "Welcome Back",
      "email": "Email Address"
    }
  }
}
```

## 🔧 Adding New Languages

### 1. Add Translation File

Create: `public/locales/{language_code}/translation.json`

Example for Hindi (`hi`):
```json
{
  "navbar": {
    "home": "होम",
    "products": "उत्पाद"
  }
}
```

### 2. Update Configuration

In `src/i18n/index.js`:
```js
supportedLngs: ['en', 'te', 'hi'],  // Add 'hi'
```

### 3. Update Language Toggle

In `src/components/LanguageToggle.jsx`:
```js
const languages = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' }  // Add Hindi
];
```

## 🎯 Best Practices

### 1. Consistent Key Naming
```js
// ✅ Good - descriptive and hierarchical
t('auth.login.title')
t('products.categories.seeds')
t('messages.success.orderPlaced')

// ❌ Bad - unclear or flat structure
t('title')
t('msg1')
```

### 2. Use Interpolation for Dynamic Content
```js
// ✅ Good
t('cart.itemCount', { count: items.length })

// ❌ Bad - hard to translate
`You have ${items.length} items`
```

### 3. Handle Pluralization
```js
// In translation file
{
  "cart": {
    "items_one": "{{count}} item",
    "items_other": "{{count}} items"
  }
}

// In component
t('cart.items', { count: itemCount })
```

## 📱 Components Available

### 1. LanguageToggle
- Dropdown with flag icons
- Persistent language selection
- Mobile-responsive design

```jsx
import LanguageToggle from './components/LanguageToggle';

<LanguageToggle />
```

### 2. TestTranslation (Development Only)
- Verify translations are working
- Test language switching
- Debug translation keys

```jsx
import TestTranslation from './components/TestTranslation';

<TestTranslation />  // Remove in production
```

## 🔍 Debugging Tips

### 1. Check Translation Keys
```js
const { t, i18n } = useTranslation();

// See current language
console.log('Current language:', i18n.language);

// Check if key exists
console.log('Key exists:', i18n.exists('home.title'));

// Get raw translation data
console.log('Resources:', i18n.getResourceBundle('en', 'translation'));
```

### 2. Enable Debug Mode
In `src/i18n/index.js`:
```js
debug: true,  // Shows missing translations in console
```

### 3. Missing Translation Fallback
```js
// Will show key if translation is missing
t('missing.key', 'Fallback text')
```

## 🌍 Current Language Support

| Language | Code | Status | Completion |
|----------|------|---------|------------|
| English  | `en` | ✅ Active | 100% |
| Telugu   | `te` | ✅ Active | 100% |

## 📦 Dependencies

```json
{
  "react-i18next": "^13.x.x",
  "i18next": "^23.x.x", 
  "i18next-browser-languagedetector": "^7.x.x",
  "i18next-http-backend": "^2.x.x"
}
```

## 🚀 Production Checklist

- [ ] Remove `TestTranslation` component
- [ ] Set `debug: false` in i18n config
- [ ] Verify all translation keys are covered
- [ ] Test language switching on all pages
- [ ] Check localStorage persistence
- [ ] Validate Telugu font rendering
- [ ] Test on mobile devices

---

**Happy Translating! 🌱🌍**
