import { types } from 'mobx-state-tree';

export const LocationStore = types
  .model('LocationStore', {
    latitude: 0.000,
    longitude: 0.000,
    updatedAt: types.optional(types.Date, () => new Date()),
  })
  .actions(self => ({
    updateLocation({ latitude, longitude }) {
      self.latitude = latitude;
      self.longitude = longitude;

      self.updatedAt = new Date();
    },
  }));

