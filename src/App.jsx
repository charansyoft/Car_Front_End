import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import UserFrontPage from "./components/userFrontPage";
import LoginPage from "./pages/LoginPage";
import SigninPage from "./pages/SigninPage";
import Products from "./components/Products";
import ViewProducts from "./components/ViewProducts";
import Bookings from "./components/Bookings";
import AddProducts from "./components/AddProducts";

// Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SigninPage />} />
          <Route path="/userFrontPage" element={<UserFrontPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/ViewProducts" element={<ViewProducts />} />
          <Route path="/Bookings" element={<Bookings />} />
          <Route path="/AddProducts" element={<AddProducts />} />
        </Routes>
        <Footer />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
