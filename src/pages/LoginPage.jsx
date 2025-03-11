import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

// MUI Icons
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";

function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  // Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  // Handle login request
  const mutation = useMutation({
    mutationFn: async (userData) => {
      const response = await axios.post("http://localhost:5000/api/login", userData);
      return response.data;
    },
    onSuccess: (data) => {
      setStatusMessage(""); // Clear errors
      navigate("/userFrontPage"); // Redirect on success
    },
    onError: () => {
      setStatusMessage("Invalid credentials. Please try again.");
    },
  });

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        mt: 14,
        p: 4,
        mb:4,
        borderRadius: "8px",
        bgcolor: "white",
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>

      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => mutation.mutate(values)}
      >
        {({ errors, touched }) => (
          <Form>
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
                    <Email />
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
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={togglePasswordVisibility} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Submit Button */}
            <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
              Login
            </Button>
          </Form>
        )}
      </Formik>

      {/* Show login status message */}
      {statusMessage && (
        <Typography color="error" align="center" sx={{ mt: 2 }}>
          {statusMessage}
        </Typography>
      )}
    </Box>
  );
}

export default LoginPage;
