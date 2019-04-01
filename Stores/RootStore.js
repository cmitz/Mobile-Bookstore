import { types } from 'mobx-state-tree';

import { StoreStore } from './StoreStore';
import { BookStore } from './BookStore';
// import { Authorstore } from '../Models/Author';



export const RootStore = types
  .model({
    storeStore: types.optional(StoreStore, {}),
    bookStore: types.optional(BookStore, {})
    // authors: types.array(Author),
  })
  .views(self => ({
    get isLoading() {
      return self.storeStore.isLoading === 'pending'
        // || self.bookStore.isLoading === 'pending'
        // || self.authorStore.isLoading === 'pending'
    }
  }))
  .actions(self => ({
    afterCreate() {
      self.storeStore.fetchStores({ page: 1, filters: [] });
      self.bookStore.fetchBooks({ page: 1, filters: [] });
    },
  }));

