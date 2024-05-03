import { Input } from "@mui/icons-material";
import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import Popover from "@mui/material/Popover";
import { UserAuth } from "../context/AuthContext";

export default function Login() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, logout, user } = UserAuth();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLogout = async () => {
    console.log("Current User:", user);
    await logout();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "login-popover" : undefined;

  const handleLogin = async (e) => {
    e.preventDefault();

    //reset valication
    setErrorEmail(false);
    setErrorPassword(false);

    if (email === "") setErrorEmail(true);
    if (password === "") setErrorPassword(true);

    if (email && password) {
      console.log(`email: ${email}, password: ${password}`);

      try {
        let user = await signIn(email, password);
        console.log(user);
        setAnchorEl(null);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const authenticationButton = () => {
    if (user) {
      return (
        <Button aria-describedby={id} variant="text" onClick={handleLogout}>
          Log out
        </Button>
      );
    } else {
      return (
        <>
          <Button aria-describedby={id} variant="text" onClick={handleClick}>
            Log in
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <div className="modal">
              <Typography>Login to ZoomBuddy.com</Typography>
              <form onSubmit={handleLogin} noValidate>
                <TextField
                  label="Email address"
                  variant="outlined"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  error={errorEmail}
                />
                <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  required
                  fullWidth
                  onChange={(e) => setPassword(e.target.value)}
                  error={errorPassword}
                />

                <Button type="submit" variant="contained">
                  Login
                </Button>
              </form>
              <Typography>
                Don't have an account?{" "}
                <Link to="/profile/create">Create a new account</Link>
              </Typography>
            </div>
          </Popover>
        </>
      );
    }
  };

  return <div>{authenticationButton()}</div>;
}
