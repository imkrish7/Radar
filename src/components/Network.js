import React, { useState, useMemo } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import SmallCard from "./SmallCard";
import { useFetchFollowers } from "../hooks/followers";
import { networkFormat } from "../Utils/format";
import { mutualRelation } from "../Utils/Mutual";
import NetworkGraph from "./NetworkGraph";
import Friends from "./Friends";
import Recommendations from "./Recommendations";
import Relations from "./Relations";
import { CircularProgress } from "@mui/material";
import Error from "./Error";

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index &&
        <Box sx={{ p: 3 }}>
          {children}
        </Box>}
    </div>
  );
}

const Network = ({ address }) => {
  let [tab, setTab] = useState(0);
  // let address = "0x8ddD03b89116ba89E28Ef703fe037fF77451e38E";
  const { loading, data, error } = useFetchFollowers(address);
  const {
    identity: {
      followerCount,
      followingCount,
      followers,
      avatar,
      domain,
      followings,
      social,
      friends
    }
  } = useMemo(
    () => {
      if (data) {
        if (data.identity) {
          return data;
        }
        return {
          identity: {
            followerCount: 0,
            followingCount: 0,
            followers: { list: [] },
            followings: { list: [] },
            friends: { list: [] },
            avatar: "",
            domain: "",
            social: { twitter: "" }
          }
        };
      }
      return {
        identity: {
          followerCount: 0,
          followingCount: 0,
          followers: { list: [] },
          followings: { list: [] },
          friends: { list: [] },
          avatar: "",
          domain: "",
          social: { twitter: "" }
        }
      };
    },
    [data]
  );
  let { nodes, links } = useMemo(
    () => {
      if (data) {
        return networkFormat(address, followers, followings, avatar, domain);
      }
      return [];
    },
    [data, address, followers, followings, domain, avatar]
  );
  let relations = useMemo(
    () => {
      if (data) {
        return mutualRelation(followers, followings);
      }
      return [];
    },
    [data, followers, followings]
  );
  let _friends = useMemo(
    () => {
      if (data) {
        return [...friends.list];
      }
      return [];
    },
    [data, friends]
  );
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`
    };
  }
  const handleChange = (event, newValue) => {
    setTab(newValue);
  };
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "50px"
      }}
    >
      {loading
        ? <CircularProgress sx={{ color: "#fff" }} />
        : error
          ? <Error error={error} />
          : <React.Fragment>
              <SmallCard
                followings={followingCount}
                avatar={avatar}
                ens={domain}
                followers={followerCount}
                social={social}
                address={address}
              />
              <Box>
                {links.length > 0 &&
                  nodes.length > 0 &&
                  <NetworkGraph {...{ links, source: address, nodes }} />}
              </Box>
              <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 5, borderColor: "#fff" }}>
                  <Tabs
                    value={tab}
                    onChange={handleChange}
                    variant={"fullWidth"}
                  >
                    <Tab
                      sx={{
                        color: tab === 0 ? "#5758bb" : "#fff",
                        fontWeight: "bold",
                        backgroundColor: tab === 0 ? "#ecf0f1" : "transparent",
                        borderRadius: "4px"
                      }}
                      label={"Relation"}
                      {...a11yProps(0)}
                    />
                    <Tab
                      sx={{
                        color: tab === 1 ? "#5758bb" : "#fff",
                        fontWeight: "bold",
                        backgroundColor: tab === 1 ? "#ecf0f1" : "transparent",
                        borderRadius: "4px"
                      }}
                      label={"Friends"}
                      {...a11yProps(1)}
                    />
                    <Tab
                      sx={{
                        color: tab === 2 ? "#5758bb" : "#fff",
                        fontWeight: "bold",
                        backgroundColor: tab === 2 ? "#ecf0f1" : "transparent",
                        borderRadius: "4px"
                      }}
                      label={"Recommendations"}
                      {...a11yProps(2)}
                    />
                  </Tabs>
                </Box>
                <TabPanel value={tab} index={0}>
                  <Relations
                    source={address}
                    data={relations}
                    loading={loading}
                  />
                </TabPanel>
                <TabPanel value={tab} index={1}>
                  <Friends source={address} data={_friends} loading={loading} />
                </TabPanel>
                <TabPanel value={tab} index={2}>
                  <Recommendations address={address} />
                </TabPanel>
              </Box>
            </React.Fragment>}
    </Box>
  );
};

export default Network;
