import React, { useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import UserCard from "./UserCard";
import Profile from "./Profile";
const Friends = ({ data, loading }) => {
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
          ? data.map((friend, index) => {
              return (
                <UserCard
                  checkProfile={setProfile}
                  key={index}
                  {...{ ...friend }}
                />
              );
            })
          : <Typography sx={{ color: "#bdc3c7" }} variant="h3">
              Sorry, We havn't had your friend list.
            </Typography>}
    </Box>
  );
};

export default Friends;
