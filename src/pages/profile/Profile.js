import { Snackbar, Stack, Typography } from "@mui/material";
import Masterpage from "../../components/Masterpage";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Button from "@mui/material/Button";
import { UserAuth } from "../../context/AuthContext";
import { IconPhoto, IconUserScan } from "@tabler/icons-react";
import { styled } from "@mui/material/styles";
import { Storage } from "../../context/StorageContext";
import { AddAPhoto } from "@mui/icons-material";

export default function Profile() {
  const { user, updateUser } = UserAuth();
  const { uploadFile } = Storage();

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [address1, setAddress1] = useState(user.address1 ? user.address1 : "");
  const [address2, setAddress2] = useState(user.address2 ? user.address2 : "");
  const [city, setCity] = useState(user.city ? user.city : "");
  const [state, setState] = useState(user.state ? user.state : "");
  const [postalCode, setPostalCode] = useState(
    user.postalCode ? user.postalCode : ""
  );

  const [errFirstName, setErrFirstName] = useState(false);
  const [errLastName, setErrLastName] = useState(false);
  const [errEmail, setErrEmail] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userRecord = {
      ...user,
      firstName,
      lastName,
      email,
      address1,
      address2,
      city,
      state,
      postalCode,
    };
    await updateUser(userRecord);
    setIsSaved(true);
  };

  const getProfilePicture = () => {
    if (user.profileUrl) {
      return <img width="100%" src={user.profileUrl} alt="Profile" />;
    } else {
      return (
        <IconUserScan color="gray" stroke={1} width="100%" height="100%" />
      );
    }
  };

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  const handleProfileUpload = async (event) => {
    const file = event.target.files[0];
    try {
      const profileUrl = await uploadFile(file);
      console.log("return success from context.", profileUrl);
      //add to profile
      const profile = { ...user, profileUrl };
      await updateUser(profile);
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <Masterpage title="My Profile">
      <Typography variant="h5">Tell us about your bad self!</Typography>
      <Typography>
        In order to make sure your visible to others, please provide the
        following information
      </Typography>
      <Grid container spacing={2} direction="row" alignItems="stretch">
        <Grid item xs={12} md={4}>
          <Paper sx={{ minHeight: "100%", padding: "20px" }}>
            <Stack alignItems="center">
              {getProfilePicture()}
              <Button
                component="label"
                variant="contained"
                startIcon={<AddAPhoto />}
              >
                Select new profile picture
                <VisuallyHiddenInput
                  type="file"
                  accept=".jpg, .jpeg, .png, .gif"
                  onChange={handleProfileUpload}
                />
              </Button>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ minHeight: "100%", padding: "20px" }}>
            <form noValidate onSubmit={handleSubmit}>
              <TextField
                label="First Name"
                variant="outlined"
                value={firstName}
                fullWidth
                required
                onChange={(e) => setFirstName(e.target.value)}
                error={errFirstName}
                sx={{ marginBottom: "1rem" }}
              />
              <TextField
                label="Last Name"
                variant="outlined"
                value={lastName}
                fullWidth
                required
                onChange={(e) => setLastName(e.target.value)}
                error={errLastName}
                sx={{ marginBottom: "1rem" }}
              />
              <TextField
                label="Email address"
                variant="outlined"
                value={email}
                fullWidth
                required
                onChange={(e) => setEmail(e.target.value)}
                error={errEmail}
                disabled={true}
                sx={{ marginBottom: "1rem" }}
              />
              <TextField
                label="Address 1"
                variant="outlined"
                value={address1}
                fullWidth
                onChange={(e) => setAddress1(e.target.value)}
                sx={{ marginBottom: "1rem" }}
              />
              <TextField
                label="Address 2"
                variant="outlined"
                value={address2}
                fullWidth
                onChange={(e) => setAddress2(e.target.value)}
                sx={{ marginBottom: "1rem" }}
              />
              <TextField
                label="City"
                variant="outlined"
                value={city}
                fullWidth
                onChange={(e) => setCity(e.target.value)}
                sx={{ marginBottom: "1rem" }}
              />

              <TextField
                label="State"
                variant="outlined"
                value={state}
                fullWidth
                onChange={(e) => setState(e.target.value)}
                sx={{ marginBottom: "1rem" }}
              />

              <TextField
                label="ZIP Code"
                variant="outlined"
                value={postalCode}
                fullWidth
                onChange={(e) => setPostalCode(e.target.value)}
                sx={{ marginBottom: "1rem" }}
              />
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
              <Snackbar
                open={isSaved}
                autoHideDuration={5000}
                onClose={() => setIsSaved(false)}
                message="Profile saved!"
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              />
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Masterpage>
  );
}
