import { useState, forwardRef } from "react";
import { Box, TextField, Button, Typography, Paper, InputAdornment } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../redux/contactSlice";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import MessageIcon from "@mui/icons-material/Message";

// Wrap component with forwardRef
const ContactForm = forwardRef((props, ref) => {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.contact.status);

  const mutation = useMutation({
    mutationFn: async (contactData) => {
      await axios.post("http://localhost:5000/api/contact", contactData);
    },
    onSuccess: () => {
      dispatch(setStatus("Message sent successfully!"));
      formik.resetForm();
    },
    onError: () => {
      dispatch(setStatus("Failed to send message. Please try again."));
    },
  });

  // Form Validation Schema
  const formik = useFormik({
    initialValues: { name: "", gmail: "", msg: "" },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      gmail: Yup.string().email("Invalid email").required("Email is required"),
      msg: Yup.string().required("Message cannot be empty"),
    }),
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  return (
    <Box ref={ref} sx={{ my: 6, display: "flex", justifyContent: "center" }}>
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: "500px",
          p: 4,
          backgroundColor: "#fff",
          border: "1px solid #333",
          borderRadius: "12px",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#333" }}>
          Contact Us
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          {/* Name Field */}
          <TextField
            label="Name"
            fullWidth
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            {...formik.getFieldProps("name")}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          {/* Email Field */}
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            {...formik.getFieldProps("gmail")}
            error={formik.touched.gmail && Boolean(formik.errors.gmail)}
            helperText={formik.touched.gmail && formik.errors.gmail}
          />

          {/* Message Field */}
          <TextField
            label="Message"
            fullWidth
            multiline
            rows={4}
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MessageIcon />
                </InputAdornment>
              ),
            }}
            {...formik.getFieldProps("msg")}
            error={formik.touched.msg && Boolean(formik.errors.msg)}
            helperText={formik.touched.msg && formik.errors.msg}
          />

          {/* Submit Button */}
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              mt: 2,
              backgroundColor: "#333",
              color: "#FFD700",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#555" },
            }}
          >
            Send Message
          </Button>
        </form>

        {/* Status Message */}
        {status && (
          <Typography variant="body1" align="center" sx={{ mt: 2, color: status.includes("success") ? "green" : "red" }}>
            {status}
          </Typography>
        )}
      </Paper>
    </Box>
  );
});

export default ContactForm;
