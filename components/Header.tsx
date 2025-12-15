import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Platform, 
  StatusBar,
  SafeAreaView,
  Dimensions 
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; // Optional: for better safe area handling

const { width } = Dimensions.get('window');

// Color Hunt Palette: https://colorhunt.co/palette/7adaa5239ba7ececbbe1aa36
const COLORS = {
  primary: '#239BA7',      
  accent: '#7ADAA5',       
  light: '#ECECBB',        
  secondary: '#E1AA36',    
};

const Header = ({ 
  variant = 'default', // 'default', 'minimal', 'transparent'
  showSubtitle = true,
  customTitle,
  backgroundColor = COLORS.primary,
  style,
  children 
}) => {
  const insets = useSafeAreaInsets?.() || { top: Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0 };

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
          backdropFilter: 'blur(20px)', // iOS only
        };
      default:
        return {};
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <StatusBar 
        barStyle="light-content" 
        backgroundColor={backgroundColor} 
        translucent={Platform.OS === 'android'}
      />
      <View style={[
        styles.container,
        { backgroundColor, paddingTop: Platform.OS === 'android' ? insets.top + 16 : 16 },
        getVariantStyles(),
        style
      ]}>
        <View style={styles.content}>
          {/* Background decorative elements */}
          <View style={styles.backgroundDecor}>
            <View style={[styles.decorativeCircle, styles.circle1]} />
            <View style={[styles.decorativeCircle, styles.circle2]} />
          </View>
          
          <View style={styles.titleContainer}>
            <Text style={styles.appName}>
              {customTitle || 'CEFRify'}
            </Text>
            {showSubtitle && (
              <Text style={styles.subtitle}>
                Language Proficiency Assessment
              </Text>
            )}
          </View>
          
          {/* Modern accent bar with gradient-like effect */}
          <View style={styles.accentBarContainer}>
            <View style={[styles.accentBar, styles.accentBar1]} />
            <View style={[styles.accentBar, styles.accentBar2]} />
          </View>
          
          {/* Optional children for additional content */}
          {children}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
  container: {
    paddingBottom: 32,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    shadowColor: Platform.OS === 'ios' ? COLORS.primary : COLORS.primary,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: Platform.OS === 'ios' ? 0.15 : 0.3,
    shadowRadius: 20,
    elevation: 12,
    overflow: 'hidden', // For background decorations
    position: 'relative',
  },
  content: {
    width: '100%',
    zIndex: 2,
    position: 'relative',
  },
  backgroundDecor: {
    position: 'absolute',
    top: -20,
    right: -20,
    zIndex: 1,
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
    zIndex: 3,
  },
  appName: {
    fontSize: 38,
    fontWeight: Platform.OS === 'ios' ? '800' : 'bold',
    color: '#ffffff',
    letterSpacing: 2,
    marginBottom: 8,
    textShadowColor: 'rgba(35, 155, 167, 0.3)',
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 6,
    lineHeight: 42,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.light,
    fontWeight: Platform.OS === 'ios' ? '600' : '500',
    letterSpacing: 1,
    opacity: 0.95,
    lineHeight: 22,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
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
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 3,
  },
  accentBar2: {
    width: 30,
    backgroundColor: COLORS.secondary,
    shadowColor: COLORS.secondary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 3,
  },
});

export default Header;