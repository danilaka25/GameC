import React from 'react';
import styled from 'styled-components/native';
import {Modal, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface Props {
  visible: boolean;
  onRestart: () => void;
  onNext: () => void;
  onHome: () => void;
  isWon: boolean;
}

export const GameCompleteModal: React.FC<Props> = ({
  visible,
  onRestart,
  onNext,
  onHome,
  isWon,
}) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <Overlay>
        <ModalContent colors={['#2BD5E8', '#8864E8']}>
          <ModalTitle colors={['#43BCF0', '#541896', '#711280']}>
            <Title>{isWon ? 'You Won!' : 'You Lost!'}</Title>
          </ModalTitle>
        </ModalContent>
        <ButtonsContainer>
          <Button onPress={onHome}>
            <Image
              source={require('../../assets/images/common/home.png')}
              style={{width: 40, height: 40}}
            />
          </Button>

          {isWon ? (
            <Button onPress={onNext}>
              <Image
                source={require('../../assets/images/common/next.png')}
                style={{width: 40, height: 40}}
              />
            </Button>
          ) : (
            <Button onPress={onRestart}>
              <Image
                source={require('../../assets/images/common/back.png')}
                style={{width: 40, height: 40}}
              />
            </Button>
          )}
        </ButtonsContainer>
      </Overlay>
    </Modal>
  );
};

const Overlay = styled.View({
  flex: 1,
  backgroundColor: 'rgba(53, 53, 53, 0.7)',
  justifyContent: 'center',
  alignItems: 'center',
  backdropFilter: 'blur(4px)',
});

const ModalContent = styled(LinearGradient)({
  borderRadius: 20,
  alignItems: 'center',
  borderColor: '#fff',
  borderWidth: 4,
  width: 283,
  height: 182,
  justifyContent: 'center',
});

const ModalTitle = styled(LinearGradient)({
  paddingHorizontal: 21,
  borderRadius: 14,
  height: 72,
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'Baloo2-Regular',
});

const Title = styled.Text({
  fontSize: 26,
  color: '#fff',
});

const ButtonsContainer = styled.View({
  flexDirection: 'row',
  justifyContent: 'center',
  width: '100%',
});

const Button = styled.TouchableOpacity({
  paddingVertical: 10,
  paddingHorizontal: 40,
});
