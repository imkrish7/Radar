import { useQuery, gql } from "@apollo/client";

export const useFetchRecommendation = address => {
  const query = gql`
    query Recommendations($address: String!) {
      recommendations(address: $address) {
        data {
          list {
            address
            domain
            recommendationReason
            avatar
            followerCount
          }
        }
      }
    }
  `;

  const data = useQuery(query, { variables: { address } });
  return data;
};
