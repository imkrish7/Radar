import React, { useMemo, useState } from "react";
import {
  Modal,
  Card,
  Box,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
  CircularProgress,
  Tooltip
} from "@mui/material";
import DomainIcon from "@mui/icons-material/Domain";
import FollowTheSignsIcon from "@mui/icons-material/FollowTheSigns";
import TwitterIcon from "@mui/icons-material/Twitter";
import { useFetchProfile } from "../hooks/getProfile";
import Error from "./Error";
const Profile = ({ address, close }) => {
  const [open, setOpen] = useState(true);
  const { data, loading, error } = useFetchProfile(address);
  const profile = useMemo(() => {
    if (data) {
      const {
        identity: {
          address,
          domain,
          avatar,
          followerCount,
          followingCount,
          social
        }
      } = data;
      return {
        address,
        domain,
        avatar,
        followerCount,
        followingCount,
        social
      };
    }
    return {};
  }, [data]);
  const handleClose = () => {
    setOpen(false);
    close("");
  };
  return (
    <Modal
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
      onBackdropClick={handleClose}
      open={open}
      onClose={handleClose}
    >
      <Box>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Error error={error} />
        ) : (
          <Card
            sx={{
              width: "400px",
              backgroundColor: "#ffffffa8",
              display: "flex",
              flexDirection: "column",
              flexWrap: "wrap",
              backdropFilter: "blur(10px)"
            }}
          >
            {profile.avatar ? (
              <CardMedia
                component="img"
                height="240"
                image={profile.avatar}
                alt="profile"
                sx={{
                  objectFit: "contain"
                }}
              />
            ) : (
              <Skeleton variant="rectangular" animation={"wave"} height={240} />
            )}
            <CardContent>
              <Typography
                sx={{ wordBreak: "break-word", color: "#383864" }}
                variant="h5"
                component="h5"
              >
                {address}
              </Typography>
              <Box
                sx={{ display: "flex", alignItems: "center", columnGap: "5px" }}
              >
                <Tooltip title="Follower Count">
                  <DomainIcon sx={{ color: "#636e72" }} />
                </Tooltip>
                <Typography
                  sx={{ fontWeight: "bold", color: "#636e72" }}
                  variant={"p"}
                >
                  {profile.domain || "Not Available"}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", columnGap: "5px" }}
              >
                <Tooltip title="Follower Count">
                  <FollowTheSignsIcon sx={{ color: "#636e72" }} />
                </Tooltip>
                <Typography
                  sx={{ fontWeight: "bold", color: "#636e72" }}
                  variant={"p"}
                >
                  {profile.followerCount || "Not Available"}
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", alignItems: "center", columnGap: "5px" }}
              >
                <Tooltip title="Follower Count">
                  <TwitterIcon sx={{ color: "#636e72" }} />
                </Tooltip>
                <Typography
                  sx={{ fontWeight: "bold", color: "#636e72" }}
                  variant={"p"}
                >
                  {profile.social?.twitter || "Not Available"}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        )}
      </Box>
    </Modal>
  );
};

export default Profile;
