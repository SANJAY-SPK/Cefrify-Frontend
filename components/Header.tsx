import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContent}>
        <View style={styles.titleSection}>
          <Text style={styles.appName}>CEFRify</Text>
          <Text style={styles.subtitle}>Language Proficiency Test</Text>
        </View>
        
        <View style={styles.levelSection}>
          <Text style={styles.currentLevel}>B2</Text>
          <Text style={styles.levelText}>Current Level</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4A90E2',
    paddingTop: 15,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  titleSection: {
    flex: 1,
  },
  appName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#c7d2fe',
  },
  levelSection: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  currentLevel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f0f0f0ff',
  },
  levelText: {
    fontSize: 12,
    color: '#ffffff',
    marginTop: 2,
  },
});

export default Header;