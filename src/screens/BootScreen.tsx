import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import {BootScreenProps} from '$src/navigation/types';
import {Linking} from 'react-native';
import LOGO from '$assets/images/common/Logo.svg';
import {isUserFromUkraine} from '$src/utils/geolocation';
import WebView from 'react-native-webview';

export const BootScreen: React.FC<BootScreenProps> = ({navigation}) => {
  const [showWebView, setShowWebView] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLocation = async () => {
      try {
        const isUkraine = await isUserFromUkraine();
        setShowWebView(!isUkraine);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setShowWebView(true);
        setLoading(false);
      }
    };

    checkLocation();
  }, []);

  if (loading) {
    return (
      <Container colors={['#43BCF0', '#541896', '#711280']}>
        <LoadingText>Loading...</LoadingText>
      </Container>
    );
  }

  if (showWebView) {
    return (
      <WebViewContainer>
        <WebView
          source={{uri: 'https://www.wikipedia.org'}}
          onError={() => Linking.openURL('https://www.wikipedia.org')}
        />
      </WebViewContainer>
    );
  }

  return (
    <Container colors={['#43BCF0', '#541896', '#711280']}>
      <LogoContainer>
        <LOGO width={248} height={248} />
      </LogoContainer>
      <StartButton onPress={() => navigation.navigate('Levels')}>
        <ButtonText>Start</ButtonText>
      </StartButton>
    </Container>
  );
};

const Container = styled(LinearGradient)({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
});

const LogoContainer = styled.View({
  marginTop: -100,
});

const WebViewContainer = styled.View({
  flex: 1,
});

const StartButton = styled.TouchableOpacity({
  backgroundColor: '#6EBCF7',
  paddingVertical: 10,
  paddingHorizontal: 45,
  borderRadius: 50,
  position: 'absolute',
  bottom: 90,
});

const ButtonText = styled.Text({
  fontSize: 18,
  textTransform: 'uppercase',
  color: '#fff',
  fontFamily: 'Baloo2-Regular',
});

const LoadingText = styled.Text({
  fontSize: 24,
  color: '#fff',
});
