import React from 'react';
import styled from 'styled-components/native';
import {GradientHeader} from '$src/components/GradientHeader';
import {LevelsScreenProps} from '$src/navigation/types';
import {GameItem} from '$src/types';
import gamesData from '$src/data/games.json';
import {LevelsImagesPaths} from '$src/data/images';
import {useGameStore} from '$src/store/gameStore';
import LinearGradient from 'react-native-linear-gradient';

export const LevelsScreen: React.FC<LevelsScreenProps> = ({navigation}) => {
  const gameStatuses = useGameStore(state => state.gameStatuses);

  return (
    <Container colors={['#43BCF0', '#541896', '#711280']}>
      <GradientHeader
        showLogo
        showRightIcon
        onRightIconPress={() => navigation.navigate('Information')}
      />
      <Content>
        <GamesWrapper>
          {gamesData.game_data.map((item: GameItem) => {
            const gameStatus = gameStatuses.find(
              status => status.gameId === item.gameId,
            );
            const isFinished = gameStatus ? gameStatus.isFinished : false;

            return (
              <TouchableGame
                key={item.gameId}
                activeOpacity={isFinished ? 1 : 0.7}
                onPress={() =>
                  !isFinished &&
                  navigation.navigate('Game', {gameId: item.gameId})
                }>
                <GameImage
                  source={LevelsImagesPaths[item.assets_folder]}
                  style={{opacity: isFinished ? 0.5 : 1}}
                />
              </TouchableGame>
            );
          })}
        </GamesWrapper>
      </Content>
    </Container>
  );
};

const Container = styled(LinearGradient)({
  flex: 1,
});

const Content = styled.ScrollView({
  flex: 1,
  padding: 16,
});

const GamesWrapper = styled.View({
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  paddingVertical: 30,
});

const TouchableGame = styled.TouchableOpacity({
  margin: 10,
});

const GameImage = styled.Image({
  width: 130,
  height: 130,
  borderRadius: 10,
});
