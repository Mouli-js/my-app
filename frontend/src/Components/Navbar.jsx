import { Button, Container, AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { FaRegPlusSquare } from "react-icons/fa";
import React, { useContext } from "react";
import { ColorModeContext } from "../App.jsx";

const Navbar = () => {
  const colorMode = useContext(ColorModeContext);

  return (
    <AppBar position="static" color="default">
      <Container maxWidth="lg">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Product Store 🛒
            </Link>
          </Typography>
          <Button
            color="inherit"
            onClick={colorMode.toggleColorMode}
            sx={{ marginRight: 2 }}
          >
            Color Mode
          </Button>
          <Link to="/create" style={{ textDecoration: "none" }}>
            <Button color="default" startIcon={<FaRegPlusSquare />}>
              Create
            </Button>
          </Link>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;