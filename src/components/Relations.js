import React, { useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import UserCard from "./UserCard";
import Profile from "./Profile";

const Relations = ({ data, loading }) => {
  const [profile, setProfile] = useState("");
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "10px"
      }}
    >
      {profile.length > 0 && <Profile close={setProfile} address={profile} />}
      {loading
        ? <CircularProgress />
        : data.length > 0
          ? data.map((relation, index) => {
              return (
                <UserCard
                  checkProfile={setProfile}
                  key={index}
                  {...{ ...relation }}
                />
              );
            })
          : <Typography sx={{ color: "#bdc3c7" }} variant="h3">
              Sorry, We haven't find any relation.
            </Typography>}
    </Box>
  );
};

export default Relations;
