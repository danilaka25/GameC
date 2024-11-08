/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './src/navigation/types';
import {BootScreen} from './src/screens/BootScreen';
import {LevelsScreen} from './src/screens/LevelsScreen';
import {InformationScreen} from './src/screens/InformationScreen';
import {GameScreen} from './src/screens/GameScreen';
import {initializeSDKs} from '$src/utils/initializeSDKs';

const Stack = createNativeStackNavigator<RootStackParamList>();
initializeSDKs();
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="Boot" component={BootScreen} />
        <Stack.Screen name="Levels" component={LevelsScreen} />
        <Stack.Screen name="Information" component={InformationScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
