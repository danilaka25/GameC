import {ImageSourcePropType} from 'react-native';

export interface GameItem {
  gameId: number;
  mainImg: string;
  gameName: string;
  assets_folder: string;
  images: GameImage[];
}

export interface GameImage {
  id: number;
  img: string;
}

export interface SimpleData {
  id: number;
  title: string;
  text: string;
}

export interface GameData {
  simple_data: SimpleData[];
  game_data: GameItem[];
}

export interface Card {
  id: number;
  imageUrl: ImageSourcePropType;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface GameState {
  cards: Card[];
  firstCard: Card | null;
  secondCard: Card | null;
  isChecking: boolean;
  matchedPairs: number;
  canFlipCards: boolean;
}

export type GameImagesType = Record<number, ImageSourcePropType>;

export interface GameImagePaths {
  space: GameImagesType;
  magic: GameImagesType;
  robots: GameImagesType;
  zeus: GameImagesType;
}
