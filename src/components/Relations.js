import React, { useState, useMemo } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Pagination,
  PaginationItem
} from "@mui/material";
import UserCard from "./UserCard";
import Profile from "./Profile";

const Relations = ({ data, loading }) => {
  const [profile, setProfile] = useState("");
  const itemsPerPage = 5;
  const [page, setPage] = useState(1);
  const [current, setCurrent] = useState(0);
  const pages = useMemo(
    () => {
      if (data) {
        let temp = Math.ceil(data.length / itemsPerPage);
        return temp;
      }
      return 0;
    },
    [data]
  );

  const handleChange = (event, value) => {
    let temp = itemsPerPage * (value - 1);
    setCurrent(temp);
    setPage(value);
  };
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
          ? data
              .slice(current, itemsPerPage + current)
              .map((relation, index) => {
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
      <Pagination
        renderItem={number => {
          return (
            <PaginationItem
              component={"span"}
              sx={{
                color: "#bdc3c7",
                backgroundColor:
                  number.page === page ? "#8e44ad" : "transparent"
              }}
              {...number}
            />
          );
        }}
        onChange={handleChange}
        count={pages}
      />
    </Box>
  );
};

export default Relations;
