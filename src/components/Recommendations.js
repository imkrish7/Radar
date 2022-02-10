import React, { useMemo, useState, memo } from "react";
import {
  Box,
  CircularProgress,
  Typography,
  Pagination,
  PaginationItem
} from "@mui/material";
import { useFetchRecommendation } from "../hooks/recommendation";
import UserCard from "./UserCard";
import Profile from "./Profile";
import Error from "./Error";

const Recommendations = ({ address }) => {
  // let address = "0x8ddD03b89116ba89E28Ef703fe037fF77451e38E";
  const { data, error, loading } = useFetchRecommendation(address);
  const itemsPerPage = 5;
  const [page, setPage] = useState(1);
  const [current, setCurrent] = useState(0);
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
  const pages = useMemo(
    () => {
      if (data) {
        const { recommendations: { data: dataList } } = data;
        if (dataList && dataList.list) {
          let temp = Math.ceil(dataList.list.length / itemsPerPage);
          return temp;
        }
        return 0;
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
      {profile.length > 0 && <Profile address={profile} close={setProfile} />}
      {loading
        ? <CircularProgress />
        : error
          ? <Error error={error} />
          : recommendations.length > 0
            ? recommendations
                .slice(current, itemsPerPage + current)
                .map((recommendation, index) => {
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

export default memo(Recommendations);
