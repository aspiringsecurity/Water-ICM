// SPDX-License-Identifier: UNLICENSED;
pragma solidity >=0.5.0 <0.6.0;

// https://github.com/ethereum/solidity/releases/tag/v0.5.0
// https://github.com/ethereum/solidity/releases/tag/v0.5.16

import './zombiefactory.sol';

contract ZombieFeeding is ZombieFactory {

  function feedAndMultiply(uint _zombieId, uint _targetDna) public {
    require(msg.sender == zombieToOwner[_zombieId]);
    Zombie storage myZombie = zombies[_zombieId];
    _targetDna = _targetDna % dnaModulus;
    uint newDna = (myZombie.dna + _targetDna) / 2;
    _createZombie("NoName", newDna);
  }

}
