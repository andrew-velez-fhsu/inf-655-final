import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Typography,
  Button,
} from "@mui/material";
import noPetPhoto from "../assets/noPetPhoto.jpg";
import { useNavigate } from "react-router-dom";
export default function BuddyCard({ buddy }) {
  const miniDescription =
    buddy.description.length > 200
      ? buddy.description.substring(0, 200) + "..."
      : buddy.description;

  const navigate = useNavigate();
  const handleSeeDetails = () => {
    navigate(`/buddies/${buddy.id}`);
  };

  return (
    <Card elevation={5}>
      <CardMedia
        image={buddy.photoUrl ? buddy.photoUrl : noPetPhoto}
        sx={{ height: 180 }}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {buddy.name}
        </Typography>
        <Typography gutterBottom variant="caption">
          {buddy.breed}
        </Typography>
        <Divider />
        <Typography variant="body2">{miniDescription}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleSeeDetails}>
          Learn more
        </Button>
      </CardActions>
    </Card>
  );
}
