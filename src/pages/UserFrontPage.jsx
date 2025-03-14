import { Button, Typography, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";

const UserFrontPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
    dispatch(logout()); // Clear user session in Redux
    navigate("/login");
  };

  return (
    <Container>
      <Typography style={{marginTop: 100}} variant="h4">Welcome, User!</Typography>
      <Button variant="contained" color="secondary" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
};

export default UserFrontPage;