// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/index.css";
import api from "./api/axios";
import AppRouter from "./router/AppRouter";
import { AuthProvider } from "./auth/AuthProvider"; 

const token = localStorage.getItem("accessToken");
if (token) {
  api.defaults.headers.Authorization = `Bearer ${token}`;
}
createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  // </StrictMode>
);

