import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";
import {
  AppBar,
  Box,
  Divider,
  IconButton,
  Popover,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { UserAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Header() {
  const { logout, getUserId } = UserAuth();
  const [anchorMenu, setAnchorMenu] = useState(null);

  const navigate = useNavigate();

  const open = Boolean(anchorMenu);
  const id = open ? "menu-popover" : undefined;

  const handleMenuClick = (event) => {
    setAnchorMenu(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorMenu(null);
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, marginBottom: 2 }}>
        <AppBar
          position="static"
          sx={{ backgroundColor: "#fefefe", color: "#111111" }}
        >
          <Toolbar>
            <Typography
              className="title"
              variant="h3"
              component="h1"
              sx={{ flexGrow: 1 }}
            >
              Zoomy Buddy
            </Typography>
            <Typography
              className="subTitle"
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
                <nav className="navigation">
                  <ul>
                    <li>
                      <Link className="navItem" to="/">
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link className="navItem" to="/search">
                        Search
                      </Link>
                    </li>
                    {getUserId() && (
                      <>
                        <li>
                          <Link className="navItem" to="/profile">
                            My Profile
                          </Link>
                        </li>
                        <li>
                          <Link className="navItem" to="/buddies">
                            My Buddies
                          </Link>
                        </li>
                        <li>
                          <Divider />
                          <Button
                            aria-describedby={id}
                            variant="text"
                            onClick={handleLogout}
                          >
                            Log out
                          </Button>
                        </li>
                      </>
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
