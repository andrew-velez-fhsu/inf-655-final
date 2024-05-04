import { Link } from "react-router-dom";
import Login from "./Login";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Popover,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Margin } from "@mui/icons-material";
import { UserAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Header() {
  const { user } = UserAuth();
  const [anchorMenu, setAnchorMenu] = useState(null);

  const open = Boolean(anchorMenu);
  const id = open ? "menu-popover" : undefined;

  const handleMenuClick = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorMenu(null);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
        <AppBar
          position="static"
          sx={{ backgroundColor: "#fefefe", color: "#111111" }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Zoomy Buddy
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{ flexGrow: 1, fontStyle: "italic" }}
            >
              Looks like your best friend is gonna make a new friend!
            </Typography>
            <Login />
            <IconButton
              size="large"
              edge="start"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleMenuClick}
            >
              <MenuIcon />
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorMenu}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              <div>
                <nav>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/search">Search</Link>
                    </li>
                    {user && (
                      <li>
                        <Link to="profile">My Profile</Link>
                      </li>
                    )}
                  </ul>
                </nav>
              </div>
            </Popover>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
