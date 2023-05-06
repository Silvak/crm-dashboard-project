import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AuthProvider from "./context/authContext";
import ProtectedRoute from "./components/ProtectedRoute";
import UploadFile from "./components/UploadFile";
import Dashboard from "./components/Dashboard";
import Tables from "./components/Tables";
import Projects from "./components/Projects";

function App() {
  return (
    <div className="bg-[#eaeaea] h-screen w-screen">
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upload" element={<UploadFile />} />
            <Route path="/table" element={<Tables />} />
            <Route path="/project" element={<Projects />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
