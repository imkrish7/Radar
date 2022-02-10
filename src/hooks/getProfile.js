import { useQuery, gql } from "@apollo/client";

export const useFetchProfile = address => {
  const query = gql`
    query Identity($address: String!) {
      identity(address: $address) {
        address
        domain
        avatar
        followerCount
        followingCount
        social {
          twitter
        }
      }
    }
  `;

  const data = useQuery(query, { variables: { address } });
  return data;
};
