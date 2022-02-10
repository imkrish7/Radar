import React from "react";
import TwitterIcon from "@mui/icons-material/Twitter";
import {
  Card,
  CardContent,
  CardActions,
  Box,
  CardMedia,
  IconButton,
  Skeleton
} from "@mui/material";
import Typography from "@mui/material/Typography";
const SmallCard = ({ ens, address, social ,followers, followings, avatar }) => {
  return (
    <Card
      sx={{
        minWidth: 200,
        display: "flex",
        flex: 1,
        p: 2,
        gap: "30px",
        backgroundColor: "#42439f",
        boxShadow: "0px 0px 50px 0px #383864"
      }}
    >
      {avatar && avatar.length ? <CardMedia
        component="img"
        sx={{ width: 250, borderRadius: 2 }}
        image={avatar}
        alt="profile avatar"
      /> : <Skeleton sx={{ borderRadius: "10px" }} variant={"recatangular"} width={250} height={250} animation={"wave"}/> }
      <Box sx={{ flex: 1, height: "100%" }}>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "20px"
          }}
        >
          <Typography variant="h6" component="h6" sx={{ color: "#fff" }}>
            Address :
          </Typography>
          <Typography variant="h6" component="h6" sx={{ color: "#fff", flex: 1, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "pre"  }}>
            {address}
          </Typography>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "20px"
          }}
        >
          <Typography variant="h6" component="h6" sx={{ color: "#fff" }}>
            ENS :
          </Typography>
          <Typography variant="h6" component="h6" sx={{ color: "#fff" }}>
            {ens}
          </Typography>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "20px"
          }}
        >
          <Typography variant="h6" component="h6" sx={{ color: "#fff" }}>
            Followings :
          </Typography>
          <Typography variant="h6" component="h6" sx={{ color: "#fff" }}>
            {followings}
          </Typography>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "20px"
          }}
        >
          <Typography variant="h6" component="h6" sx={{ color: "#fff" }}>
            Followers :
          </Typography>
          <Typography variant="h6" component="h6" sx={{ color: "#fff" }}>
            {followers}
          </Typography>
        </div>
        <CardActions>
          { social?.twitter.length > 0 && 
            <IconButton>
              <a href={social["twitter"]} target={"_blank"} >
              <TwitterIcon sx={{ color: "#fff" }} />
              </a>
            </IconButton>
          }
        </CardActions>
      </Box>
    </Card>
  );
};

export default SmallCard;
