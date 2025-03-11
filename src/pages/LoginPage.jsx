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
import { useDispatch, useSelector } from "react-redux";
import authReducer, { setStatus } from "../redux/authSlice";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

// MUI Icons
import { Person, Lock, Visibility, VisibilityOff } from "@mui/icons-material";

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const statusMessage = useSelector((state) => state.auth.status);

  // Toggle password visibility
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  // Validation Schema
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  // Handle login request with React Query
  const mutation = useMutation({
    mutationFn: (userData) => axios.post("http://localhost:5000/api/login", userData, { timeout: 5000 }),
    onSuccess: (response) => {
      dispatch(setStatus(response.data.message)); 
      navigate("/userFrontPage");
    },
    onError: () => {
      dispatch(setStatus("Invalid credentials"));
    },
  });

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        mt: 14,
        mb: 4,
        p: 4,
        border: "2px solid black",
        borderRadius: "8px",
        bgcolor: "white",
        boxShadow: 3,
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Login
      </Typography>

      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(values) => mutation.mutate(values)}
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
                    <Person />
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
