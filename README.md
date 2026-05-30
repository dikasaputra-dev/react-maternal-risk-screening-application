# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
]);
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

src/
│
├── app/
│   ├── providers/
│   ├── router/
│   └── store/
│
├── components/
│   └── ui/
│       ├── button.tsx
│       ├── input.tsx
│       ├── card.tsx
│       ├── badge.tsx
│       ├── modal.tsx
│       ├── table.tsx
│       └── data-table.tsx
│
├── features/
│   ├── auth/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── schemas/
│   │   ├── types/
│   │   └── store/
│   │
│   ├── patients/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── types/
│   │   └── schemas/
│   │
│   ├── screenings/
│   ├── quiz/
│   └── admin/
│
├── layouts/
│   ├── dashboard-layout.tsx
│   └── auth-layout.tsx
│
├── lib/
│   ├── utils.ts
│   ├── axios.ts
│   └── cn.ts
│
├── types/
│   └── api.ts
│
├── constants/
│   └── routes.ts
│
├── hooks/
│
├── styles/
│   └── globals.css
│
├── main.tsx
└── vite-env.d.ts


Komponen yang Akan Kita Bangun Setelah Ini
Phase 1
Button
Input
Card
Badge
Table
Sidebar
Navbar
Phase 2
Patient Table
Screening Form
Risk Badge
Analytics Card
Audit Log Table
Phase 3
Dashboard Page
Patients Page
Screening History
Public Quiz UI
Phase 4
Charts
Search
Filtering
Pagination
Empty state
Skeleton loading
```
