import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./components/Products";
import ViewProducts from "./components/ViewProducts";
import Bookings from "./components/Bookings";
import AddProducts from "./components/AddProducts";
import Login from "./pages/Login"
import Signup from "./pages/SignUp";
import UserFrontPage from "./pages/UserFrontPage";


// Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/ViewProducts" element={<ViewProducts />} />
          <Route path="/Bookings" element={<Bookings />} />
          <Route path="/AddProducts" element={<AddProducts />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<Signup />} />
          <Route path="/UserFrontPage" element={<UserFrontPage />} />

        </Routes>
        <Footer />
      </Router>
    </QueryClientProvider>
  );
}

export default App;