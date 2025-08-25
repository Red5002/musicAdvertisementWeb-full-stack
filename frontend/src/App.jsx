import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/admin/login";
import Home from "./pages/home";
import AdminPanel from "./pages/admin/admin";
import NotFound from "./pages/not found";
import ProtectedRoute from "./components/ProtectedRoutes";
import ContentForm from "./components/postForm";
import GetAllPost from "./pages/allposts";
import GetPost from "./pages/post";

function Logout() {
  localStorage.clear();
  return <Navigate to="/" />;
}

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />  
          <Route path="/admin/posts/:id?" element={
            <ProtectedRoute>
              <ContentForm resourceType="post" />
            </ProtectedRoute>
          } />
          <Route path="/admin/posts/" element={
            <ProtectedRoute>
              <ContentForm resourceType="post" />
            </ProtectedRoute>
          } />
           <Route path="/admin/songs/:id?" element={
            <ProtectedRoute>
             <ContentForm resourceType="song" />
            </ProtectedRoute>
           } />
           <Route path="/admin/songs/" element={
            <ProtectedRoute>
             <ContentForm resourceType="song" />
            </ProtectedRoute>
           } />
          <Route path="/admin/videos/:id?" element={
            <ProtectedRoute>
              <ContentForm resourceType="video" />
            </ProtectedRoute>
          } />
          <Route path="/admin/videos/" element={
            <ProtectedRoute>
              <ContentForm resourceType="video" />
            </ProtectedRoute>
          } />
          <Route path="/admin/beats/:id?" element={
            <ProtectedRoute>
              <ContentForm resourceType="beat" />
            </ProtectedRoute>
          } />
          <Route path="/admin/beats/" element={
            <ProtectedRoute>
              <ContentForm resourceType="beat" />
            </ProtectedRoute>
          } />

          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/" element={<Home />} />
          <Route path="/posts/:type" element={<GetAllPost />} />
          <Route path="/post/:id" element={<GetPost />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
