import {GameImagesType} from '$src/types';
import {
  MagicImagesPaths,
  RobotsImagesPaths,
  SpaceImagesPaths,
  ZeusImagesPaths,
  TigerImagesPaths,
  CandyImagesPaths,
  DogsImagesPaths,
  JellyImagesPaths,
} from '$src/data/images';

export const getImagePackByGameId = (gameId: number) => {
  let gameImages: GameImagesType;

  switch (gameId) {
    case 1:
      gameImages = SpaceImagesPaths;
      break;
    case 2:
      gameImages = MagicImagesPaths;
      break;
    case 3:
      gameImages = RobotsImagesPaths;
      break;
    case 4:
      gameImages = ZeusImagesPaths;
      break;
    case 5:
      gameImages = TigerImagesPaths;
      break;
    case 6:
      gameImages = CandyImagesPaths;
      break;
    case 7:
      gameImages = DogsImagesPaths;
      break;
    case 8:
      gameImages = JellyImagesPaths;
      break;
    default:
      return;
  }

  return gameImages;
};
