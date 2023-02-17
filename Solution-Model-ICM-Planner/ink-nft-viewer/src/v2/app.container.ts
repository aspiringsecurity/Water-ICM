import 'reflect-metadata';
import { interfaces } from 'inversify';
import { IApi, IApiFactory } from './integration';
import { ApiFactory, DefaultApi } from './integration/implementation';
import { IMetadataRepository, ISystemRepository } from './repositories';
import { MetadataRepository, SystemRepository } from './repositories/implementations';
import { IGasPriceProvider, IWalletService, WalletType } from './services';
import { PolkadotWalletService, GasPriceProvider } from './services/implementations';
import { Symbols } from './symbols';
import { IEventAggregator, EventAggregator } from './messaging';
import { container } from './common';
import { ITypeFactory, TypeFactory } from './config/types';
import { endpointKey } from 'src/config/chainEndpoints';

let currentWalletType = WalletType.Polkadot;
let currentWalletName = '';

export function setCurrentWallet(isEthWallet: boolean, currentWallet: string): void {
  currentWalletName = currentWallet;

  container.removeConstant(Symbols.CurrentWallet);
  container.addConstant<string>(Symbols.CurrentWallet, currentWalletName);
}

export default function buildDependencyContainer(network: endpointKey): void {
  container.addConstant<string>(Symbols.CurrentWallet, currentWalletName);

  container.addSingleton<IEventAggregator>(EventAggregator, Symbols.EventAggregator);
  container.addSingleton<IApi>(DefaultApi, Symbols.DefaultApi);
  container.addSingleton<IApiFactory>(ApiFactory, Symbols.ApiFactory);

  // Wallets
  container.addSingleton<IWalletService>(PolkadotWalletService, WalletType.Polkadot);

  // Wallet factory
  container.bind<interfaces.Factory<IWalletService>>(Symbols.WalletFactory).toFactory(() => {
    return () => {
      return container.get<IWalletService>(currentWalletType);
    };
  });

  container.addTransient<IMetadataRepository>(MetadataRepository, Symbols.MetadataRepository);
  container.addTransient<ISystemRepository>(SystemRepository, Symbols.SystemRepository);

  // Services
  container.addTransient<IWalletService>(PolkadotWalletService, Symbols.PolkadotWalletService);
  container.addTransient<IWalletService>(PolkadotWalletService, Symbols.PolkadotWalletService);
  container.addSingleton<IGasPriceProvider>(GasPriceProvider, Symbols.GasPriceProvider);

  // const typeMappings = XcmConfiguration.reduce(
  //   (result, { networkAlias, repository }) => ({ ...result, [networkAlias]: repository }),
  //   {} as TypeMapping
  // );

  // Type factory
  container.addSingleton<ITypeFactory>(TypeFactory, Symbols.TypeFactory);
  // Create GasPriceProvider instace so it can catch price change messages from the portal.
  container.get<IGasPriceProvider>(Symbols.GasPriceProvider);
}
