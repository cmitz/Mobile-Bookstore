import { types, flow } from 'mobx-state-tree';

import { Book } from '../Models/Book';

const baseUrl = 'http://jsonapiplayground.reyesoft.com/v2';

export const BookStore = types
  .model('BookStore', {
    loadingState: types.optional(types.enumeration('LoadingState', ['pending', 'success', 'error']), 'success'),
    books: types.array(Book)
  })
  .actions(self => ({
    updateBooks(json) {
      json.forEach((book) => {
        self.books.push(Book.create({
          id: book.id,
          title: book.attributes.title,
          isbn: book.attributes.isbn
        }));
      });
    },

    fetchBooks: flow(function* ({ page, filters }) {
      this.books = [];
      this.loadingState = 'pending';

      const paginationString = `page[number]=${page}`;
      const filterString = filters.map(({ key, value }) => (`&filter[${key}]=${value}`));

      try {
        const response = yield fetch(`${baseUrl}/books?${paginationString}${filterString}`);
        const data = yield response.json();

        self.updateBooks(data.data);
        this.loadingState = 'success';
      } catch (error) {
        console.log(error);
        this.loadingState = 'error';
      }
    }),
  }));
