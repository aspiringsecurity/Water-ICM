import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { AssetsStateInterface as State } from './state';
export interface AssetsGetters {}

const getters: GetterTree<State, StateInterface> & AssetsGetters = {};

export default getters;
