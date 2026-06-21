# 🇮🇳 TravelBharat — Explore India State by State

A centralized tourism information web platform that provides state-wise and city-wise details of tourist destinations across India. Built as part of the **Unified Mentor** frontend internship, under the **"Incredible India"** project brief.

🔗 **Live Demo:** [travel-bharat-2xwy14i2k-sameer-1121s-projects.vercel.app](https://travel-bharat-2xwy14i2k-sameer-1121s-projects.vercel.app/)
📂 **Repository:** [github.com/Sameer-1121/TravelBharat](https://github.com/Sameer-1121/TravelBharat)

---

## 📖 About the Project

TravelBharat acts as a digital travel encyclopedia of India, helping travelers, students, and researchers discover tourist destinations in a structured, easy-to-navigate way. The platform showcases destinations with rich content — images, descriptions, best time to visit, entry fees, timings, and nearby attractions — organized state-wise and category-wise across all 28 states and 8 union territories.

### Problem it Solves
- Tourism information is usually scattered across multiple websites
- Finding state-wise tourist places in one place is difficult
- Lack of structured, verified destination details
- Poor navigation experience across existing tourism platforms

---

## ✨ Features

### Public Website
- **State-wise & City-wise Listings** — Browse all 28 states and 8 UTs with destination counts and regional filters
- **Detailed Destination Pages** — Full info per place: description, best time to visit, entry fee, timings, nearby attractions
- **Search & Filter** — Search by place name, state, or city; filter by category (Heritage, Nature, Adventure, Religious, Culture)
- **Category Browsing** — Dedicated page to explore destinations by type
- **Google Maps Integration** — Direct map link for every destination
- **Social Sharing** — Share any destination via WhatsApp, Twitter, or Facebook
- **Like/Save Destinations** — Mark favorite places while browsing
- **Fully Responsive** — Optimized for mobile, tablet, and desktop

### Admin Panel
- **Secure Login** — Password-protected access at `/admin/login`
- **Dashboard** — Overview of total places, states covered, and category breakdown
- **Add / Edit / Delete Places** — Full CRUD for managing destinations
- **Live Sync** — Changes made in Admin Panel reflect instantly across the entire public site (Home, States, Destinations, Categories, Place Detail pages) via a shared data context
- **Form Validation** — Required field checks and duplicate-entry prevention

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | React 19 (Vite) |
| Routing | React Router v6 |
| Styling | Tailwind CSS v4 |
| Icons | Remix Icon |
| State Management | React Context API |
| Data Persistence (Admin) | Browser `localStorage` |
| Deployment | Vercel |
| Version Control | Git + GitHub |

> **Note:** This version uses static data files (`placesData.js`) combined with a `localStorage`-backed Admin Panel. A full backend (Node.js + Express + MongoDB) is planned as a future enhancement to support persistent, multi-user content management.

---

## 📁 Project Structure

```
src/
├── assets/                  # Static images (hero backgrounds, etc.)
├── components/
│   ├── home/                 # Home page sections (Hero, PopularStates, Explore, Stats)
│   ├── states/                # States page sections (Hero, Filter, Grid, Card)
│   ├── categories/            # Categories page sections
│   ├── destinations/          # Destinations page sections
│   ├── about/                  # About page sections
│   ├── contact/                # Contact page sections
│   ├── admin/                  # Admin layout & route protection
│   ├── context/                # AdminAuthContext (login state)
│   ├── hooks/                  # PlacesDataContext (shared places data store)
│   └── Footer.jsx
├── data/
│   └── placesData.js           # Master destinations dataset + states info
├── Pages/
│   ├── Home.jsx, States.jsx, StatePage.jsx, PlaceDetail.jsx
│   ├── Categories.jsx, Destinations.jsx, About.jsx, Contact.jsx
│   ├── NotFound.jsx
│   └── admin/
│       ├── AdminLogin.jsx
│       ├── AdminDashboard.jsx
│       ├── AdminPlacesList.jsx
│       └── AdminPlaceForm.jsx
└── App.jsx                     # Route definitions
```

---

## 🚀 Getting Started (Local Setup)

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Sameer-1121/TravelBharat.git
cd TravelBharat

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

---

## 🔐 Admin Panel Access

The Admin Panel is available at `/admin/login`.

```
URL:      /admin/login
Password: travelbharat2026
```

> The password can be changed in `src/components/context/AdminAuthContext.jsx`.

Once logged in, admins can:
- View a dashboard with content statistics
- Browse, search, and filter all listed destinations
- Add new destinations with full details (name, state, city, category, description, images, etc.)
- Edit or delete existing destinations
- Changes are saved to the browser's `localStorage` and reflect live across the public site

---

## 🗺️ Data Coverage

- **34 States & Union Territories** covered with regional grouping (North, South, East, West, Central, Northeast, UT)
- **150+ tourist destinations** with detailed information
- **5 Categories:** Heritage, Nature, Adventure, Religious, Culture

---

## 🔮 Future Enhancements

- Backend integration (Node.js + Express + MongoDB) for persistent, multi-admin content management
- Multi-image galleries per destination
- Multilingual support (Hindi & regional languages)
- Map-based visual exploration using Google Maps API
- User reviews and ratings
- Travel itinerary planner
- Hotel and transport booking integrations

---

## 📋 Project Background

This project was developed as part of the **Unified Mentor** internship program, following the **"Incredible India"** PRD brief. It was built iteratively — starting from static HTML mockups, evolving into a fully component-based React architecture, and culminating in a connected Admin Panel and live deployment.

---

## 👤 Author

**Sameer**
B.Tech CSE Student, Maharishi Markandeshwar Deemed to be University

---

## 📄 License

This project was built for educational and internship purposes.