import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { AdminRoute, ProtectedRoute } from "./components/ProtectedRoute";

import Home from "./pages/Home";

import PackageManager from "./admin/PackageManager";
import GalleryManager from "./admin/GalleryManager";
import FAQManager from "./admin/FAQManager";
import TestimonialsManager from "./admin/TestimonialsManager";
import ContactManager from "./admin/ContactManager";
import Page from "./dashboard/page";
import AdminLogin from "./pages/AdminLogin";
import AdminRegister from "./pages/AdminRegister";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="/admin/register" element={<AdminRegister />} />

          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Page />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/packages"
            element={
              <AdminRoute>
                <PackageManager />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/gallery"
            element={
              <AdminRoute>
                <GalleryManager />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/faqs"
            element={
              <AdminRoute>
                <FAQManager />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/testimonials"
            element={
              <AdminRoute>
                <TestimonialsManager />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/contact"
            element={
              <AdminRoute>
                <ContactManager />
              </AdminRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
