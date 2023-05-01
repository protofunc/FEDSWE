import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import logo from "../images/blk_nbg.png";
import axios from "axios";

export default function Registration() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [cPassword, setCPassword] = useState("");

  const handleClick = async () => {
    if (password !== cPassword) {
      console.log("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/create", {
        username,
        password,
      });
      console.log(response.data);
      setUsername("");
      setPassword("");
      setCPassword("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          backgroundColor: "white",
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={logo}
          alt="Sign in"
          style={{ height: "100px", marginBottom: "16px" }}
        />
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            // required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            // required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            // required
            fullWidth
            name="cPassword"
            label="Confirm Password"
            type="password"
            id="cPassword"
            autoComplete="current-password"
            value={cPassword}
            onChange={(e) => setCPassword(e.target.value)}
          />
          <Button
            onClick={handleClick}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create Account
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
