import React, { useMemo, useState, memo } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useFetchRecommendation } from "../hooks/recommendation";
import UserCard from "./UserCard";
import Profile from "./Profile";
import Error from "./Error";

const Recommendations = ({ address }) => {
  // let address = "0x8ddD03b89116ba89E28Ef703fe037fF77451e38E";
  const { data, error, loading } = useFetchRecommendation(address);
  const [profile, setProfile] = useState("");
  const recommendations = useMemo(
    () => {
      if (data) {
        const { recommendations: { data: dataList } } = data;
        if (dataList) {
          return [...dataList.list];
        }
        return [];
      }
      return [];
    },
    [data]
  );
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "10px"
      }}
    >
      {profile.length > 0 && <Profile address={profile} close={setProfile} />}
      {loading
        ? <CircularProgress />
        : error
          ? <Error error={error} />
          : recommendations.length > 0
            ? recommendations.map((recommendation, index) => {
                return (
                  <UserCard
                    key={index}
                    {...{ ...recommendation }}
                    checkProfile={setProfile}
                  />
                );
              })
            : <Typography sx={{ color: "#bdc3c7" }} variant="h3">
                Sorry, No recommendations.
              </Typography>}
    </Box>
  );
};

export default memo(Recommendations);
