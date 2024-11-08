import analytics from '@react-native-firebase/analytics';
import {OneSignal} from 'react-native-onesignal';
import appsFlyer from 'react-native-appsflyer';

export const initializeSDKs = () => {
  OneSignal.initialize('ONESIGNAL_APP_ID');
  appsFlyer.initSdk(
    {
      devKey: 'YOUR_APPSFLYER_DEV_KEY',
      isDebug: false,
      appId: 'YOUR_APP_ID',
      timeToWaitForATTUserAuthorization: 10,
    },
    result => {
      console.log(result);
    },
    error => {
      console.error(error);
    },
  );
  analytics().setAnalyticsCollectionEnabled(true);
};
