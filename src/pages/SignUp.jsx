import { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { TextField, Button, Container, Typography, Box, InputAdornment } from "@mui/material";
import { Person, Email, Lock } from "@mui/icons-material";
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"

const Signup = () => {
  // Validation Schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleSignup = async (values, { setSubmitting }) => {
    try {
      await axios.post("http://localhost:5000/api/auth/signup", values);
      alert("Signup Successful");
    } catch (error) {
      alert("Signup Failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div >
      <Navbar />
      <Container maxWidth="xs" >
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 14,mb: 4, p: 3, boxShadow: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          Sign Up
        </Typography>

        <Formik
          initialValues={{ name: "", email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSignup}
        >
          {({ errors, touched, handleChange, handleBlur, values, isSubmitting }) => (
            <Form style={{ width: "100%" }}>
              {/* Name Field */}
              <Field
                as={TextField}
                label="Name"
                name="name"
                fullWidth
                margin="normal"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
                error={touched.name && Boolean(errors.name)}
                helperText={touched.name && errors.name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Email Field */}
              <Field
                as={TextField}
                label="Email"
                name="email"
                type="email"
                fullWidth
                margin="normal"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={touched.email && Boolean(errors.email)}
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
                label="Password"
                name="password"
                type="password"
                fullWidth
                margin="normal"
                variant="outlined"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock />
                    </InputAdornment>
                  ),
                }}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Signing up..." : "Sign Up"}
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
    <Footer />
    </div>
    
  );
};

export default Signup;
