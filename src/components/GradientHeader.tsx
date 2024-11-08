import React from 'react';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';
import LOGO from '$assets/images/header/logo.svg';
import BACK from '$assets/images/header/back.svg';
import INFO from '$assets/images/header/info.svg';
import LOVE from '$assets/images/header/love.svg';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useGameStore} from '$src/store/gameStore';
import {TouchableOpacity} from 'react-native';

interface Props {
  showLogo?: boolean;
  showBackButton?: boolean;
  showRightIcon?: boolean;
  showBadgeCount?: boolean;
  showLove?: boolean;
  onBackPress?: () => void;
  onRightIconPress?: () => void;
}

interface HeaderContainerProps {
  paddingTop: number;
}

export const GradientHeader: React.FC<Props> = ({
  showLogo,
  showBackButton,
  showRightIcon,
  showBadgeCount,
  showLove,
  onBackPress,
  onRightIconPress,
}) => {
  const insets = useSafeAreaInsets();
  const {getFinishedGameCount} = useGameStore();
  const badgeCount = getFinishedGameCount();
  return (
    <HeaderContainer colors={['#43BCF0', '#571280']} paddingTop={insets.top}>
      <IconButtonWrapper>
        {showBackButton && (
          <TouchableOpacity onPress={onBackPress}>
            <BACK width={30} height={30} />
          </TouchableOpacity>
        )}
      </IconButtonWrapper>
      {showLogo && (
        <LogoWrapper>
          <LOGO width={62} height={39} />
        </LogoWrapper>
      )}

      {showLove && <LOVE width={32} height={30} />}
      <IconButtonWrapper>
        {showRightIcon && (
          <TouchableOpacity onPress={onRightIconPress}>
            <INFO width={30} height={30} style={{alignSelf: 'flex-end'}} />
          </TouchableOpacity>
        )}
        {showBadgeCount && (
          <Badge colors={['#00FFB2', '#24BFC9']}>
            <BadgeText>{badgeCount}</BadgeText>
          </Badge>
        )}
      </IconButtonWrapper>
    </HeaderContainer>
  );
};

const HeaderContainer = styled(LinearGradient)<HeaderContainerProps>(
  ({paddingTop = 0}) => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop,
    paddingHorizontal: 16,
    height: paddingTop + 60,
  }),
);

const LogoWrapper = styled.View({
  flex: 1,
  alignItems: 'center',
});

const IconButtonWrapper = styled.View({
  width: 48,
});

const Badge = styled(LinearGradient)({
  backgroundColor: '#00FFB2',
  borderRadius: 71,
  minWidth: 48,
  height: 30,
  justifyContent: 'center',
  alignItems: 'center',
});

const BadgeText = styled.Text({
  color: 'white',
  fontSize: 18,
});
