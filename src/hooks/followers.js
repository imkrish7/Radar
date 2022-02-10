import { useQuery, gql } from "@apollo/client";
export const useFetchFollowers = address => {
  const follower = gql`
    # Write your query or mutation here
    query Identity($address: String!) {
      identity(address: $address) {
        address
        domain
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
