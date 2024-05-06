import { Box, Button, Grid, Paper, TextField } from "@mui/material";
import Masterpage from "../../components/Masterpage";
import { useState } from "react";
import logo from "../../assets/logo.jpg";
import { Search as SearchIcon } from "@mui/icons-material";

import { Pets } from "../../context/PetsContext";
import BuddyCard from "../../components/BuddyCard";

export default function Search() {
  const [search, setSearch] = useState("");
  const [pets, setPets] = useState([]);
  const { getPets } = Pets();

  const handleSearch = async () => {
    const searchParams = {
      search: search,
    };
    const foundPets = await getPets(searchParams);
    setPets(foundPets);
  };

  return (
    <Masterpage title="Search">
      <Grid container spacing={2} direction="row" alignItems="stretch">
        <Grid item xs={12} md={4}>
          <Paper sx={{ minHeight: "100%", padding: "20px" }}>
            <img src={logo} alt="logo" />
            <Box sx={{ display: "flex" }}>
              <TextField
                variant="outlined"
                value={search}
                sx={{ flexGrow: 1 }}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                variant="outlined"
                aria-label="search"
                color="secondary"
                onClick={handleSearch}
              >
                <SearchIcon />
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ minHeight: "100%", padding: "20px" }}>
            <Grid container spacing={2}>
              {pets.map((pet) => (
                <Grid key={pet.id} item xs={12} md={6}>
                  <BuddyCard buddy={pet} />
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Masterpage>
  );
}
