import { types } from 'mobx-state-tree';

import { Author } from './Author';

export const Book = types.model('Book', {
  id: types.identifier,

  title: types.string,
  isbn: types.integer,

  author: types.maybe(types.reference(types.late(() => Author))),
});
