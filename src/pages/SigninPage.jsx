import { useState } from "react";
import { Box, TextField, Button, Typography, InputAdornment, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setStatus } from "../redux/authSlice";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

// MUI Icons
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import PersonIcon from "@mui/icons-material/Person";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function SignUpPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  // Toggle password visibility
  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  // Validation Schema
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  // React Query: Handle sign-up request
  const mutation = useMutation({
    mutationFn: async (userData) => {
      return axios.post("http://localhost:5000/api/signup", userData);
    },
    onSuccess: () => {
      dispatch(setStatus("User created successfully!"));
      setSuccessMessage("Account created successfully!"); // Show success message
      setErrorMessage(""); // Clear error message
    },
    onError: (error) => {
      console.log("Signup error:", error.response?.data); // Log the error response
    
      if (error.response && error.response.data) {
        if (error.response.data.error === "Email already exists") {
          setErrorMessage("Already mail exists");
        } else {
          setErrorMessage(error.response.data.error);
        }
      } else {
        setErrorMessage("Failed to sign up. Please try again.");
      }
    },
    
  });

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        mt: 12,
        mb: 4,
        p: 4,
        borderRadius: "12px",
        bgcolor: "white",
        boxShadow: 4,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Sign Up
      </Typography>

      <Formik
        initialValues={{ username: "", email: "", password: "", confirmPassword: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          console.log("Submitting data:", values);
          mutation.mutate(values);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            {/* Username Field */}
            <Field
              as={TextField}
              name="username"
              label="Username"
              fullWidth
              margin="normal"
              error={touched.username && !!errors.username}
              helperText={touched.username && errors.username}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />

            {/* Email Field */}
            <Field
              as={TextField}
              name="email"
              label="Email"
              fullWidth
              margin="normal"
              error={touched.email && !!errors.email}
              helperText={touched.email && errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />

            {/* Password Field */}
            <Field
              as={TextField}
              name="password"
              label="Password"
              fullWidth
              type={showPassword ? "text" : "password"}
              margin="normal"
              error={touched.password && !!errors.password}
              helperText={touched.password && errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleTogglePassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Confirm Password Field */}
            <Field
              as={TextField}
              name="confirmPassword"
              label="Confirm Password"
              fullWidth
              type={showPassword ? "text" : "password"}
              margin="normal"
              error={touched.confirmPassword && !!errors.confirmPassword}
              helperText={touched.confirmPassword && errors.confirmPassword}
            />

            {/* Submit Button */}
            <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
              Sign Up
            </Button>
            <Button
        variant="outlined"
        fullWidth
        sx={{ mt: 2 }}
        onClick={() => navigate("/login")}
      >
        Already have an account? Login
      </Button>

            {/* Display Error Message (Red) */}
            {errorMessage && (
              <Typography color="error" sx={{ mt: 2, textAlign: "center" }}>
                {errorMessage}
              </Typography>
            )}

            {/* Display Success Message (Green) */}
            {successMessage && (
              <Typography color="green" sx={{ mt: 2, textAlign: "center" }}>
                {successMessage}
              </Typography>
            )}
          </Form>
        )}
      </Formik>
    </Box>
  );
}

export default SignUpPage;
