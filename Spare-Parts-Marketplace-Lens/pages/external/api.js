import {
  ApolloClient,
  ApolloLink,
  from,
  fromPromise,
  HttpLink,
  InMemoryCache,
  toPromise,
  gql
} from '@apollo/client';
import axios from 'axios';

const APIURL = "https://api.lens.dev"

const REFRESH_AUTHENTICATION_MUTATION = `
  mutation Refresh($request: RefreshRequest!) {
    refresh(request: $request) {
      accessToken
      refreshToken
    }
  }
`;

/**
 *
 * @param token jwt token
 * @returns expiry time in seconds
 */
 const parseJwt = (
  token
) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (error) {
    console.error(error);
    return { exp: 0 };
  }
};

const httpLink = new HttpLink({
  uri: APIURL,
  fetchOptions: 'no-cors',
  fetch
});


const authLink = new ApolloLink((operation, forward) => {
  const accessToken = localStorage.getItem('accessToken');
console.log(accessToken)
  if (!accessToken || accessToken === 'undefined') {
    localStorage.clear();
    return forward(operation);
  }

  const expiringSoon = Date.now() >= parseJwt(accessToken)?.exp * 1000;

  if (!expiringSoon) {
    operation.setContext({
      headers: {
        'x-access-token': accessToken ? `Bearer ${accessToken}` : ''
      }
    });
    return forward(operation);
  }

  return fromPromise(
    axios(APIURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify({
        operationName: 'Refresh',
        query: REFRESH_AUTHENTICATION_MUTATION,
        variables: {
          request: { refreshToken: localStorage.getItem('refreshToken') }
        }
      })
    })
      .then(({ data }) => {
        const accessToken = data?.data?.refresh?.accessToken;
        const refreshToken = data?.data?.refresh?.refreshToken;
        operation.setContext({
          headers: {
            'x-access-token': `Bearer ${accessToken}`
          }
        });

        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        return toPromise(forward(operation));
      })
      .catch(() => {
        return toPromise(forward(operation));
      })
  );
});

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all',
  },
};

export const client = new ApolloClient({
  link: from([authLink, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: defaultOptions
});


export const DefaultProfile =  gql`
query DefaultProfile($request: DefaultProfileRequest!) {
  defaultProfile(request: $request) {
    id
    name
    bio
    isDefault
    attributes {
      displayType
      traitType
      key
      value
    }
    followNftAddress
    metadata
    handle
    picture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        chainId
        verified
      }
      ... on MediaSet {
        original {
          url
          mimeType
        }
      }
    }
    coverPicture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        chainId
        verified
      }
      ... on MediaSet {
        original {
          url
          mimeType
        }
      }
    }
    ownedBy
    dispatcher {
      address
      canUseRelay
    }
    stats {
      totalFollowers
      totalFollowing
      totalPosts
      totalComments
      totalMirrors
      totalPublications
      totalCollects
    }
    followModule {
      ... on FeeFollowModuleSettings {
        type
        contractAddress
        amount {
          asset {
            name
            symbol
            decimals
            address
          }
          value
        }
        recipient
      }
      ... on ProfileFollowModuleSettings {
       type
      }
      ... on RevertFollowModuleSettings {
       type
      }
    }
  }
}`

// export const HasTxHashBeenIndexed = 
// gql`query HasTxHashBeenIndexed($request: HasTxHashBeenIndexedRequest!) {
//   hasTxHashBeenIndexed(request: $request) {
export const getProfiles = gql`
  query Profiles($request: ProfileQueryRequest!) {
    profiles(request: $request) {
      items {
        id
        name
        bio
        attributes {
          displayType
          traitType
          key
          value
        }
        metadata
        isDefault
        picture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        handle
        coverPicture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        ownedBy
        dispatcher {
          address
          canUseRelay
        }
        stats {
          totalFollowers
          totalFollowing
          totalPosts
          totalComments
          totalMirrors
          totalPublications
          totalCollects
        }
      }
      pageInfo {
        prev
        next
        totalCount
      }
    }
  }
`

export const getPublications = gql`
  query Publications($request: PublicationsQueryRequest!) {
    publications(request: $request) {

      items {
        __typename 
        ... on Post {
          ...PostFields
        }
      }
    }
  }
  fragment PostFields on Post {
    id
    appId
    metadata {
      ...MetadataOutputFields
    }
    createdAt
  }
  fragment MetadataOutputFields on MetadataOutput {
    name
    description
    content
    media {
      original {
        ...MediaFields
      }
    }
    attributes {
      displayType
      traitType
      value
    }
  }
  fragment MediaFields on Media {
    url
    mimeType
  }
`

export const recommendProfiles = gql`
  query RecommendedProfiles {
    recommendedProfiles {
        id
        name
        picture {
          ... on MediaSet {
            original {
              url
            }
          }
        }
        handle
        stats {
          totalFollowers
        }
    }
  }
`

export const searchProfiles = gql`
  query Search($query: Search!, $type: SearchRequestTypes!) {
    search(request: {
      query: $query,
      type: $type,
      limit: 10
    }) {
      ... on ProfileSearchResult {
        __typename 
        items {
          ... on Profile {
            ...ProfileFields
          }
        }
        pageInfo {
          prev
          totalCount
          next
        }
      }
    }
  }
  fragment MediaFields on Media {
    url
  }
  fragment ProfileFields on Profile {
    profileId: id,
    name
    bio
    attributes {
      displayType
      traitType
      key
      value
    }
    metadata
    isDefault
    handle
    picture {
      ... on NftImage {
        contractAddress
        tokenId
        uri
        verified
      }
      ... on MediaSet {
        original {
          ...MediaFields
        }
      }
    }
    stats {
      totalFollowers
      totalFollowing
    }
  }
`

export const HasTxHashBeenIndexedDocument = 
gql`query HasTxHashBeenIndexed($request: HasTxHashBeenIndexedRequest!) {
  hasTxHashBeenIndexed(request: $request) {
    ... on TransactionIndexedResult {
      indexed
      metadataStatus {
        status
        reason
      }
    }
  }
}`

export const CreatePostTypedDataDocument = gql`
  mutation CreatePostTypedData($request: CreatePublicPostRequest!) {
    createPostTypedData(request: $request) {
    id
    expiresAt
    typedData {
      types {
        PostWithSig {
          name
          type
        }
      }
      domain {
        name
        chainId
        version
        verifyingContract
      }
      value {
        nonce
        deadline
        profileId
        contentURI
        collectModule
        collectModuleInitData
        referenceModule
        referenceModuleInitData
      }
    }
  }
}`;


// mutation CreatePostTypedData {
//   createPostTypedData(request: {
//     profileId: "0x03",
//     contentURI: "ipfs://QmPogtffEF3oAbKERsoR4Ky8aTvLgBF5totp5AuF8YN6vl",
//     collectModule: {
//       revertCollectModule: true
//     },
//     referenceModule: {
//       followerOnlyReferenceModule: false
//     }
//   }) {
//     id
//     expiresAt
//     typedData {
//       types {
//         PostWithSig {
//           name
//           type
//         }
//       }
//       domain {
//         name
//         chainId
//         version
//         verifyingContract
//       }
//       value {
//         nonce
//         deadline
//         profileId
//         contentURI
//         collectModule
//         collectModuleInitData
//         referenceModule
//         referenceModuleInitData
//       }
//     }
//   }
// }