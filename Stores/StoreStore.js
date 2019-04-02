import { types, flow, getParent } from 'mobx-state-tree';

import { Store } from '../Models/Store';

const baseUrl = 'http://jsonapiplayground.reyesoft.com/v2'

export const StoreStore = types
  .model('StoreStore', {
    loadingState: types.optional(types.enumeration('LoadingState', ['pending', 'success', 'error']), 'success'),
    stores: types.array(Store)
  })
  .views(self => ({
    get totalStores() {
      return self.stores.length;
    }
  }))
  .actions(self => ({
    updateStores(json) {
      json.forEach(store => {
        self.stores.push(Store.create({
          id: store.id,
          name: store.attributes.name,
          address: store.attributes.address
        }));
      });
    },

    fetchStores: flow(function* fetchStores({ page, filters }) {
      this.stores = [];
      this.loadingState = 'pending';

      const paginationString = `page[number]=${page}`;
      const filterString = filters.map(({key, value}) => {
        return `&filter[${key}]=${value}`;
      });

      try {
        const response = yield fetch(`${baseUrl}/stores?${paginationString}${filterString}`);
        const data = yield response.json();

        self.updateStores(data.data);
        this.loadingState = 'success';
      } catch (error) {
        console.log(error);
        this.loadingState = 'error';
      }
    }),
  }))
