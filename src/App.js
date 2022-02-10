import { useState } from "react";
import { Container, Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Network from "./components/Network";
import Landing from "./components/Landing";
const useStyles = makeStyles({
  root: {},
  input: {
    width: "100%",
    height: "64px",
    borderRadius: "10px",
    border: "none",
    background: "#42439f",
    boxShadow: "0px 0px 50px 0px #383864",
    color: "#fff",
    fontWeight: "500",
    fontSize: "24px",
    padding: "20px"
  }
});

function App() {
  const classes = useStyles();
  const [address, setAddress] = useState("");
  return (
    <Container
      sx={{ backgroundColor: "#5758BB", minHeight: "100vh" }}
      maxWidth="xl"
    >
      <Box>
        <Typography
          sx={{ color: "#bdc3c7" }}
          variant="h3"
          component="div"
          gutterBottom
        >
          Radar
        </Typography>
      </Box>
      <Container style={{ padding: "40px" }} maxWidth="md">
        <Box sx={{ display: "flex", flexDirection: "column", rowGap: "20px" }}>
          <input
            placeholder="Search your address...."
            className={classes.input}
            onChange={event => {
              setAddress(event.target.value);
            }}
            name="address"
            value={address}
          />
        </Box>
        <Box sx={{ mt: 10 }}>
          {address.length > 0 ? <Network address={address} /> : <Landing />}
        </Box>
      </Container>
    </Container>
  );
}

export default App;
