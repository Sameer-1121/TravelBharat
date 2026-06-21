import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ─── DATA PROVIDER ────────────────────────────────────────────
import { PlacesDataProvider } from "./components/hooks/PlacesDataContext";

// ─── PUBLIC PAGES ─────────────────────────────────────────────
import Home from "./Pages/Home";
import States from "./Pages/States";
import StatePage from "./Pages/StatePage";
import PlaceDetail from "./Pages/PlaceDetail";
import Categories from "./Pages/Categories";
import Destinations from "./Pages/Destinations";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import NotFound from "./Pages/NotFound";

// ─── ADMIN ────────────────────────────────────────────────────
import { AdminAuthProvider } from "./components/context/AdminAuthContext";
import ProtectedAdminRoute from "./components/admin/ProtectedAdminRoute";
import AdminLogin from "./Pages/admin/AdminLogin";
import AdminDashboard from "./Pages/admin/AdminDashboard";
import AdminPlacesList from "./Pages/admin/AdminPlacesList";
import AdminPlaceForm from "./Pages/admin/AdminPlaceForm";

const App = () => {
  return (
    <Router>
      <PlacesDataProvider>
        <AdminAuthProvider>
          <Routes>

            {/* ── PUBLIC ROUTES ── */}
            <Route path="/" element={<Home />} />
            <Route path="/states" element={<States />} />
            <Route path="/state/:stateId" element={<StatePage />} />
            <Route path="/place/:placeId" element={<PlaceDetail />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/destinations" element={<Destinations />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* ── ADMIN LOGIN (not protected) ── */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* ── ADMIN DASHBOARD ── */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedAdminRoute>
                  <AdminDashboard />
                </ProtectedAdminRoute>
              }
            />

            {/* ── ALL PLACES LIST ── */}
            <Route
              path="/admin/places"
              element={
                <ProtectedAdminRoute>
                  <AdminPlacesList />
                </ProtectedAdminRoute>
              }
            />

            {/* ── ADD NEW PLACE ── */}
            <Route
              path="/admin/places/new"
              element={
                <ProtectedAdminRoute>
                  <AdminPlaceForm />
                </ProtectedAdminRoute>
              }
            />

            {/* ── EDIT PLACE ── */}
            <Route
              path="/admin/places/edit/:placeId"
              element={
                <ProtectedAdminRoute>
                  <AdminPlaceForm />
                </ProtectedAdminRoute>
              }
            />

            {/* ── 404 — always last ── */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </AdminAuthProvider>
      </PlacesDataProvider>
    </Router>
  );
};

export default App;