import { Struct } from '@polkadot/types';
import { BN } from '@polkadot/util';

export interface SystemAccount extends Struct {
  data: {
    free: BN;
    reserved: BN;
    miscFrozen: BN;
    feeFrozen: BN;
  };
}
