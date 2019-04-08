import { types } from 'mobx-state-tree';

import { Book } from './Book';

export const Author = types.model('Author', {
  id: types.identifier,

  name: types.string,
  birthplace: types.string,

  books: types.array(types.reference(types.late(() => Book))),
});

