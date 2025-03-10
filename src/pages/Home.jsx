import { useRef, useState, useEffect } from "react";
import { Box, Container, Typography, Grid} from "@mui/material";
import Navbar from "../components/Navbar";
import car1 from "../assets/car1.jpg";
import car2 from "../assets/car2.jpg";
import car3 from "../assets/car3.jpg";
import ContactForm from "../components/ContactFrom";


// 🚗 **Car Slider Component** (Move this above Home)
function CarSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carImages = [car1, car2, car3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === carImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: "90px", overflow: "hidden" }}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "400px",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* 🔹 Blurred Background Image */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${carImages[currentIndex]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(12px)",
            zIndex: 1,
          }}
        />

        {/* 🔹 Sliding Car Images */}
        <Box
          sx={{
            position: "relative",
            display: "flex",
            transition: "transform 0.8s ease-in-out",
            transform: `translateX(-${currentIndex * 100}%)`,
            width: `${carImages.length * 100}%`,
            zIndex: 2,
          }}
        >
          {carImages.map((src, index) => (
            <Box
              key={index}
              sx={{
                flex: "0 0 100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <img
                src={src}
                alt={`Car ${index + 1}`}
                style={{
                  width: "auto",
                  maxWidth: "80%",
                  height: "400px",
                  maxHeight: "80%",
                  borderRadius: 10,
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
                }}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Container>
  );
}

// 🏠 **Home Component**
function Home() {
  const contactRef = useRef(null); // Reference for Contact section
  const aboutRef = useRef(null); // Reference for About Us section

  const scrollToContact = () => {
    if (contactRef.current) {
      const yOffset = -20; // Adjust to stop 20px before the top
      const y = contactRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };
  
  const scrollToAbout = () => {
    if (aboutRef.current) {
      const yOffset = -20; // Adjust to stop 20px before the top
      const y = aboutRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };
  

  return (
    <Container maxWidth="lg">
      <Navbar scrollToContact={scrollToContact} scrollToAbout={scrollToAbout} />
      <CarSlider />
      <AboutUs aboutRef={aboutRef} />
      <ContactForm />
    </Container>
  );
}

// ℹ️ **About Us Section**
function AboutUs({ aboutRef }) {
  return (
<Box ref={aboutRef} sx={{ my: 4, pt: "80px", mt: "-60px" }}>
<Typography variant="h4" align="center" sx={{ fontWeight: "bold", mb: 2 }}>
        About Us
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {["24/7 Customer Care", "Affordable Pricing", "Top Quality Service"].map((service, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Box sx={{
              backgroundColor: "#f5f5f5",
              p: 3,
              borderRadius: 2,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
              fontFamily: "'Playfair Display', serif",
            }}>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {service}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}




export default Home;


