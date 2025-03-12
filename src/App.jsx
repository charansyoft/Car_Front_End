import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import UserFrontPage from "./components/userFrontPage";
import LoginPage from "./pages/LoginPage";
import SigninPage from "./pages/SigninPage";
import Products from "./components/Products";
import ViewProducts from "./components/viewProducts";
import AddProducts from "./components/AddProducts";
import Bookings from "./components/Bookings";


// Create a QueryClient instance
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}> {/* Ensure the QueryClientProvider is here */}
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SigninPage />} />
          <Route path="/userFrontPage" element={<UserFrontPage />} />
          <Route path="/products" element={<Products />} />
          <Route path="/AddProducts" element={<AddProducts/>} />
          <Route path="/ViewProducts" element={<ViewProducts/>} />
          <Route path="/Bookings" element={<Bookings/>} />

        </Routes>
        <Footer />
      </Router>
    </QueryClientProvider> 
  );
}

export default App;
