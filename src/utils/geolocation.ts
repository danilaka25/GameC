import {Platform, Alert} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  openSettings,
} from 'react-native-permissions';

const showLocationPermissionAlert = () =>
  new Promise<boolean>(resolve => {
    Alert.alert(
      'Location Permission Required',
      'Please enable location services to continue',
      [
        {
          text: 'Cancel',
          onPress: () => resolve(false),
          style: 'cancel',
        },
        {
          text: 'Settings',
          onPress: async () => {
            await openSettings();
            resolve(false);
          },
        },
      ],
    );
  });

const requestLocationPermission = async () => {
  let permission;

  if (Platform.OS === 'ios') {
    permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
  } else if (Platform.OS === 'android') {
    permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
  }

  if (!permission) {
    return false;
  }

  const result = await check(permission);

  if (result === RESULTS.GRANTED) {
    return true;
  }

  if (result === RESULTS.DENIED) {
    const requestResult = await request(permission);
    return requestResult === RESULTS.GRANTED;
  }

  if (result === RESULTS.BLOCKED) {
    await showLocationPermissionAlert();
    return false;
  }

  return false;
};

const isUkraineFromCoords = async (
  latitude: number,
  longitude: number,
): Promise<boolean> => {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
      {
        headers: {
          'User-Agent': 'YourAppName/1.0 (your-email@example.com)',
        },
      },
    );

    if (!response.ok) {
      console.error(`Error: Received status ${response.status}`);
      return false;
    }

    const data = await response.json();
    console.log('data', data);
    return data.address?.country_code?.toLowerCase() === 'ua';
  } catch (error) {
    console.error('Failed to determine location:', error);
    return false;
  }
};

export const isUserFromUkraine = async (): Promise<boolean> => {
  try {
    const hasPermission = await requestLocationPermission();

    console.log('hasPermission', hasPermission);

    if (hasPermission) {
      return new Promise(resolve => {
        Geolocation.getCurrentPosition(
          async position => {
            const {latitude, longitude} = position.coords;
            const isUkraine = await isUkraineFromCoords(latitude, longitude);
            resolve(isUkraine);
          },
          async () => {
            resolve(false); // Fallback if location fails
          },
          {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 1000,
          },
        );
      });
    }

    return false; // No permission, default to non-Ukraine
  } catch (error) {
    console.error('Error checking user location:', error);
    return false;
  }
};
