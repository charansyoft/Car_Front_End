import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AdminAddProducts from "./components/Admin/AdminAddProducts.jsx";
import AdminEditProduct from "./components/Admin/AdminEditProducts.jsx";
import AdminViewProducts from "./components/Admin/AdminViewProducts.jsx";
import RequireAuth from "./components/RequireAuth";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import UserFrontPage from "./pages/UserFrontPage.jsx";
import AdminFrontPage from "./pages/AdminFrontPage.jsx";

// Create a QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Route */}
          <Route element={<RequireAuth />}>
            <Route path="/UserFrontPage" element={<UserFrontPage />} />
            <Route path="/AdminFrontPage" element={<AdminFrontPage />} />
            <Route path="/AdminAddProducts" element={<AdminAddProducts />} />
            <Route path="/AdminViewProducts" element={<AdminViewProducts />} />
            <Route path="/edit-product/:id" element={<AdminEditProduct />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
