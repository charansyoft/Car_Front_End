import { Container } from "@mui/material";
import Navbar from "../components/Navbar";
import { useRef } from "react";
import ContactForm from "../components/ContactFrom";
import CarSlider from "../components/CarSlider";
import AboutUs from "../components/AboutUs";

// 🏠 **Home Component**
function Home() {
  const contactRef = useRef(null); // Reference for Contact section
  const aboutRef = useRef(null); // Reference for About Us section

  const scrollToContact = () => {
    if (contactRef.current) {
      const yOffset = -100; // Adjust to stop 20px before the top
      const y =
        contactRef.current.getBoundingClientRect().top +
        window.scrollY +
        yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const scrollToAbout = () => {
    if (aboutRef.current) {
      const yOffset = -20; // Adjust to stop 20px before the top
      const y =
        aboutRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Container maxWidth="lg">
      <Navbar
        scrollToTop={scrollToTop}
        scrollToContact={scrollToContact}
        scrollToAbout={scrollToAbout}
      />
      <CarSlider />
      <AboutUs ref={aboutRef} />
      <ContactForm ref={contactRef} />
    </Container>
  );
}

export default Home;


