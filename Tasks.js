import { TaskManager } from 'expo';

export const BACKGROUND_TASK_LOCATION_TRACKING = 'backgroundTask/locationTracking';

export const defineLocationBackgroundTask = () => {
  TaskManager.defineTask(BACKGROUND_TASK_LOCATION_TRACKING, async ({ data: { locations }, error}) => {
    if (error) {
      console.error(error);
    } else {
      console.log('locations via background task', [
        ...locations.map(v => v.coords)
      ]);
      const location = locations[0];
      const { latitude, longitude } = location.coords;

      fetch('http://webhook.site/7a50c22b-2b3e-4912-8d5b-33a024ce21b0', {
        method: 'POST',
        body: JSON.stringify({
          latitude,
          longitude
        })
      })
    }
  });
}
