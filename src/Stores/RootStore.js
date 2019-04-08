import { types } from 'mobx-state-tree';

import { StoreStore } from './StoreStore';
import { BookStore } from './BookStore';
import { AuthorStore } from './AuthorStore';
import { LocationStore } from './LocationStore';

const RootStore = types
  .model({
    storeStore: types.optional(StoreStore, {}),
    bookStore: types.optional(BookStore, {}),
    authorStore: types.optional(AuthorStore, {}),

    locationStore: types.optional(LocationStore, {}),
  })
  .views(self => ({
    get isLoading() {
      return self.storeStore.isLoading === 'pending'
        || self.bookStore.isLoading === 'pending'
        || self.authorStore.isLoading === 'pending';
    }
  }))
  .actions((/* self */) => ({
    afterCreate() {
      // self.storeStore.fetchStores({ page: 1, filters: [] });
      // self.bookStore.fetchBooks({ page: 1, filters: [] });
      // self.authorStore.fetchAuthors({ page: 1, filters: [] });
    },
  }));


export default RootStore;
