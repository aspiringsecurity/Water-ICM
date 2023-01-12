# Security Peer (Drone Monitor)

# Summary 

Our platform solution offers an Artificial Intelligence-based object detection system that utilizes IPFS, ethereum and optimism powered solutions  for sorting information obtained from a variety of UAV and drone cameras deployed at monitoring spots.

Features:
•Detection : Identifying the UAVs in the video feed using object detection.

•Discovery : Logging the identities of UAVs flying in a particular air space at any instant of time, using exchange of unique identifiers.

•Geo-fencing : Discovering unlawful presence and raising alarms using the detection & discovery data.

•Monitoring : Looking out and reporting incidents based on event detection in visual data.

•Analysis : Analyzing route patterns and incidents.

•Drone Incident Reporting : Publish drone incident reports.


Website for Developers: https://sites.google.com/view/latcglobal/home

Website for End Consumers, Civic bodies: https://sites.google.com/view/integratedwatermanagment/home

Pitch Deck and Demo: https://drive.google.com/drive/u/3/folders/1xYwivgACmcjNkhMEJA69DsKisXUIEIde



We have developed an Integrated Management solution to improve Water and Transport Monitoring by UAVs powered by web3 eco-system tools:

# Blockchain Eco-system

1. a. NFT Port dashboard: We are using NFTPort to see all NFTs from different networks. This enables UAV Users: UAV Users can views their NFTs in different network when they enter their address and select the network such as Ethereum, Polygon (Matic), Avalanche, and Binance Smart Chain. UAV Users can view the contract of the NFT such as floor price, unique token ids sold today, gas quote rate day, and list of NFTs minted. 

Please visit: https://github.com/aspiringsecurity/Water-ICM/tree/main/Solution-Model-ICM-Planner/nftport-dashboard 


b. XMTP: We are implementing XMTP Chat for administrators in a particular region with CyberConnect functions. Please visit the implementation at https://github.com/aspiringsecurity/Water-ICM/tree/main/NFT.Storage-incidents-alarm/XMTP-Chat


c.  Polygon: We are utilizing ZoraModuleManager, and ZoraProtocolFeeSettings in our our dapp and deploying it on Polygon after registering the Zora market module. We are developing a crowdsourcing marketplace using Zora's auction house template for enabling sharing of government assets like prepaid card, meter details information, meter license management and quarterly pollution check and control. We are using the zora starter kit to access ZORA API, Creator Toolkit, and Marketplace Hyperstructure. Zora's Auction House template is being utilized for NFT marketplace of alarm clock wallpapers and background ringtones purchase and auction. 

Please visit: https://github.com/aspiringsecurity/Water-ICM/tree/main/NFT.Storage-incidents-alarm/deploy-at-polygon


d. IPFS's w3ui storage: We are using IPFS's w3ui storage to store geolocation file data and additional snapshot files and data. This will enable effective management and communication setup for Drones utilized in Operations and Maintenance across multiple regions. Drones can be effectively utilized for building operations, inspection and maintenance and safer and more efficient surveys. https://github.com/aspiringsecurity/Water-ICM/tree/main/Solution-Modules/w3ui-incident-storage

Further, we are storing a variety of offchain data like incident snapshots, alarm metadata and object types at the time of incident.


e. The Graph: Use of existing subgraph at the graph explorer: We are using Decentraland and Adchain subgraph to build a datasource from the websites for sentiment analysis, which are kept in the Adchain registry. A python crawler mine these websites and feed relevant information to the analytics and visualization tool.

Please visit Adchain subgraph module at https://github.com/aspiringsecurity/Water-ICM/tree/main/Solution-Modules/using-adchain-subgraph 

The Graph data analytics & visualization tool for communities: https://github.com/aspiringsecurity/Water-ICM/tree/main/Solution-Modules/TheGraph-data-analytics-community-tooling


2. a. Lit:  We are using Lit protocol to automate signing, reading, and writing road incident metadata (snapshots) and alarm viewer data to web3 decentralized networks (Ethereum and IPFS). Please visit https://github.com/aspiringsecurity/Water-ICM/tree/main/Solution-Modules/lit-xls  

- Lit Access Control: Lit Protocol Oauth to Enable faster login for 5 different personas. The 6 different personas: Drone Driver, Citizen, Police officer, dispatcher, admin, government roles can easily be authenticated and logged in so that they can use their Ethereum address. Please visit: https://github.com/aspiringsecurity/Water-ICM/tree/main/NFT.Storage-water-icm/Solution_Modules/Drone-Monitoring-oauth-lit-access-control

- Token-gate the Drone Management Dashboard Page with 6 different personas using Lit Protocol: Please visit: https://github.com/aspiringsecurity/Water-ICM/tree/main/NFT.Storage-water-icm/Solution_Modules/Drone-Management-token-gating-lit

- Lit Actions: We are using JS function bindings to do things like request a signature or a decryption. Please visit:

i) https://github.com/aspiringsecurity/Water-ICM/tree/main/NFT.Storage-water-icm/Solution_Modules/lit-actions_conditional_signing

ii) https://github.com/aspiringsecurity/Water-ICM/tree/main/NFT.Storage-water-icm/Solution_Modules/lit-actions_sign_api_response


b. Streamr: https://github.com/aspiringsecurity/Water-ICM/tree/main/NFT.Storage-incidents-alarm/streamr-network


3. Push Protocol: We are using Push protocol to to enable periodic alarm notifications in case of unexpected flight of drones outside the guard rails. This enables effective management and communication setup for Drones utilized in Operations and Maintenance across multiple regions.  Please visit the link at https://github.com/aspiringsecurity/Water-ICM/tree/main/NFT.Storage-incidents-alarm/push-incidents-notification

Configuration screenshots at https://drive.google.com/drive/u/3/folders/1zFxrhlOfTCmm5lNs1CwMX_OVbl_mVU5q


4. Len's Community and Citizens DAO: https://github.com/aspiringsecurity/Water-ICM/tree/main/Solution-Modules/lens-citizens-dao


5. Livepeer and Aptos: We are using Livepeer ondemand service to enable effective management and communication setup for Drones utilized in Operations and Maintenance across multiple regions. Drones can be effectively utilized with Livepeer's ondemand support for building operations, inspection and maintenance and safer and more efficient surveys. Please visit Livepeer integration with Aptos and also minting Livepeer Video NFT at Aptos as follows:

a. Aptos: https://github.com/aspiringsecurity/Water-ICM/tree/main/BSC-Smart-Contract-Implement and https://github.com/aspiringsecurity/Water-ICM/tree/main/BSC-Smart-Contract-Implement/social-drone-data-framework-apt-livepeer

b. Livepeer: https://github.com/aspiringsecurity/Water-ICM/tree/main/Solution-Model-ICM-Planner/livepeer

c. Livepeer Video NFT: https://github.com/aspiringsecurity/Water-ICM/tree/main/Solution-Modules/livepeer-video-nft

Demo Video: https://drive.google.com/drive/u/3/folders/1qmLJX-RwLCqA3uRidyC_OSUS5AkSp2mC


6. a. Ceramic Composedb challenge and Ceramic Lit Integration: Please visit:

- https://github.com/aspiringsecurity/Water-ICM/tree/main/Solution-Modules/js-composedb-ceramic

- https://github.com/aspiringsecurity/Water-ICM/tree/main/NFT.Storage-water-icm/Solution_Modules/Ceramic-Lit-Integration

b. ENS: We are using ethops.blockchain domain purchased at UD for ENS. Please visit https://github.com/aspiringsecurity/Water-ICM/tree/main/NFT.Storage-water-icm/Solution_Modules/ENS-ethops

c. Arweave + bundlr: We are using it for storing a variety of offchain data like incident snapshots, alarm metadata and object types at the time of incident. Please visit https://github.com/aspiringsecurity/Water-ICM/tree/main/Solution-Model-ICM-Planner/arweave-bundlr-img-upload


7. a Metaverse Asset/Risk Manager for Cooperatives and Self Help Groups: https://github.com/aspiringsecurity/Water-ICM/tree/main/Solution-Modules/metaverse-cooperative-assets

b. Klaytn Monitor: https://github.com/aspiringsecurity/Water-ICM/tree/main/Solution-Model-ICM-Planner/klaytn-monitor

c. Aleo quotation and water maintenance management: https://github.com/aspiringsecurity/Water-ICM/tree/main/Solution-Model-ICM-Planner/water-maintenance-quote-mgmt

d. XDC network to borrow funds using collaterals: https://github.com/aspiringsecurity/Water-ICM/tree/main/Solution-Model-ICM-Planner/XDC-network



8. Optimism NFT marketplace for NFC tags of UAVs for enabling sharing of government assets and service/repair of vital assets:  https://github.com/aspiringsecurity/Water-ICM/tree/main/Solution-Modules/optimism-nfc-tag-nft-marketplace


# Demo Videos: 

1. UAV Monitor (Screencast): https://www.youtube.com/watch?v=dk3TQlEsxfo&t=3s

2. UAV Monitor for Integrated Water Management: https://www.youtube.com/watch?v=dqR-I70UT1I&t=1s

3. End Node Commissioning using NFC tag and iot modular gateway (Hardware Demo): https://www.youtube.com/watch?v=vNKONKA2sow


# Details

Investigative Case Management for Integrated Water Management. Developer Tools to manage and monitor drones, UAVS for cost effective monitoring of water supply chain units at sewage treatment plants and at larger water sources like dams, rivers and forest lakes in a variety of topographic regions. 


Our platform solution offers an Artificial Intelligence-based object detection system that utilizes NFT.Storage, IPFS and Axelar powered solutions with BNB audit contracts and Fantom destination chain for sorting information obtained from a variety of drone cameras deployed at monitoring spots.


# How it works:

Camera Management: Add/edit/delete cameras with a front end application with NFT.Storage (IPFS/Filecoin)  

Object Detection using open source solutions and Pytorch/Tensorflow deep learning library using CNN neural networks.

Video analytics configuration using NFT.Storage for data retrieval.

Live streaming with Object Detection Video Analytics using open source solutions for streaming, Litprotocol for security and NFT.Storage for snapshots.

Alarm storage using Ethereum. Save/delete alarm metadata and image to/from IPFS using NFT.Storage. Store the hash returned from IPFS to Ethereum test network using NFT.Storage. Provide links to alarms and blockchain transaction details.Alarm Viewer: Add alarms with a single touch. Open the Alarm Settings menu from the home page. Add an alarm, set the wallpaper or choose an alarm tone. You can also delete an existing alarm

Crowdsourcing information sharing for better and cleaner drinking water, Remote Water Monitoring, Recyclability of Water.


# Features

Our project focuses on effective design, engineering and delivery of solution for detecting & managing UAVs & Drones and setting up geo fences using predictive analytics and blockchain. 

•Detection : Identifying the drones & UAVs in the video feed using object detection.

•Discovery : Logging the identities of the drones & UAVs flying in a particular air space at any instant of time, using exchange of unique identifiers.

•Geo-fencing : Discovering unlawful presence and raising alarms using the detection & discovery data.

•Monitoring : Looking out and reporting incidents based on event detection in visual data.

•Analysis : Analyzing route patterns and incidents.

•Drone Incident Reporting : Publish drone incident reports, preventive measures and remediation using a decentralized twitter application over the Ethereum blockchain network and Embark Tools.

A more safe & regulated local air traffic of drones & UAVs with availability of movement data and prediction of future of conditions. Drone incident reporting, preventive measures and remediation using a decentralized twitter application.








