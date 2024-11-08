import React from 'react';
import styled from 'styled-components/native';
import {GradientHeader} from '$src/components/GradientHeader';
import {InformationScreenProps} from '$src/navigation/types';
import gamesData from '$src/data/games.json';
import LinearGradient from 'react-native-linear-gradient';

export const InformationScreen: React.FC<InformationScreenProps> = ({
  navigation,
}) => {
  const infoData = gamesData.simple_data[0];

  return (
    <Container colors={['#43BCF0', '#32899D', '#182496']}>
      <GradientHeader
        showLogo
        showBackButton
        onBackPress={() => navigation.goBack()}
      />
      <Content>
        <Title>{infoData.title}</Title>
        <InfoText>{infoData.text}</InfoText>
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

const Title = styled.Text({
  fontSize: 22,
  fontWeight: 'bold',
  color: '#fff',
  marginBottom: 30,
  textTransform: 'uppercase',
  textAlign: 'center',
  marginTop: 24,
  fontFamily: 'Baloo2-Bold',
});

const InfoText = styled.Text({
  fontSize: 18,
  color: '#fff',
});
