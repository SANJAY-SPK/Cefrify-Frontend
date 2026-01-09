import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// Color Hunt Palette
const COLORS = {
  primary: '#239BA7',
  accent: '#7ADAA5',
  light: '#ECECBB',
  secondary: '#E1AA36',
};

const Header = ({
  variant = 'default', 
  showSubtitle = true,
}) => {
  // ✅ Hooks must be called unconditionally
  const insets = useSafeAreaInsets();

  const getVariantStyles = () => {
    switch (variant) {
      case 'minimal':
        return {
          paddingBottom: 16,
          backgroundColor: 'transparent',
          shadowOpacity: 0,
          elevation: 0,
        };
      case 'transparent':
        return {
          backgroundColor: `${COLORS.primary}F0`, // 94% opacity
        };
      default:
        return {};
    }
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.primary}
        translucent={Platform.OS === 'android'}
      />

      <View
        style={[
          styles.container,
          {
            backgroundColor: COLORS.primary || '#239BA7' ,
            paddingTop:
              Platform.OS === 'android'
                ? (StatusBar.currentHeight ?? 0) + 16
                : insets.top + 16,
          },
          getVariantStyles(),   
        ]}
      >
        <View style={styles.content}>
          {/* Decorative Background */}
          <View style={styles.backgroundDecor}>
            <View style={[styles.decorativeCircle, styles.circle1]} />
            <View style={[styles.decorativeCircle, styles.circle2]} />
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.appName}>
              {'CEFRify'}
            </Text>

            {showSubtitle && (
              <Text style={styles.subtitle}>
                Language Proficiency Assessment
              </Text>
            )}
          </View>

          {/* Accent Bars */}
          <View style={styles.accentBarContainer}>
            <View style={[styles.accentBar, styles.accentBar1]} />
            <View style={[styles.accentBar, styles.accentBar2]} />
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 32,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: Platform.OS === 'ios' ? 0.15 : 0.3,
    shadowRadius: 20,
    elevation: 12,
    overflow: 'hidden',
  },
  content: {
    width: '100%',
    position: 'relative',
  },
  backgroundDecor: {
    position: 'absolute',
    top: -20,
    right: -20,
  },
  decorativeCircle: {
    position: 'absolute',
    borderRadius: 50,
    opacity: 0.1,
  },
  circle1: {
    width: 80,
    height: 80,
    backgroundColor: COLORS.accent,
    top: 10,
    right: 10,
  },
  circle2: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.secondary,
    top: 40,
    right: 60,
  },
  titleContainer: {
    marginBottom: 16,
  },
  appName: {
    fontSize: 38,
    fontWeight: Platform.OS === 'ios' ? '800' : 'bold',
    color: '#ffffff',
    letterSpacing: 2,
    marginBottom: 8,
    lineHeight: 42,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.light,
    fontWeight: Platform.OS === 'ios' ? '600' : '500',
    letterSpacing: 1,
    opacity: 0.95,
    lineHeight: 22,
  },
  accentBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  accentBar: {
    height: 4,
    borderRadius: 3,
  },
  accentBar1: {
    width: 60,
    backgroundColor: COLORS.accent,
    elevation: 3,
  },
  accentBar2: {
    width: 30,
    backgroundColor: COLORS.secondary,
    elevation: 3,
  },
});

export default Header;
