import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import logo from "../images/blk_nbg.png";
import axios from "axios";

export default function MyProfile() {
  const [username, setUsername] = useState("");
  const [nUsername, setNUsername] = useState("");
  const [cUsername, setCUsername] = useState("");

  const handleDelete = async () => {
    try {
      // Get user ID from API
      const uidResponse = await axios.get(
        `http://localhost:5000/api/users?username=${username}`
      );
      const users = uidResponse.data;
      if (users.length === 0) {
        console.log(`User ${username} not found.`);
        return;
      }
      const userId = users[0].id;
      const response = await axios.delete(
        `http://localhost:5000/api/delete/${userId}`
      );
      console.log(response.data);
  
      // reset the form after successful delete
      setUsername("");
      setNUsername("");
      setCUsername("");
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleUpdate = async (event) => {
    event.preventDefault();

    if (nUsername !== cUsername) {
      console.log("Usernames do not match");
      return;
    }

    try {
      // Get user ID from API
      const uidResponse = await axios.get(
        `http://localhost:5000/api/users?username=${username}`
      );
      const users = uidResponse.data;
      if (users.length === 0) {
        console.log(`User ${username} not found.`);
        return;
      }
      const userId = users[0].id;

      // Update user account
      const response = await axios.put(
        `http://localhost:5000/api/update/${userId}`,
        {
          username: nUsername,
        }
      );
      console.log(response.data);

      // reset the form after successful update
      setUsername("");
      setNUsername("");
      setCUsername("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
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
        {/* <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}> */}
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            // required
            fullWidth
            id="username"
            label="Current Username"
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
          <TextField
            margin="normal"
            // required
            fullWidth
            name="nUsername"
            label="New Username"
            id="nUsername"
            type="text"
            value={nUsername}
            onChange={(e) => setNUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            // required
            fullWidth
            name="cUsername"
            label="Confirm Username"
            id="cUsername"
            type="text"
            value={cUsername}
            onChange={(e) => setCUsername(e.target.value)}
          />
          <Box sx={{ display: "flex", justifyContent: "space-around" }}>
            <Button
              type="button"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleUpdate}
            >
              Update Account
            </Button>
            <Button
              type="button"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleDelete}
            >
              Delete Account
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
