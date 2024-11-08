import React from 'react';
import styled from 'styled-components/native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {ImageSourcePropType} from 'react-native';

interface Props {
  imageUrl: ImageSourcePropType;
  isFlipped: boolean;
  isMatched: boolean;
  onPress: () => void;
  disabled: boolean;
  size: number;
}

interface ContainerProps {
  size: number;
}

export const GameCard: React.FC<Props> = ({
  imageUrl,
  isFlipped,
  isMatched,
  onPress,
  disabled,
  size,
}) => {
  const frontAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: withTiming(isFlipped ? '0deg' : '180deg', {
            duration: 300,
          }),
        },
      ],
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotateY: withTiming(isFlipped ? '-180deg' : '0deg', {
            duration: 300,
          }),
        },
      ],
    };
  });

  return (
    <CardContainer onPress={onPress} disabled={disabled} size={size}>
      <CardFace style={frontAnimatedStyle}>
        <CardImage source={imageUrl} resizeMode="cover" />
      </CardFace>
      <CardFace style={backAnimatedStyle}>
        <CardImage
          source={require('../../assets/images/common/cardBg.png')}
          resizeMode="cover"
        />
      </CardFace>
    </CardContainer>
  );
};

const CardContainer = styled.TouchableOpacity<ContainerProps>(
  ({size = 150}) => ({
    width: size,
    height: size,
    margin: 5,
  }),
);

const CardFace = styled(Animated.View)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  backfaceVisibility: 'hidden',
  borderRadius: 10,
  justifyContent: 'center',
  alignItems: 'center',
});

const CardImage = styled.Image({
  width: '100%',
  height: '100%',
  borderRadius: 10,
});
