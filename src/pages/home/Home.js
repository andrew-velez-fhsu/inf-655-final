import { Container, Paper, Typography } from "@mui/material";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import logo from "../../assets/logo.jpg";

export default function Home() {
  return (
    <>
      <Container maxWidth="md">
        <Paper>
          <Header />
          <img src={logo} alt="logo" />
          <Typography>Home Page</Typography>
          <Typography>Your Best Friend Wants a Buddy</Typography>
          <Typography>
            We know you do your best. You throw the ball. You go on walks. But
            no one plays with a dog like another dog. And ZoomBuddy will help
            you find a best buddy for your buddy. Because dogs that play
            together are happier, healthier, and love you more.
          </Typography>

          <Footer />
        </Paper>
      </Container>
    </>
  );
}
