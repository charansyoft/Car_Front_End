import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import UserFrontPage from "./components/userFrontPage";
import LoginPage from "./pages/LoginPage";
import SigninPage from "./pages/SigninPage";
import Products from "./components/Products";
import AddProducts from "./components/addProducts";
import ViewProducts from "./components/viewProducts";

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
          <Route path="/addProducts" element={<AddProducts/>} />
          <Route path="/viewProducts" element={<ViewProducts/>}/>
        </Routes>
        <Footer />
      </Router>
    </QueryClientProvider>
  );
}

export default App;
