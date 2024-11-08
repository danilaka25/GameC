import React, {useEffect, useState, useCallback} from 'react';
import styled from 'styled-components/native';
import {GradientHeader} from '$src/components/GradientHeader';
import {GameCard} from '$src/components/GameCard';
import {GameCompleteModal} from '$src/components/GameCompleteModal';
import {GameScreenProps} from '$src/navigation/types';
import {Card, GameState} from '$src/types';
import gamesData from '$src/data/games.json';
import {BackgroundsImagesPaths} from '$src/data/images';
import {useGameStore} from '$src/store/gameStore';
import {getImagePackByGameId} from '$src/utils/getImagePackByGameId';

interface StyledProps {
  columns: number;
}

export const GameScreen: React.FC<GameScreenProps> = ({navigation, route}) => {
  const {getRandomUnfinishedGameId, setGameFinished} = useGameStore();
  const [showModal, setShowModal] = useState(false);
  const [isWon, setIsWon] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    cards: [],
    firstCard: null,
    secondCard: null,
    isChecking: false,
    matchedPairs: 0,
    canFlipCards: false,
  });

  const {gameId} = route.params;
  const gameData = gamesData.game_data.find(game => game.gameId === gameId);
  const totalPairs = gameData?.images.length || 0;
  const columns = totalPairs < 6 ? 2 : 3;

  const initializeCards = useCallback(() => {
    if (!gameData) return;

    let gameImages = getImagePackByGameId(gameId);

    if (!gameImages) return;

    const cards: Card[] = [...gameData.images, ...gameData.images]
      .map((image, index) => ({
        id: index,
        imageUrl: gameImages[parseInt(image.img.replace('.png', ''))],
        isFlipped: true,
        isMatched: false,
      }))
      .sort(() => Math.random() - 0.5);

    setGameState(prev => ({
      ...prev,
      cards,
      canFlipCards: true,
    }));

    setTimeout(() => {
      setGameState(prev => ({
        ...prev,
        cards: prev.cards.map(card => ({...card, isFlipped: false})),
        canFlipCards: true,
      }));
    }, 2000);
  }, [gameData, gameId]);

  useEffect(() => {
    initializeCards();
  }, [initializeCards]);

  const handleCardPress = (card: Card) => {
    if (
      !gameState.canFlipCards ||
      gameState.isChecking ||
      card.isMatched ||
      card.isFlipped ||
      (gameState.firstCard && gameState.secondCard)
    ) {
      return;
    }

    const newCards = gameState.cards.map(c =>
      c.id === card.id ? {...c, isFlipped: true} : c,
    );

    if (!gameState.firstCard) {
      setGameState(prev => ({
        ...prev,
        cards: newCards,
        firstCard: card,
      }));
    } else {
      setGameState(prev => ({
        ...prev,
        cards: newCards,
        secondCard: card,
        isChecking: true,
      }));

      setTimeout(() => {
        const isMatch = gameState.firstCard?.imageUrl === card.imageUrl;

        if (!isMatch) {
          setIsWon(false);
          setShowModal(true);
        }

        const updatedCards = newCards.map(c =>
          c.id === gameState.firstCard?.id || c.id === card.id
            ? {...c, isMatched: isMatch, isFlipped: isMatch}
            : c,
        );

        const newMatchedPairs = isMatch
          ? gameState.matchedPairs + 1
          : gameState.matchedPairs;

        setGameState(prev => ({
          ...prev,
          cards: updatedCards,
          firstCard: null,
          secondCard: null,
          isChecking: false,
          matchedPairs: newMatchedPairs,
        }));

        // WIN
        if (newMatchedPairs === totalPairs) {
          setTimeout(() => {
            setGameState(prev => ({
              ...prev,
              cards: prev.cards.map(c => ({...c, isFlipped: true})),
            }));
            setIsWon(true);
            setShowModal(true);
            setGameFinished(gameId);
          }, 500);
        }
      }, 500);
    }
  };

  const handleRestart = () => {
    setShowModal(false);
    setIsWon(false);
    initializeCards();
  };

  const handleNext = () => {
    setShowModal(false);
    const nextGameId = getRandomUnfinishedGameId();

    if (nextGameId) {
      navigation.navigate('Game', {
        gameId: nextGameId,
      });
    } else {
      console.log('WIN');
      navigation.navigate('Levels');
    }
  };

  const handleGoHome = () => {
    navigation.navigate('Levels');
  };

  const getBackgroundImage = useCallback(() => {
    const gameData = gamesData.game_data.find(game => game.gameId === gameId);
    if (!gameData) return BackgroundsImagesPaths.space;

    return BackgroundsImagesPaths[gameData.assets_folder];
  }, [gameId]);

  return (
    <Container>
      <Background source={getBackgroundImage()}>
        <GradientHeader
          showBackButton
          showLove
          showBadgeCount
          onBackPress={() => navigation.goBack()}
        />
        <Content>
          <CardsWrapper columns={columns}>
            {gameState.cards.map(card => (
              <GameCard
                key={card.id}
                imageUrl={card.imageUrl}
                isFlipped={card.isFlipped}
                isMatched={card.isMatched}
                onPress={() => handleCardPress(card)}
                disabled={!gameState.canFlipCards || gameState.isChecking}
                size={columns === 2 ? 150 : 101}
              />
            ))}
          </CardsWrapper>
          <GameCompleteModal
            visible={showModal}
            onRestart={handleRestart}
            onNext={handleNext}
            onHome={handleGoHome}
            isWon={isWon}
          />
        </Content>
      </Background>
    </Container>
  );
};

const Container = styled.View({
  flex: 1,
});

const Content = styled.ScrollView({
  flex: 1,
});

const Background = styled.ImageBackground({
  flex: 1,
});

const CardsWrapper = styled.View<StyledProps>(({columns = 2}) => ({
  flex: 1,
  paddingVertical: 36,
  paddingHorizontal: 16,
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
  alignItems: 'center',
  gap: columns === 2 ? 10 : 5,
}));
