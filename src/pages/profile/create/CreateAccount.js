import { Button, Paper, TextField, Typography } from "@mui/material";
import Masterpage from "../../../components/Masterpage";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";

export default function CreateAccount() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const [errFirstName, setErrFirstName] = useState(false);
  const [errLastName, setErrLastName] = useState(false);
  const [errEmail, setErrEmail] = useState(false);
  const [errPassword, setErrPassword] = useState(false);
  const [errConfirmedPassword, setErrConfirmedPassword] = useState(false);

  const navigate = useNavigate();

  const { registerNewUser } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Attempting registration");

    setErrFirstName(firstName === "");
    setErrLastName(lastName === "");
    setErrEmail(email === "");
    setErrPassword(password === "");
    setErrConfirmedPassword(confirmedPassword === "");

    if (
      firstName &&
      lastName &&
      email &&
      password &&
      confirmedPassword &&
      password === confirmedPassword
    ) {
      try {
        console.log("Valid data");

        const reg = {
          apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
          authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
          projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
          storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
          appId: process.env.REACT_APP_FIREBASE_APP_ID,
        };
        console.log(reg);

        await registerNewUser(email, password);
        navigate("/");
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <Masterpage title="Create a Zoombuddy Account">
      <Typography variant="body1">
        Your doggo thanks you for taking the first step towards awesome
        playtime!
      </Typography>
      <Typography variant="body1">Let's get to know each other!</Typography>
      <Typography variant="body2">All fields required</Typography>
      <Paper className="form">
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            className="field"
            label="First Name"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setFirstName(e.target.value)}
            error={errFirstName}
          />
          <TextField
            className="field"
            label="Last Name"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setLastName(e.target.value)}
            error={errLastName}
          />
          <TextField
            label="Email address"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setEmail(e.target.value)}
            error={errEmail}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setPassword(e.target.value)}
            error={errPassword}
          />
          <TextField
            label="Confirm Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            onChange={(e) => setConfirmedPassword(e.target.value)}
            error={errConfirmedPassword}
          />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </form>
        <Typography>
          <Link to="/">Go back to homepage</Link>
        </Typography>
      </Paper>
    </Masterpage>
  );
}
