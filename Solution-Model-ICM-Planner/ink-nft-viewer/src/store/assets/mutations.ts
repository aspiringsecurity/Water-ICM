import { MutationTree } from 'vuex';
import { AssetsStateInterface as State } from './state';
export interface AssetsMutations<S = State> {}

const mutations: MutationTree<State> & AssetsMutations = {};

export default mutations;
