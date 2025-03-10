import { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";

function ContactForm() {
  const [name, setName] = useState("");
  const [gmail, setGmail] = useState("");
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactData = {
      name,
      gmail,
      msg,
    };

    try {
      const response = await axios.post("http://localhost:5000/api/contact", contactData);
      setStatus("Message sent successfully!");
      setName("");
      setGmail("");
      setMsg("");
    } catch (err) {
      setStatus("Failed to send message. Please try again.");
    }
  };

  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h4" align="center" sx={{ mb: 2 }}>
        Contact Us
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Gmail"
          fullWidth
          margin="normal"
          value={gmail}
          onChange={(e) => setGmail(e.target.value)}
        />
        <TextField
          label="Message"
          fullWidth
          multiline
          rows={4}
          margin="normal"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <Button variant="contained" type="submit" fullWidth>
          Submit
        </Button>
      </form>

      {status && (
        <Typography
          variant="body1"
          align="center"
          sx={{
            mt: 2,
            color: status.includes("success") ? "green" : "red",
          }}
        >
          {status}
        </Typography>
      )}
    </Box>
  );
}

export default ContactForm;
