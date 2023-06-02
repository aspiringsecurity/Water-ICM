import { BalanceModel } from './wallet-balance.model';
import { WalletService } from './wallets.service';
export declare class WalletResolver {
    private walletService;
    constructor(walletService: WalletService);
    Wallet(): {};
    Balance(wallet_address: string): Promise<BalanceModel>;
}
