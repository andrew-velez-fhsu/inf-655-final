import {
  faFacebook,
  faInstagram,
  faSquareTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Divider, Grid, Stack, Typography } from "@mui/material";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <Typography align="center">ZoomBuddy.com</Typography>
        <Stack spacing={5} direction="row">
          <Item>
            <Typography align="center" variant="subtitle2">
              About
            </Typography>
          </Item>
          <Item>
            <Typography align="center" variant="subtitle2">
              <a href="mailto:a_velez4@mail.fhsu.edu">Contact</a>
            </Typography>
          </Item>
        </Stack>

        <Divider />
        <Stack spacing={3} direction="row">
          <Item>
            <FontAwesomeIcon icon={faSquareTwitter} />
          </Item>
          <Item>
            <FontAwesomeIcon icon={faSquareInstagram} />
          </Item>
          <Item>
            <FontAwesomeIcon icon={faSquareFacebook} />
          </Item>
        </Stack>
      </footer>
    </>
  );
}
