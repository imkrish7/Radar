import { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
export const useFetchFollowers = address => {
  const [response, setResponse] = useState({
    loading: true,
    data: null,
    error: false
  });
  const follower = gql`
    # Write your query or mutation here
    query Identity($address: String!) {
      identity(address: $address) {
        address
        ens
        avatar
        followingCount
        followerCount
        social {
          twitter
        }
        followers {
          list {
            address
            avatar
            domain
            namespace
            alias
          }
        }
        followings {
          list {
            address
            avatar
            domain
            namespace
            alias
          }
        }
        friends {
          list {
            address
            avatar
            domain
            alias
            namespace
          }
        }
      }
    }
  `;
  const data = useQuery(follower, { variables: { address } });
  return data;
};
