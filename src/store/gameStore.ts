import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import gamesData from '$src/data/games.json';

interface GameStatus {
  gameId: number;
  isFinished: boolean;
}

interface GameStore {
  gameStatuses: GameStatus[];
  setGameFinished: (gameId: number) => void;
  resetAllGames: () => void;
  getRandomUnfinishedGameId: () => number | null;
  getFinishedGameCount: () => string;
}

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      gameStatuses: gamesData.game_data.map(game => ({
        gameId: game.gameId,
        isFinished: false,
      })),

      setGameFinished: (gameId: number) =>
        set(state => ({
          gameStatuses: state.gameStatuses.map(status =>
            status.gameId === gameId ? {...status, isFinished: true} : status,
          ),
        })),

      resetAllGames: () =>
        set({
          gameStatuses: gamesData.game_data.map(game => ({
            gameId: game.gameId,
            isFinished: false,
          })),
        }),

      getRandomUnfinishedGameId: () => {
        const {gameStatuses} = get();
        const unfinishedGames = gameStatuses.filter(
          status => !status.isFinished,
        );
        if (unfinishedGames.length === 0) return null;
        const randomIndex = Math.floor(Math.random() * unfinishedGames.length);
        return unfinishedGames[randomIndex].gameId;
      },

      getFinishedGameCount: () => {
        const {gameStatuses} = get();
        const finishedCount = gameStatuses.filter(
          status => status.isFinished,
        ).length;
        const totalCount = gameStatuses.length;
        return `${finishedCount}/${totalCount}`;
      },
    }),
    {
      name: 'game-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
