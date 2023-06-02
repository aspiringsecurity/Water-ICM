// ConnectButton.tsx
import { useEthers, useEtherBalance } from "@usedapp/core";
import { ethers } from "ethers";
import { Button } from "antd";

export default function ConnectButton() {
  const { activateBrowserWallet, account } = useEthers();
  const etherBalance = useEtherBalance(account);

  function handleConnectWallet() {
    console.log("connect wallet");
    activateBrowserWallet();
  }

  if (account && etherBalance) {
    const amount = ethers.utils.formatEther(etherBalance.toString());
    return (
      <span color="white" fontSize="md">
        <b>{amount} TFUEL</b> {account.slice(0, 6)}**
      </span>
    );
  }
  return (
    <span className="right">
      <Button type="primary" onClick={handleConnectWallet}>
        Connect to a wallet
      </Button>
    </span>
  );
}
