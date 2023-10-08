import { gql } from '@apollo/client';

export const AAVE_DEPOSIT = gql`
  query deposits($user: Bytes!) {
    deposits(where: { user: $user }) {
      id
      amount
      user{
        id
      }
      reserve{
        id
        symbol
        name
        decimals
        price
      }
    }
  }
`;


export const DefaultProfile =  gql`
query DefaultProfile($ownedBy: String!) {
  defaultProfile(where: { ownedBy: $ownedBy}) {
    id
    name
    bio
    isDefault
    ownedBy
    }
  }
`;