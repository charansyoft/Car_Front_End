import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";
import UserFrontPage from "./pages/UserFrontPage";
import RequireAuth from "./components/RequireAuth";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import ViewProducts from "./components/ViewProducts";
import Bookings from "./components/Bookings";
import AddProducts from "./components/AddProducts";

// Create a QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/ViewProducts" element={<ViewProducts />} />
          <Route path="/Bookings" element={<Bookings />} />
          <Route path="/AddProducts" element={<AddProducts />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Route */}
          <Route element={<RequireAuth />}>
            <Route path="/user" element={<UserFrontPage />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
};

export default App;
