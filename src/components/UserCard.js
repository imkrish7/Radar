import React from "react";
import {
  Box,
  IconButton,
  Card,
  Skeleton,
  CardMedia,
  Typography,
  Tooltip
} from "@mui/material";
import DomainIcon from "@mui/icons-material/Domain";
import FollowTheSignsIcon from "@mui/icons-material/FollowTheSigns";
import GroupIcon from "@mui/icons-material/Group";
import NotesIcon from "@mui/icons-material/Notes";
const UserCard = ({
  address,
  recommendationReason,
  follower,
  avatar,
  domain,
  followerCount,
  checkProfile
}) => {
  return (
    <Card
      onClick={() => checkProfile(address)}
      sx={{
        backgroundColor: "#a29bfe",
        display: "flex",
        cursor: "pointer",
        gap: "20px",
        p: 1
      }}
    >
      {avatar
        ? <CardMedia
            sx={{ width: 100, borderRadius: "10px" }}
            component="img"
            image={avatar}
            alt="avatar"
          />
        : <Skeleton
            sx={{ borderRadius: "10px" }}
            variant={"rectangular"}
            width={100}
            height={100}
            animation={"wave"}
          />}
      <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Typography sx={{ color: "#fff", fontWeight: "bolder" }} variant={"h6"}>
          {address}
        </Typography>
        <Box sx={{ display: "flex", columnGap: "10px" }}>
          {domain &&
            <Box
              sx={{ display: "flex", alignItems: "center", columnGap: "5px" }}
            >
              <Tooltip title="Domain">
                <DomainIcon sx={{ color: "#636e72" }} />
              </Tooltip>
              <Typography
                sx={{ fontWeight: "bold", color: "#636e72" }}
                variant={"p"}
              >
                {domain}
              </Typography>
            </Box>}
          {followerCount &&
            <Box
              sx={{ display: "flex", alignItems: "center", columnGap: "5px" }}
            >
              <Tooltip title="Follower Count">
                <GroupIcon sx={{ color: "#636e72" }} />
              </Tooltip>
              <Typography
                sx={{ fontWeight: "bold", color: "#636e72" }}
                variant={"p"}
              >
                {followerCount}
              </Typography>
            </Box>}
          {recommendationReason !== undefined &&
            <Box
              sx={{ display: "flex", aligneItems: "center", columnGap: "5px" }}
            >
              <Tooltip title="Recommendation Reason">
                <NotesIcon sx={{ color: "#636e72" }} />
              </Tooltip>
              <Typography
                sx={{ fontWeight: "bold", color: "#636e72" }}
                variant={"p"}
              >
                {recommendationReason}
              </Typography>
            </Box>}
        </Box>

        {follower !== undefined &&
          <Tooltip title={follower ? "Follower" : "Following"}>
            <IconButton sx={{ width: "30px", height: "30px" }} variant={"p"}>
              <FollowTheSignsIcon
                sx={{ color: follower ? "#2ecc71" : "#e17055" }}
              />
            </IconButton>
          </Tooltip>}
      </Box>
    </Card>
  );
};

export default UserCard;
