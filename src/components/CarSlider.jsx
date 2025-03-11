import car1 from "../assets/car1.jpg";
import car2 from "../assets/car2.jpg";
import car3 from "../assets/car3.jpg";
import { useState, useEffect } from "react";
import { Container, Box } from "@mui/material";




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

  export default CarSlider;