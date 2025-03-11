import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import UserFrontPage from "./components/userFrontPage";
import LoginPage from "./pages/LoginPage";
import SigninPage from "./pages/SigninPage";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SigninPage />} />
            <Route path="/userFrontPage" element={<UserFrontPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
