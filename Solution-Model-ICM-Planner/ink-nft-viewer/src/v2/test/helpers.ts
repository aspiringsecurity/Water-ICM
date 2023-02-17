import { interfaces } from 'inversify';
import 'reflect-metadata';
import { EventAggregator, IEventAggregator } from 'src/v2/messaging';
import { IMetadataRepository, ISystemRepository } from 'src/v2/repositories';
import { IGasPriceProvider, IWalletService } from 'src/v2/services';
import { GasPriceProvider } from 'src/v2/services/implementations/GasPriceProvider';
import { Symbols } from 'src/v2/symbols';
import { container } from '../common';
import { MetadataRepositoryMock } from './mocks/repositories/MetadataRepositoryMock';

import { ITypeFactory, TypeFactory, TypeMapping } from '../config/types';
import { SystemRepositoryMock } from './mocks/repositories/SystemRepositoryMock';

const TestSymbols = {
  WalletServiceMock: Symbol.for('WalletServiceMock'),
};

const initTestContainer = () => {
  container.addSingleton<IEventAggregator>(EventAggregator);
  container.addConstant<TypeMapping>(Symbols.TypeMappings, {});
  container.addSingleton<ITypeFactory>(TypeFactory, Symbols.TypeFactory);

  container.addSingleton<IGasPriceProvider>(GasPriceProvider);

  container.addSingleton<IMetadataRepository>(MetadataRepositoryMock, Symbols.MetadataRepository);
  container.addSingleton<ISystemRepository>(SystemRepositoryMock, Symbols.SystemRepository);

  // Wallet factory
  container.bind<interfaces.Factory<IWalletService>>(Symbols.WalletFactory).toFactory(() => {
    return () => {
      return container.get<IWalletService>(TestSymbols.WalletServiceMock);
    };
  });
};

export { initTestContainer, TestSymbols };
