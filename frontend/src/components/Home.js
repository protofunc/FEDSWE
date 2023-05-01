import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import bg from "../images/bg.png";
import stars from "../images/stars.png";
import rev from "../images/review.png";

export default function Home() {
 
  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#113E6A',
          paddingTop: "2em",
          paddingBottom: "2em"
        }}
      >
        <img
          src={bg}
          alt="Background"
          style={{ height: '400px', maxWidth: '100%', margin: '0'}}
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
        }}
      >
        <img
          src={stars}
          alt="Background"
          style={{ height: '100px', margin: '0'}}
        />
        
      </Box>
      <Container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '5em',
          paddingTop: '2em'
        }}
      >
        <img
            src={rev}
            alt="Review"
            style={{ 
              borderRadius: '50%', 
              height: '200px', 
              margin: '0',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
              border: '2px solid white'
            }}
          />
          <h1 
          style={{ 
            fontFamily: "Arial",
            fontWeight: "bold",
            fontStyle: "italic",
            color: "white",
            textShadow: "2px 2px 4px #000000"
             }}>
              "Sheeesh, <span style={{ color: '#F0D687'}}>FIVE</span> stars! This website saved Dylan's dog and is healing the economy!"
          </h1>
      </Container>
    </Box>
  );
}
