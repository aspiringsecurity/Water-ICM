import axios from 'axios';
import { Collection, NFT, NFTRevision } from './types';

const BASE_URL = "https://api.revise.network";
function getHeaders({ token }) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

const fetchCollectionsAPI = async ({ token }) => {
  const { data } = await axios.get(
    `${BASE_URL}/collections`,
    getHeaders({ token })
  );
  return data as Collection[];
};
const fetchCollectionAPI = async ({ token, collectionId }) => {
  const { data } = await axios.get(
    `${BASE_URL}/collections/${collectionId}`,
    getHeaders({ token })
  );
  return data as Collection;
};
const addCollectionAPI = async ({ token, info }) => {
  const { data } = await axios.post(
    `${BASE_URL}/collections`,
    {
      collectionName: info.name,
      collectionURI: info.uri,
    },
    getHeaders({ token })
  );
  return data as Collection;
};
const addNFTAPI = async ({ token, collectionId, info }: {token: any, collectionId?: string, info: any}) => {
  const tokenObj = {
    tokenId: info.tokenId,
    name: info.name,
    image: info.image,
    description: info.description,
    metaData: info.metaData,
  };
  if (collectionId) {
    const { data } = await axios.post(`${BASE_URL}/collections/${collectionId}/nfts`, tokenObj, getHeaders({ token }));
    return data as NFT;
  }
  const { data } = await axios.post(`${BASE_URL}/nfts/addnft`, tokenObj, getHeaders({ token }));
  return data as NFT;
};
const updateNFTAPI = async ({ token, nftId, info }) => {
  const { data } = await axios.put(
    `${BASE_URL}/nfts/${nftId}`,
    {
      tokenId: info.tokenId,
      name: info.name,
      image: info.image,
      description: info.description,
      metaData: info.metaData,
    },
    getHeaders({ token })
  );
  return data;
};
const fetchCollectionNFTsAPI = async ({ token, collectionId }) => {
  const { data } = await axios.get(
    `${BASE_URL}/collections/${collectionId}/nfts`,
    getHeaders({ token })
  );
  return data.map((nft: NFT) => {
    try {
      const nftEntity: NFTEntity = {...nft, metaData: JSON.parse(nft.metaData)};
      if (nftEntity.id) {
        return {...nftEntity, message: 'ID exists'}
      }
      return nftEntity;
    } catch (error) {
      const nftEntity: NFTEntity = {...nft, metaData: []};
      return nftEntity;
    }
  }) as NFTEntity[];
};
const fetchNFTsAPI = async ({ token, collectionId }) => {
  const { data } = await axios.get(
    `${BASE_URL}/nfts`,
    getHeaders({ token })
  );
  return data.map((nft: NFT) => {
    try {
      const nftEntity: NFTEntity = {...nft, metaData: JSON.parse(nft.metaData)};
      if (nftEntity.id) {
        return {...nftEntity, message: 'ID exists'}
      }
      return nftEntity;
    } catch (error) {
      const nftEntity: NFTEntity = {...nft, metaData: []};
      return nftEntity;
    }
  }) as NFTEntity[];
};
const fetchNFTAPI = async ({ token, nftId }) => {
  const { data } = await axios.get(
    `${BASE_URL}/nfts/${nftId}`,
    getHeaders({ token })
  );
  try {
    data.metaData = JSON.parse(data.metaData);
  } catch (error) {
    data.metaData = {};
  }
  return data as NFTEntity;
};
const fetchRevisionsAPI = async ({ token, nftId }) => {
  const { data } = await axios.get(
    `${BASE_URL}/nfts/${nftId}/revisions`,
    getHeaders({ token })
  );
  try {
    data.metaData = JSON.parse(data.metaData);
    data.revisions = data.revisions.map(rev => {
      try {
        rev.metaData = JSON.parse(rev.metaData);
      } catch (error) {
        rev.metaData = [];
      }
      return rev;
    });
    return data as RevisionList;
  } catch (error) {
    throw {
      response: { data: { code: "INVMD", message: "Invalid metadata" } },
    };
  }
};
const deleteNFTAPI = async ({ token, tokenId }) => {
  const { data } = await axios.delete(
    `${BASE_URL}/nfts/${tokenId}`,
    getHeaders({ token })
  );
  return data;
};

export interface TokenDataPartial {
  name: string;
  image: string;
  tokenId: string;
  description?: string;
}
export type Attribute = {[keys in string]: string|number};

export interface RevisionList extends Omit<NFT, 'metaData'> {
  metaData: Attribute[];
  revisions: NFTRevisionEntity[];
  collection: Collection;
}
export interface NFTEntity extends Omit<NFT, 'metaData'> {
  metaData: Attribute[];
}
export interface NFTRevisionEntity extends Omit<NFTRevision, 'metaData'> {
  metaData: Attribute[];
}

class NFTObj {
  private auth: string|undefined;
  private nft: NFTEntity;
  
  constructor({auth, nft}: {auth: string, nft: NFTEntity}) {
    this.auth = auth;
    this.nft = nft;
  }
  private metaDataAsMap() {
    return this.nft.metaData.reduce((newObj: {[i in string]: string|number}, cur) => {
      if (! newObj) newObj = {};
      newObj[Object.keys(cur)[0]] = cur[Object.keys(cur)[0]];
      return newObj;
    });
  }
  private setMetaData(obj: {[x in string] : number|string}) {
    const d = Object.keys(obj).map((key) => {
      const newObj = {};
      newObj[key] = obj[key];
      return newObj;
    })
    this.nft.metaData = d;
  }
  setProperty(key: string, value: string|number) {
    const metaData = this.metaDataAsMap();
    // let isNewProperty = true;
    // this.nft.metaData = this.nft.metaData.map((attr: Attribute) => {
    //   const temp = {...attr};
    //   if (Object.keys(temp)[0] === key) {
    //     isNewProperty = false;
    //     temp[key] = value;
    //   }
    //   return temp;
    // })
    // if (isNewProperty) {
    //   const o = {};
    //   o[key] = value;
    //   this.nft.metaData.push(o);
    // }
    metaData[key] = value;
    this.setMetaData(metaData);
    return this;
  }
  deleteProperty(key: string) {
    this.nft.metaData = this.nft.metaData.filter((attr: Attribute) => Object.keys(attr)[0] !== key);
    return this;
  }
  setName(name:string) {
    this.nft.name = name;
    return this;
  }
  setImage(image:string) {
    this.nft.image = image;
    return this;
  }
  setTokenId(tokenId:string) {
    this.nft.tokenId = tokenId
    return this;
  }
  setDescription(description: string) {
    this.nft.description = description;
    return this;
  }
  save() {
    return updateNFTAPI({
      token: this.auth,
      nftId: this.nft.id,
      info: {
        tokenId: this.nft.tokenId,
        name: this.nft.name,
        image: this.nft.image,
        description: this.nft.description,
        metaData: this.nft.metaData
      }
    })
  }
  // export() {
  //   return "ipfs://...";
  // }
  async revisions() {
    return (await fetchRevisionsAPI({token: this.auth, nftId: this.nft.id})).revisions;
  }
  async revisionsLink() {
    return `https://revise.link/revision/${this.nft.id}`;
  }
}

export class Revise {
  private auth: string|undefined;
  constructor({auth}: {auth: string}) {
    this.auth = auth;
  }

  fetchCollections() {
    return fetchCollectionsAPI({token: this.auth})
  }
  fetchCollection(collectionId) {
    return fetchCollectionAPI({token: this.auth, collectionId})
  }
  addCollection({name, uri}) {
    return addCollectionAPI({token: this.auth, info: {name, uri}})
  }
  addNFT(tokenData: TokenDataPartial, properties: Attribute[], collectionId?: string) {
    const {tokenId, name, image, description} = tokenData
    const info = {
      tokenId,
      name,
      image,
      description: description || "",
      metaData: properties
    };
    if (collectionId) {
      return addNFTAPI({token: this.auth, collectionId, info})
    }
    return addNFTAPI({token: this.auth, info})
  }
  async updateNFT(nftId: string) {
    return this.nft(await this.fetchNFT(nftId));
  }
  nft(nft: NFTEntity) {
    return new NFTObj({auth: this.auth, nft});
  }
  fetchNFTs(collectionId?: string) {
    if (collectionId === undefined || collectionId === null) {
      return fetchNFTsAPI({token: this.auth, collectionId});
    }
    return fetchCollectionNFTsAPI({token: this.auth, collectionId});
  }
  fetchNFT(nftId: string) {
    return fetchNFTAPI({token: this.auth, nftId});
  }
  deleteNFT(nftId: string) {
    return deleteNFTAPI({token: this.auth, tokenId: nftId});
  }
  fetchRevisions(nftId: string) {
    return fetchRevisionsAPI({token: this.auth, nftId});
  }

  every(durationString: string) {
    return new Automation(new Duration(durationString));
  }
  // exportCollection(collectionId: string) {
  //   return "ipfs://...";
  // }
}

class Automation {
  private apiResolver: Function;
  private duration: Duration;

  constructor(duration: Duration) {
    this.duration = duration;
  }
  public listenTo(api: string | Function) {
    if (typeof api !== 'string' && typeof api !== 'function') {
      throw new Error('invalid API source shared');
    }
    if (typeof api === 'string') {
      this.apiResolver = async () => (await axios.get(api)).data;
    }
    if (typeof api === 'function') {
      this.apiResolver = api;
    }
    return this;
  }
  public async start(cb: Function) {
    const data = await this.apiResolver();
    cb(data);
    setTimeout(() => {
      this.start(cb);
    }, this.duration.getMiliseconds());
  }
}

class Duration {
  private durationString: string;
  private miliseconds: number;
  
  constructor(durationString: string) {
    this.durationString = durationString;
  }
  public getMiliseconds() {
    try {
      if (this.durationString.toLowerCase().includes('s')) {
        const data = this.durationString.toLowerCase().split('m')[0];
        return parseInt(data)*1000;
      }
      if (this.durationString.toLowerCase().includes('m')) {
        const data = this.durationString.toLowerCase().split('m')[0];
        return parseInt(data)*60000;
      }
      if (this.durationString.toLowerCase().includes('h')) {
        const data = this.durationString.toLowerCase().split('m')[0];
        return parseInt(data)*3600000;
      }
      
    } catch (error) {
      throw new Error("Invalid time format passed");
      
    }
  }
}