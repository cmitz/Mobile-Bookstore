import ApiKeysStore from './ApiKeysStore';
import JsonApiStore from './JsonApiStore';

const apiKeysStore = new ApiKeysStore();
const jsonApiStore = new JsonApiStore(apiKeysStore);

export default {
  apiKeysStore,
  jsonApiStore,
};
