# 🎯 TalentBoard — Candidate Management Dashboard

<div align="center">

![React](https://img.shields.io/badge/React-18.x-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-v6-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-1.x-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A modern, responsive Candidate Management Dashboard built with React.js and Tailwind CSS.  
Search, filter, and manage job applicants — with live API integration and a beautiful dark mode.**

[🌐 Live Demo](https://YOUR_VERCEL_URL) · [🐛 Report Bug](https://github.com/YOUR_USERNAME/candidate-dashboard/issues) · [✨ Request Feature](https://github.com/YOUR_USERNAME/candidate-dashboard/issues)

</div>

---

## 📸 Screenshots

> _Add your screenshots here after deployment._

| Light Mode | Dark Mode |
|---|---|
| ![Light Mode Screenshot](./screenshots/light-mode.png) | ![Dark Mode Screenshot](./screenshots/dark-mode.png) |

| Candidate Detail | Add Candidate Form |
|---|---|
| ![Detail Page](./screenshots/detail-page.png) | ![Add Form](./screenshots/add-form.png) |

---

## ✨ Features

- 🔍 **Real-time Search** — Instantly filter candidates by name, email, college, or skill
- 🏷️ **Status Filtering** — Quick-filter pills + dropdown for Applied / Interviewing / Selected / Rejected
- 📄 **Candidate Detail View** — Full profile page with two-column layout, bio, skills, and contact info
- ➕ **Add Candidate Form** — Validated form with inline errors, success toast, and auto-redirect
- 🌐 **Live API Integration** — Fetches 10 real users from DummyJSON API with graceful mock fallback
- 🌙 **Dark Mode** — Toggle persisted to `localStorage`, smooth instant transition
- 📑 **Pagination** — 6 candidates per page with previous/next controls and page-number buttons
- 🎨 **Smooth Animations** — Staggered card entrance, page fade-in, toast slide-in, hover micro-interactions
- 📱 **Fully Responsive** — Mobile-first design with hamburger menu and single-column stacking
- ♿ **Accessible** — `aria-*` labels, keyboard navigation, `focus-visible` rings, `prefers-reduced-motion` support

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| **UI Library** | [React.js 18](https://reactjs.org/) (no TypeScript) |
| **Styling** | [Tailwind CSS v3](https://tailwindcss.com/) |
| **Routing** | [React Router DOM v6](https://reactrouter.com/) |
| **HTTP Client** | [Axios](https://axios-http.com/) |
| **Icons** | [React Icons](https://react-icons.github.io/react-icons/) (HeroIcons) |
| **State Management** | React Context API + `useReducer` |
| **External API** | [DummyJSON Users API](https://dummyjson.com/docs/users) |
| **Avatars** | [DiceBear Initials API](https://www.dicebear.com/styles/initials/) |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v16+ and **npm** v8+ installed on your machine
- A terminal / command prompt

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/candidate-dashboard.git
   cd candidate-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

> ⚠️ **No `.env` file required.** The app fetches data from the public DummyJSON API and falls back to local mock data automatically if the network is unavailable.

---

## 📁 Folder Structure

```
candidate-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── CandidateCard.jsx         # Card with DiceBear avatar & animations
│   │   ├── Navbar.jsx                # Responsive navbar with dark toggle
│   │   ├── Spinner.jsx               # Reusable loading spinner (sm/md/lg)
│   │   └── Toast.jsx                 # Auto-dismissing toast (success/error/warning/info)
│   │
│   ├── context/
│   │   └── CandidateContext.js       # Global state: useReducer + Context + API fetch
│   │
│   ├── data/
│   │   └── mockCandidates.js         # 10 static mock candidates (API fallback)
│   │
│   ├── pages/
│   │   ├── AddCandidatePage.jsx      # Add-candidate form with validation & toast
│   │   ├── CandidateDetailPage.jsx   # Two-column candidate profile page
│   │   ├── CandidatesPage.jsx        # Main list: search, filter, pagination, grid
│   │   └── NotFound.jsx              # 404 fallback page
│   │
│   ├── utils/
│   │   └── api.js                    # Axios instance + fetchCandidatesFromAPI()
│   │
│   ├── App.js                        # Root: BrowserRouter + CandidateProvider + routes
│   ├── index.css                     # Tailwind directives + keyframes + custom utilities
│   └── index.js                      # React 18 entry point
│
├── tailwind.config.js                # Dark mode, custom tokens, animations
├── postcss.config.js
└── package.json
```

---

## 🌐 API Reference

### DummyJSON Users API

```
GET https://dummyjson.com/users?limit=10
```

The API response is mapped to the internal candidate shape:

| API Field | Mapped To |
|---|---|
| `firstName + lastName` | `name` |
| `email` | `email` |
| `phone` | `phone` |
| `address.city + state` | `location` |
| `age` (derived) | `experience` |
| _generated_ | `college`, `skills`, `status`, `bio`, `appliedDate` |

> **Fallback:** If the API call fails (e.g., no network), the app automatically loads `src/data/mockCandidates.js` and shows a soft warning banner — the UI is never left empty.

### DiceBear Initials API

Candidate avatars are generated on-the-fly:

```
GET https://api.dicebear.com/7.x/initials/svg?seed=Aarav+Mehta&backgroundType=gradientLinear
```

---

## 🗺️ Routes

| Path | Page | Description |
|---|---|---|
| `/` | `CandidatesPage` | Main list with search, filter, and pagination |
| `/candidate/:id` | `CandidateDetailPage` | Full profile for a single candidate |
| `/add` | `AddCandidatePage` | Form to manually add a new candidate |
| `*` | `NotFound` | 404 catch-all page |

---

## 🧠 State Management

Global state lives in `src/context/CandidateContext.js` using **React Context + `useReducer`**.

```
State shape:
  candidates          []       Raw list from API or mock data
  loading             boolean  True while fetching
  error               string   Set if API fetch fails
  searchQuery         string   Live search input value
  statusFilter        string   Active status filter ("All" | "Applied" | ...)
  darkMode            boolean  Persisted to localStorage
  filteredCandidates  []       Derived: search + filter applied
```

**Actions:** `SET_CANDIDATES` · `ADD_CANDIDATE` · `SET_LOADING` · `SET_ERROR` · `SET_SEARCH` · `SET_FILTER` · `TOGGLE_DARK_MODE`

---

## 🎨 Design System

Custom tokens defined in `tailwind.config.js`:

| Token | Value / Purpose |
|---|---|
| `brand-500` | `#6366f1` — primary indigo |
| `fontFamily.sans` | Inter → system fallbacks |
| `boxShadow.card` | Soft layered card shadow |
| `boxShadow.card-hover` | Indigo-tinted hover glow |
| `animate-card-enter` | Staggered fade-up for grid cards |
| `animate-page-enter` | Full-page fade-up on route change |
| `animate-toast-in` | Toast slide-down from top-right |

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm start` | Start development server at `localhost:3000` |
| `npm run build` | Create optimised production bundle in `/build` |
| `npm test` | Run test suite (React Testing Library) |

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.

```
MIT License — Copyright (c) 2024 YOUR_NAME
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files, to deal in the Software
without restriction, including without limitation the rights to use, copy,
modify, merge, publish, distribute, sublicense, and/or sell copies of the Software.
```

---

<div align="center">

Built with ❤️ using **React.js** + **Tailwind CSS**

⭐ Star this repo if you found it helpful!

</div>
