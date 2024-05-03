import { Typography } from "@mui/material";

import logo from "../../assets/logo.jpg";
import Masterpage from "../../components/Masterpage";

export default function Home() {
  return (
    <>
      <Masterpage title="ZoomBuddy Home">
        <img src={logo} alt="logo" />
        <Typography>Your Best Friend Wants a Buddy</Typography>
        <Typography>
          We know you do your best. You throw the ball. You go on walks. But no
          one plays with a dog like another dog. And ZoomBuddy will help you
          find a best buddy for your buddy. Because dogs that play together are
          happier, healthier, and love you more.
        </Typography>
      </Masterpage>
    </>
  );
}
