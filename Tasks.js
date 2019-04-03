import { TaskManager, Permissions, Notifications } from 'expo';

export const BACKGROUND_TASK_LOCATION_TRACKING = 'backgroundTask/locationTracking';
export const PUSH_ENDPOINT = 'http://webhook.site/7a50c22b-2b3e-4912-8d5b-33a024ce21b0';

export const defineLocationBackgroundTask = async () => {
  TaskManager.defineTask(BACKGROUND_TASK_LOCATION_TRACKING,
    async ({ data: { locations }, error }) => {
      if (error) {
        console.error(error);
      } else {
        console.log('locations via background task', [
          ...locations.map(v => v.coords)
        ]);
        const location = locations[0];
        const { latitude, longitude } = location.coords;

        fetch(PUSH_ENDPOINT, {
          method: 'POST',
          body: JSON.stringify({
            latitude,
            longitude
          })
        });
      }
    });
};

export const registerForPushNotificationsAsync = async () => {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== 'granted') {
    // Android remote notification permissions are granted during the app
    // install, so this will only ask on iOS
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  // Get the token that uniquely identifies this device
  const token = await Notifications.getExpoPushTokenAsync();

  // POST the token to your backend server from where you can retrieve
  // it to send push notifications.
  const response = await fetch(PUSH_ENDPOINT, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: {
        value: token,
      },
      user: {
        username: 'Brent',
      },
    }),
  });

  console.log(response.json());
};
