import { types, flow } from 'mobx-state-tree';

import { Author } from '../Models/Author';

const baseUrl = 'http://jsonapiplayground.reyesoft.com/v2'

export const AuthorStore = types
  .model('AuthorStore', {
    loadingState: types.optional(types.enumeration('LoadingState', ['pending', 'success', 'error']), 'success'),
    authors: types.array(Author)
  })
  .views(self => ({
    // Find By ID?
  }))
  .actions(self => ({
    updateAuthors(json) {
      json.forEach(author => {
        self.authors.push(Author.create({
          id: author.id,
          name: author.attributes.name,
          birthplace: author.attributes.birthplace
        }));
      });
    },

    fetchAuthors: flow(function* fetchAuthors({ page, filters }) {
      this.authors = [];
      this.loadingState = 'pending';

      const paginationString = `page[number]=${page}`;
      const filterString = filters.map(({key, value}) => {
        return `&filter[${key}]=${value}`;
      });

      try {
        const response = yield fetch(`${baseUrl}/authors?${paginationString}${filterString}`);
        const data = yield response.json();

        self.updateAuthors(data.data);
        this.loadingState = 'success';
      } catch (error) {
        console.log(error);
        this.loadingState = 'error';
      }
    }),
  }))
