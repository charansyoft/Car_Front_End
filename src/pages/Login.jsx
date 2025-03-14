import { useState } from "react";
import { TextField, Button, Typography, Container } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post("http://localhost:5000/api/auth/login", values, { withCredentials: true });
        const { token, user } = response.data;

        localStorage.setItem("token", token); // Store token
        console.log("Token stored:", token);

        dispatch(setUser(user)); // Save user data in Redux
        navigate("/UserFrontPage");
      } catch (err) {
        setError(err.response?.data?.message || "Invalid credentials");
      }
    },
  });

  return (
    <Container maxWidth="xs">
      <Typography style={{ marginTop: "120px" }} variant="h4">Login</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={formik.handleSubmit} style={{ marginBottom: "50px" }}>
        <TextField fullWidth label="Email" {...formik.getFieldProps("email")} margin="normal" />
        <TextField fullWidth type="password" label="Password" {...formik.getFieldProps("password")} margin="normal" />
        <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>Login</Button>
      </form>
    </Container>
  );
};

export default Login;
