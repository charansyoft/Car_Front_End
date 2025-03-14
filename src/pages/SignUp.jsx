import { useState } from "react";
import { TextField, Button, Typography, Container } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values) => {
      try {
        console.log("Sending Data:", values); // Log the data being sent
        const response = await axios.post("http://localhost:5000/api/auth/signup", values);
        console.log("Response:", response.data); // Log the response
        navigate("/Login");
      } catch (err) {
        console.error("Signup Error:", err.response);
        setError(err.response?.data?.message || "Something went wrong");
      }
    },
    
    
  });

  return (
    <Container maxWidth="xs" style={{marginTop:120}}>
      <Typography variant="h4">Sign Up</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form style={{marginBottom:30}} onSubmit={formik.handleSubmit}>
        <TextField fullWidth label="Username" {...formik.getFieldProps("username")} margin="normal" />
        <TextField fullWidth label="Email" {...formik.getFieldProps("email")} margin="normal" />
        <TextField fullWidth type="password" label="Password" {...formik.getFieldProps("password")} margin="normal" />
        <TextField
          fullWidth
          type="password"
          label="Confirm Password"
          {...formik.getFieldProps("confirmPassword")}
          margin="normal"
        />
        <Button fullWidth type="submit" variant="contained" sx={{ mt: 2 }}>
          Register
        </Button>
      </form>
    </Container>
  );
};

export default Signup;
