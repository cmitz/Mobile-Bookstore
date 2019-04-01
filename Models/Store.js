import { types } from 'mobx-state-tree';

import { Book } from './Book';

export const Store = types.model('Store', {
  id: types.identifier,

  name: types.string,
  address: types.string,

  books: types.array(types.reference(types.late(() => Book)))
})
.views(self => ({
  get totalBooks() {
    return self.books.length;
  }
}));
