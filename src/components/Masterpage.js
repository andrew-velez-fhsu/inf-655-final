import { Container, Paper, Typography } from "@mui/material";
import Footer from "./Footer";
import Header from "./Header";

export default function Masterpage({ title, children }) {
  return (
    <Container maxWidth="md">
      <Paper>
        <Header />
        <Container>
          {title && <Typography variant="h4">{title}</Typography>}
          {children}
        </Container>
        <Footer />
      </Paper>
    </Container>
  );
}
