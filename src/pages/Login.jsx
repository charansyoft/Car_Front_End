import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

// ✅ Validation Schema
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", values);
      localStorage.setItem("token", res.data.token);
      
      // ✅ Check if the email is "Admin123@gmail.com"
      if (values.email === "Admin123@gmail.com") {
        navigate("/AdminFrontPage");
      } else {
        navigate("/UserFrontPage");
      }
    } catch (error) {
      alert("Login Failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Navbar />
      <Container maxWidth="xs">
        <Box 
          sx={{ 
            display: "flex", flexDirection: "column", alignItems: "center", 
            mt: 14, mb: 4, p: 3, boxShadow: 3, borderRadius: 2
          }}
        >
          <Typography variant="h5" gutterBottom>
            Login
          </Typography>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ errors, touched, handleChange, handleBlur, values, isSubmitting }) => (
              <Form style={{ width: "100%" }}>
                {/* ✅ Email Field */}
                <Field
                  as={TextField}
                  label="Email"
                  name="email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />

                {/* ✅ Password Field */}
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
                />

                {/* ✅ Login Button */}
                <Button 
                  type="submit"
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  sx={{ mt: 2 }} 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
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

export default Login;