import { Link } from "react-router-dom";
import Login from "./Login";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Margin } from "@mui/icons-material";
import { UserAuth } from "../context/AuthContext";

export default function Header() {
  const { user } = UserAuth();
  return (
    <>
      <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
        <AppBar position="static" sx={{ backgroundColor: "#fefefe" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/">Home</Link>
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/search">Search</Link>
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {user && <Link to="/profile">My Profile</Link>}
            </Typography>
            <Login />
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
