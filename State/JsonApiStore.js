import { configure, observable, action, flow } from 'mobx';

configure({ enforceActions: 'observed' });

export default class JsonApiStore {
  static baseUrl = 'http://jsonapiplayground.reyesoft.com/v2'

  constructor(apiKeysStore) {
    this.apiKeysStore = apiKeysStore;
  }

  @observable apiKeysStore = null;

  @observable stores = [];

  @observable authors = [];

  @observable books = [];

  @action
  fetchStores = flow(function*() {
    this.stores = [];
    this.state = 'pending';

    try {
      const response = yield fetch(`${JsonApiStore.baseUrl}/stores`);
      const { data } = yield response.json();
      console.log('Data = ', data)
      this.stores = data;
      this.state = 'success';
    } catch (error) {
      console.log(error);
      this.state = 'error';
    }
  });
}

