import { types, flow, getParent } from 'mobx-state-tree';

import { Book } from '../Models/Book';

const baseUrl = 'http://jsonapiplayground.reyesoft.com/v2'

export const BookStore = types
  .model('BookStore', {
    loadingState: 'success',
    books: types.array(Book)
  })
  .views(self => ({
    get rootStore() {
      return getParent(self);
    },
  }))
  .actions(self => ({
    updateBooks(json) {
      json.forEach(book => {
        self.books.push(Book.create({
          id: book.id,
          title: book.attributes.title,
          isbn: book.attributes.isbn
        }));
      });
    },

    fetchBooks: flow(function* fetchBooks({ page, filters }) {
      this.books = [];
      this.loadingState = 'pending';

      const paginationString = `page[number]=${page}`;
      const filterString = filters.map(({key, value}) => {
        return `&filter[${key}]=${value}`;
      });

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
  }))
