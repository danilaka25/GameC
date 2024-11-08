import {RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type RootStackParamList = {
  Boot: undefined;
  Levels: undefined;
  Information: undefined;
  Game: {
    gameId: number;
  };
};

type BootScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Boot'>;
};

type GameScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Game'>;
  route: RouteProp<RootStackParamList, 'Game'>;
};

type InformationScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Information'>;
};

type LevelsScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Levels'>;
};

export type {
  RootStackParamList,
  BootScreenProps,
  GameScreenProps,
  InformationScreenProps,
  LevelsScreenProps,
};
