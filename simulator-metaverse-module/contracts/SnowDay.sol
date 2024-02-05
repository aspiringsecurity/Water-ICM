// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "hardhat/console.sol";
import "./lib/Base64.sol";

error Paused();
error AlreadyHasNFT();
error EnemyNeedsNFT();
error YouNeedAnNFT();
error MintWindowPassed();
error GameHasNotStarted();
error GameHasEnded();
error GameHasNotEnded();
error CharacterMustHaveHP();
error IncorrectEtherValue();
error GameHasAlreadyStarted();

contract SnowDay is ERC721, Ownable {
    struct CharacterAttributes {
        uint256 characterIndex;
        string name;
        string imageURI;
        uint256 hp;
        uint256 maxHp;
        uint256 attackDamage;
        uint256 defense;
        uint256 evade;
    }

    uint256 public constant MINT_WINDOW = 2 days;
    uint256 public constant TOTAL_TIME = 1 weeks;
    uint256 public nextTokenId = 1;
    uint256 startTime;
    uint256 mintWindow;
    uint256 endTime;
    
    bool public isGamePaused = false;
    bool public gameInProgress = false;

    CharacterAttributes[] defaultCharacters;

    mapping(uint256 => CharacterAttributes) public nftHolderAttributes;
    mapping(address => uint256) public nftHolders;

    //events
    event CharacterNFTMinted(address sender, uint256 tokenId, uint256 characterIndex);
    event AttackComplete(uint256 atkAmount, uint256 playerHp);
    event MissedAttack(address attacker, address victim);
    event SuccessfulAttack(address attacker, address victim, uint256 damageAmount, uint256 victimHp);
    event NFTBurned(address victim, uint256 tokenId, address attacker);

    constructor(
        string[] memory characterNames,
        string[] memory characterImageURIs,
        uint256[] memory characterHp,
        uint256[] memory characterAttack,
        uint256[] memory characterDefense,
        uint256[] memory characterEvade
    ) ERC721("Snowday", "SNOW") {
        for (uint256 i = 0; i < characterNames.length; i += 1) {
            defaultCharacters.push(
                CharacterAttributes({
                    characterIndex: i,
                    name: characterNames[i],
                    imageURI: characterImageURIs[i],
                    hp: characterHp[i],
                    maxHp: characterHp[i],
                    attackDamage: characterAttack[i],
                    defense: characterDefense[i],
                    evade: characterEvade[i]
                })
            );
        }
    }

    // Function to start the game with parameters of Mint window and minimum total time the game can be played
    function startTheGame() internal {
        if (gameInProgress == true) revert GameHasAlreadyStarted();
        gameInProgress = true;
        startTime = block.timestamp;
        mintWindow = startTime + MINT_WINDOW;
        endTime = startTime + TOTAL_TIME;
    }

    function endTheGame() internal {
       // if (block.timestamp < endTime) revert GameHasNotEnded();
        gameInProgress = false;
    }

    // Mints the NFT for user, loads the attributes to the struct and emits the event
    function claimNFT(uint256 _characterIndex) internal {
        if (gameInProgress == false) revert GameHasNotStarted();
        if (block.timestamp > mintWindow) revert MintWindowPassed();
        if (isGamePaused) revert Paused();
        if (balanceOf(msg.sender) > 0) revert AlreadyHasNFT();

        _mint(msg.sender, nextTokenId);

        // Map the tokenId => their character attributes.
        nftHolderAttributes[nextTokenId] = CharacterAttributes({
            characterIndex: _characterIndex,
            name: defaultCharacters[_characterIndex].name,
            imageURI: defaultCharacters[_characterIndex].imageURI,
            hp: defaultCharacters[_characterIndex].hp,
            maxHp: defaultCharacters[_characterIndex].hp,
            attackDamage: defaultCharacters[_characterIndex].attackDamage,
            defense: defaultCharacters[_characterIndex].defense,
            evade: defaultCharacters[_characterIndex].evade
        });

        nftHolders[msg.sender] = nextTokenId;
        ++nextTokenId;
        emit CharacterNFTMinted(msg.sender, nextTokenId, _characterIndex);
    }

    // Base64 encoding function for the metadata of the NFT
    function tokenURI(uint256 _tokenId) public view override returns (string memory) {
        CharacterAttributes memory charAttributes = nftHolderAttributes[_tokenId];

        string memory strHp = Strings.toString(charAttributes.hp);
        string memory strMaxHp = Strings.toString(charAttributes.maxHp);
        string memory strAttackDamage = Strings.toString(charAttributes.attackDamage);
        string memory strDefense = Strings.toString(charAttributes.defense);

        // Ensure that the JSON is correctly formatted
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "',
                        charAttributes.name,
                        " -- NFT #: ",
                        Strings.toString(_tokenId),
                        '", "description": "The Snowball Game!", "image": "',
                        charAttributes.imageURI,
                        '", "attributes": [ {"trait_type": "Health Points", "value": ',
                        strHp,
                        ', "max_value": ',
                        strMaxHp,
                        '}, {"trait_type": "Attack Damage", "value": ',
                        strAttackDamage,
                        '}, {"trait_type": "Defense", "value": ',
                        strDefense,
                        "}]}"
                    )
                )
            )
        );

        return string(abi.encodePacked("data:application/json;base64,", json));
    }

    // Getter function to check is the wallets hots and NFT and return the attributes
    function checkIfUserNFT(address _holder) public view returns (CharacterAttributes memory) {
        uint256 userNftTokenId = nftHolders[_holder];
        if (userNftTokenId > 0) {
            return nftHolderAttributes[userNftTokenId];
        } else {
            CharacterAttributes memory emptyStruct;
            return emptyStruct;
        }
    }

    // Getter function to check is the wallet holds an NFT
    function checkIfTargetHasNFT(address _holder) public view returns (bool) {
        if (balanceOf(_holder) > 0) {
            return true;
        } else {
            return false;
        }
    }

    // Grab all characters in the array (can by dynamic)
    function getAllDefaultCharacters() public view returns (CharacterAttributes[] memory) {
        return defaultCharacters;
    }

    // Get the attributes of the specific token ID
    function getCharacterStats(uint256 _tokenId) external view returns (CharacterAttributes memory) {
        return nftHolderAttributes[_tokenId];
    }

    // Get the HP of the specific token ID
    function getCharacterHp(uint256 _tokenId) public view returns (uint256) {
        return nftHolderAttributes[_tokenId].hp;
    }

    // Only Owner Functions

    // Add a new character to the array
    function addCharacter(
        string memory _name,
        string memory _imageURI,
        uint256 _hp,
        uint256 _attack,
        uint256 _defense,
        uint256 _evade
    ) external onlyOwner {
        defaultCharacters.push(
            CharacterAttributes({
                characterIndex: defaultCharacters.length,
                name: _name,
                imageURI: _imageURI,
                hp: _hp,
                maxHp: _hp,
                attackDamage: _attack,
                defense: _defense,
                evade: _evade
            })
        );
    }

    // Updaet character name, image URI, HP, Attack, Defense, Evade
    function updateCharacterName(uint256 _characterIndex, string memory _newName) external onlyOwner {
        defaultCharacters[_characterIndex].name = _newName;
    }

    function updateCharacterImageURI(uint256 _characterIndex, string memory _newImageURI) external onlyOwner {
        defaultCharacters[_characterIndex].imageURI = _newImageURI;
    }

    function updateCharacterHp(uint256 _characterIndex, uint256 _newHp) external onlyOwner {
        defaultCharacters[_characterIndex].maxHp = _newHp;
    }

    function updateCharacterAttack(uint256 _characterIndex, uint256 _newAttack) external onlyOwner {
        defaultCharacters[_characterIndex].attackDamage = _newAttack;
    }

    function updateCharacterDefense(uint256 _characterIndex, uint256 _newDefense) external onlyOwner {
        defaultCharacters[_characterIndex].defense = _newDefense;
    }

    function updateCharacterEvade(uint256 _characterIndex, uint256 _newEvade) external onlyOwner {
        defaultCharacters[_characterIndex].evade = _newEvade;
    }

    // Pause the game
    function pauseGameToggle() external onlyOwner {
        isGamePaused = !isGamePaused;
    }
}
