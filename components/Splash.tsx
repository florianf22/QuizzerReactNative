import React from 'react';
import {
  StyleSheet,
  Image,
  StyleProp,
  ViewStyle,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Animated from 'react-native-reanimated';
import SafeAreaView from 'react-native-safe-area-view';
//
import Colors from '../constants/Colors';
import { PAGE_WIDTH } from '../constants/Dimensions';

interface SplashProps {
  style?: StyleProp<ViewStyle>;
  center?: boolean;
  hideLogo?: boolean;
  innerStyle?: StyleProp<ViewStyle>;
  animatedStyle?: Animated.AnimatedStyleProp<ViewStyle>;
}

const Splash: React.FC<SplashProps> = ({
  children,
  style,
  hideLogo,
  innerStyle,
  animatedStyle,
}) => {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      // @ts-ignore
      behavior={Platform.OS === 'android' ? null : 'padding'}
    >
      <Animated.View style={[styles.container, style, animatedStyle]}>
        <Image
          source={require('../assets/bubbles.png')}
          style={styles.bubbles}
        />
        <SafeAreaView
          style={[
            { flex: 1, alignItems: 'center' },
            { transform: [{ translateY: !hideLogo ? 0 : -64 }] },
            innerStyle,
          ]}
        >
          <SafeAreaView
            style={[styles.innerContainer]}
            forceInset={{ top: 'always' }}
          >
            {!hideLogo && (
              <Image
                source={require('../assets/logo.png')}
                style={styles.logo}
              />
            )}
            {children}
          </SafeAreaView>
        </SafeAreaView>
      </Animated.View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 24,
  },
  logo: {
    marginBottom: 30,
  },
  bubbles: {
    position: 'absolute',
    bottom: -30,
    left: 30,
  },
});

export default Splash;
