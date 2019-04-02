import { types } from 'mobx-state-tree';

export const LocationStore = types
  .model('LocationStore', {
    latitude: '0.000',
    longtitude: '0.000',
    updatedAt: types.optional(types.Date, () => new Date()),
  })
  .actions(self => ({
    updateLocation({ latitude, longtitude }) {
      this.latitude = latitude;
      this.longtitude = longtitude;

      this.updatedAt = new Date();
    },
  }));

