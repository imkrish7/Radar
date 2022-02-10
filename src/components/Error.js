import React from "react";
import { Typography, Box } from "@mui/material";

const Error = ({ error }) => {
  return (
    <Box>
      <Typography sx={{ color: "#e74c3c" }} variant="h3" component="h3">
        Error
      </Typography>
      <Typography sx={{ color: "#bdc3c7" }} variant="p" component="p">
        Either your address is wrong or something went wrong.
      </Typography>
    </Box>
  );
};

export default Error;
