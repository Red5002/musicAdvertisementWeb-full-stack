import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/admin/login";
import Home from "./pages/home";
import AdminPanel from "./pages/admin/admin";
import NotFound from "./pages/not found";
import ProtectedRoute from "./components/ProtectedRoutes";
import ContentForm from "./components/postForm";
import ContentListPage from "@/pages/admin/contentListPage";
import { ThemeProvider } from "next-themes";

function Logout() {
  localStorage.clear();
  return <Navigate to="/" />;
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <BrowserRouter>
      <Routes>
        {/* Admin dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        {/* Dynamic create/edit for all resource types */}
        <Route
          path="/admin/create/:resourceType"
          element={
            <ProtectedRoute>
              <ContentForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/edit/:resourceType/:id"
          element={
            <ProtectedRoute>
              <ContentForm />
            </ProtectedRoute>
          }
        />

        {/* List all items of a resource type (posts, songs, beats, videos) */}
        <Route
          path="/admin/:resourceType"
          element={
            <ProtectedRoute>
              <ContentListPage />
            </ProtectedRoute>
          }
        />

        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        {/* Public routes */}
        <Route path="/" element={<Home />} />

        {/* Catch-all */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
